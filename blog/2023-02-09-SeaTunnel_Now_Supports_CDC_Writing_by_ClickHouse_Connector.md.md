# SeaTunnel now supports CDC (Capture Change Data) writing by ClickHouse Connector!

Written by Wang Hailin, Apache SeaTunnel PPMC

## Preface 
Currently, SeaTunnel supports database change data capture (CDC https://github.com/apache/incubator-seatunnel/issues/3175), to transfer data changes to downstream systems in real time. SeaTunnel categorizes the captured data changes into the following 4 types: 
- INSERT: Data insertion 
- UPDATE_BEFORE: Historical value before data change 
- UPDATE_AFTER: New value after data change 
- DELETE: Data deletion 

To handle the above data change operations, the Sink Connector needs to support writing behavior. This article will introduce how the ClickHouse Sink Connector supports writing these CDC types of data changes. 

For CDC scenarios, the primary key is a necessary condition, so first, it needs to support the general requirements of INSERT, UPDATE, DELETE, etc. based on the primary key and ensure that the writing order is consistent with the CDC event order. In addition, considering the complexity of the data source in practice, it also needs to support UPSERT writing. Finally, according to the characteristics of ClickHouse itself, corresponding optimizations need to be made, such as UPDATE and DELETE being heavyweight operations in ClickHouse, which should be optimized based on the corresponding table engine's characteristics.

## Overall design 

The current ClickHouse Sink Connector is based on the JDBC Driver implementation, and a group of JDBC executors can be designed to encapsulate the processing of different types of data, making it convenient to switch or combine implementations based on actual scenarios and encapsulate implementation details. 

JdbcBatchStatementExecutor is the top-level interface of the executor.

```
public interface JdbcBatchStatementExecutor extends AutoCloseable {

    void prepareStatements(Connection connection) throws SQLException;

    void addToBatch(SeaTunnelRow record) throws SQLException;

    void executeBatch() throws SQLException;

    void closeStatements() throws SQLException;

    @Override
    default void close() throws SQLException {
        closeStatements();
    }
}
```


`JdbcBatchStatementExecutor` has the following implementation classes: 



```
SimpleBatchStatementExecutor // implements simple SQL Batch execution logic 
InsertOrUpdateBatchStatementExecutor // implements INSERT, UPDATE update, also supports UPSERT mode 
ReduceBufferedBatchStatementExecutor // memory accumulation, when refreshing to the database, the data change type (INSERT, UPDATE, DELETE) is distributed to the specific execution executor 
```

### Handling of cases where the primary key is not specified
Currently, in CDC processing, the primary key is a necessary condition. If the Sink Connector is not specified in the primary key column configuration, it uses the append-only mode to write, calling `SimpleBatchStatementExecutor` directly.
### CDC data process
We divide the execution logic of data processing as follows: different data types enter the corresponding Executor and are finally transformed into their respective SQL statements for execution, and Jdbc Batch batching is used during this process.


```
CDC Event
               /         \
              /           \
             /             \
            /               \
    DELETE Executor   INSERT OR UPDATE Executor
                            /          \
                           /            \
                          /              \
                         /                \
                     INSERT Executor    UPDATE Executor
```


### Maintaining the Order of CDC Data
CDC events are ordered, and writing must be processed in the order in which the events occur, otherwise data inconsistencies may occur. 

In the previous logic, data of different types were distributed to their respective Executors and Jdbc Batch was used for batch submission to improve write performance, but categorizing batching can result in the order of submissions not being consistent with the CDC event order.

We can add an execution barrier marker, when the processed data row is of the same type as the previous data row, it can be batched, if not, the previous batch is first flushed to the database, ensuring that the data write order is strictly consistent with the CDC event order.

Example for `InsertOrUpdateBatchStatementExecutor`


```
public class InsertOrUpdateBatchStatementExecutor implements JdbcBatchStatementExecutor {
    @Override
    public void addToBatch(SeaTunnelRow record) throws SQLException {
        boolean currentChangeFlag = hasInsert(record);
        if (currentChangeFlag) {
            if (preChangeFlag != null && !preChangeFlag) {
                updateStatement.executeBatch();
                updateStatement.clearBatch();
            }
            valueRowConverter.toExternal(record, insertStatement);
            insertStatement.addBatch();
        } else {
            if (preChangeFlag != null && preChangeFlag) {
                insertStatement.executeBatch();
                insertStatement.clearBatch();
            }
            valueRowConverter.toExternal(record, updateStatement);
            updateStatement.addBatch();
        }
        preChangeFlag = currentChangeFlag;
        submitted = false;
    }
    
    @Override
    public void executeBatch() throws SQLException {
        if (preChangeFlag != null) {
            if (preChangeFlag) {
                insertStatement.executeBatch();
                insertStatement.clearBatch();
            } else {
                updateStatement.executeBatch();
                updateStatement.clearBatch();
            }
        }
        submitted = true;
    }
}
```


Of course, this will significantly slow down the batch processing, so we use `ReduceBufferedBatchStatementExecutor`to add a memory buffer layer, and when executing batch submissions, we distribute submissions to the database.

Example for `ReduceBufferedBatchStatementExecutor`

```
public class ReduceBufferedBatchStatementExecutor implements JdbcBatchStatementExecutor {
    private final LinkedHashMap<SeaTunnelRow, Pair<Boolean, SeaTunnelRow>> buffer = new LinkedHashMap<>();
    
    @Override
    public void addToBatch(SeaTunnelRow record) throws SQLException {
        buffer.put(record, ...);
    }
    
    @Override
    public void executeBatch() throws SQLException {
        Boolean preChangeFlag = null;
        Set<Map.Entry<SeaTunnelRow, Pair<Boolean, SeaTunnelRow>>> entrySet = buffer.entrySet();
        for (Map.Entry<SeaTunnelRow, Pair<Boolean, SeaTunnelRow>> entry : entrySet) {
            Boolean currentChangeFlag = entry.getValue().getKey();
            if (currentChangeFlag) {
                if (preChangeFlag != null && !preChangeFlag) {
                    deleteExecutor.executeBatch();
                }
                insertOrUpdateExecutor.addToBatch(entry.getValue().getValue());
            } else {
                if (preChangeFlag != null && preChangeFlag) {
                    insertOrUpdateExecutor.executeBatch();
                }
                deleteExecutor.addToBatch(entry.getKey());
            }
            preChangeFlag = currentChangeFlag;
        }
    
        if (preChangeFlag != null) {
            if (preChangeFlag) {
                insertOrUpdateExecutor.executeBatch();
            } else {
                deleteExecutor.executeBatch();
            }
        }
        buffer.clear();
    }
}
```


### Implementing a General UPSERT Write
In `InsertOrUpdateBatchStatementExecutor`, you can configure to turn on UPSERT, when processing INSERT or UPDATE data types, it will first use the primary key to query the data row to see if it already exists and then decide to use INSERT or UPDATE SQL for writing. 

*Note: This configuration is optional and will slow down the write speed, only opens when certain special scenarios are required.*

Example for `InsertOrUpdateBatchStatementExecutor`

```
public class InsertOrUpdateBatchStatementExecutor implements JdbcBatchStatementExecutor {
    @Override
    public void addToBatch(SeaTunnelRow record) throws SQLException {
        boolean currentChangeFlag = hasInsert(record);
      ...
    }

    private boolean hasInsert(SeaTunnelRow record) throws SQLException {
        if (upsertMode()) {
            return !exist(keyExtractor.apply(record));
        }
        switch (record.getRowKind()) {
            case INSERT:
                return true;
            case UPDATE_AFTER:
                return false;
            default:
                throw new UnsupportedOperationException();
        }
    }
    
    private boolean exist(SeaTunnelRow pk) throws SQLException {
        keyRowConverter.toExternal(pk, existStatement);
        try (ResultSet resultSet = existStatement.executeQuery()) {
            return resultSet.next();
        }
    }
}
```


### Optimizing UPSERT for ReplacingMergeTree Engine

The `ReplacingMergeTree` table engine can configure an `ORDER BY` field, and when executing the INSERT INTO statement, it covers the records with the same ORDER BY field. We can also utilize this feature to implement UPSERT.

When the user writes to the `ReplacingMergeTree` table engine and the table's `ORDER BY` field is the same as the primary key field configured in the Sink Connector, both INSERT/UPDATE_AFTER data types are processed as INSERT to implement UPSERT.
### Optimizing Updates for the MergeTree Engine

DELETE and UPDATE are heavyweight operations in ClickHouse, but there is an experimental lightweight deletion (https://clickhouse.com/docs/en/sql-reference/statements/delete) for `MergeTree` engine, which performs better than the heavyweight deletion. We allow the user to configure the lightweight deletion.

When the user writes to the `MergeTree` table engine and enables the lightweight deletion, we treat both DELETE/UPDATE_BEFORE data types as lightweight deletions, and treat both INSERT/UPDATE_AFTER data types as INSERTs, avoiding the UPDATE operation and using the lightweight deletion.

## Related PR 
- https://github.com/apache/incubator-seatunnel/pull/3653 

Contribution to improving the related functions is welcomed, if you have any questions, please raise an issue on SeaTunnel GitHub (https://www.github.com/apache/incubator-seatunnel), and we will reply as soon as possible.

## Reference 
- https://clickhouse.com/docs/en/sql-reference/statements/delete 
- https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree