# Data Pipeline Tutorial：Synchronizing from MySQL to PostgreSQL Based on Apache SeaTunnel


This article provides a detailed walkthrough of how to achieve full data synchronization from MySQL to PostgreSQL using **Apache SeaTunnel 2.3.9**. We cover the complete end-to-end process — from environment setup to production validation. Let’s dive into the MySQL-to-PostgreSQL synchronization scenario.

Version Requirements：

-   **MySQL：** MySQL 8.3
-   **PostgreSQL：** PostgreSQL 13.2
-   **Apache SeaTunnel：** Apache-SeaTunnel-2.3.9

# Preliminaries

# Verify Version Information

Run the following SQL command to check the version：
```
-- Check version information 
select version();
```

# Enable Master-Slave Replication

```
-- View replication-related variables
show variables where variable_name in ('log_bin', 'binlog_format', 'binlog_row_image', 'gtid_mode', 'enforce_gtid_consistency');
```


For MySQL CDC data synchronization, SeaTunnel needs to read the MySQL`binlog`and act as a slave node in the MySQL cluster.  

_Note： In MySQL 8.0+,`binlog`is enabled by default, but replication mode must be enabled manually._

```
-- Enable master-slave replication (execute in sequence)
-- SET GLOBAL gtid_mode=OFF;
-- SET GLOBAL enforce_gtid_consistency=OFF;
SET GLOBAL gtid_mode=OFF_PERMISSIVE;
SET GLOBAL gtid_mode=ON_PERMISSIVE;
SET GLOBAL enforce_gtid_consistency=ON;
SET GLOBAL gtid_mode=ON;
```


# Grant Necessary User Permissions

A user must have`REPLICATION SLAVE`and`REPLICATION CLIENT`privileges：

```
-- Grant privileges to the user
CREATE USER 'test'@'%' IDENTIFIED BY 'password';
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'test';
FLUSH PRIVILEGES;
```

# SeaTunnel Cluster Setup

## Cluster Logging

By default, SeaTunnel logs output to a single file. For production, it’s preferable to have separate log files per job. Update the logging configuration in`log4j2.properties`：

```
############################ log output to file #############################
# rootLogger.appenderRef.file.ref = fileAppender
# Change log output to use independent log files for each job
rootLogger.appenderRef.file.ref = routingAppender
############################ log output to file #############################
```

## Client Configuration

For production clusters, it is recommended to install SeaTunnel under the`/opt`directory and point the`SEATUNNEL_HOME`environment variable accordingly.

If multiple versions exist, create a symbolic link to align with the server deployment directory：

```
# Create a symlink
ln -s /opt/apache-seatunnel-2.3.9 /opt/seatunnel
# Set environment variable
export SEATUNNEL_HOME=/opt/seatunnel
```

## Environment Variables Configuration

For Linux servers, add the following lines to`/etc/profile.d/seatunnel.sh`：

```
echo 'export SEATUNNEL_HOME=/opt/seatunnel' >> /etc/profile.d/seatunnel.sh
echo 'export PATH=$SEATUNNEL_HOME/bin：$PATH' >> /etc/profile.d/seatunnel.sh
source /etc/profile.d/seatunnel.sh
```

# Job Configuration

Note： The configuration below does not cover all options but illustrates common production settings.

```
env {
  job.mode = "STREAMING"
  job.name = "DEMO"
  parallelism = 3
  checkpoint.interval = 30000  # 30 seconds
  checkpoint.timeout = 30000   # 30 seconds
  
  job.retry.times = 3 
  job.retry.interval.seconds = 3  # 3 seconds
}
```
The first step is setting up the`env`module, which operates in a streaming mode. Therefore, it’s essential to specify the configuration mode as`STREAMING`.

## Task Naming and Management

Configuring a task name is crucial for identifying and managing jobs in a production environment. Naming conventions based on database or table names can help with monitoring and administration.

## Parallelism Settings

Here, we set the parallelism to**3**, but this value can be adjusted based on the cluster size and database performance.

## Checkpoint Configuration

-   **Checkpoint Frequency**： Set to**30 seconds**. If higher precision is required, this can be reduced to**10 seconds**or less.
-   **Checkpoint Timeout**： If a checkpoint takes too long, the job is considered failed. Set to**30 seconds**.
-   **Automatic Retry**： Configured to**3 retries**, with a retry interval of**3 seconds**(adjustable based on system requirements).


```
source {
  MySQL-CDC {
    base-url = "jdbc：mysql：//192.168.8.101：3306/test?serverTimezone=Asia/Shanghai"
    username = "test"
    password = "123456"
    
    database-names = ["test"]
    # table-names = ["test.test_001","test.test_002"]
    table-pattern = "test\\.test_.*"  # The first dot is a literal character, requiring escaping; the second dot represents any single character.
    table-names-config = [
        {"table"："test.test_002","primaryKeys"：["id"]}
        ]
    
    startup.mode = "initial" # First sync all historical data, then incremental updates
    snapshot.split.size = "8096" 
    snapshot.fetch.size = "1024"
    server-id = "6500-8500"
    connect.timeout.ms = 30000
    connect.max-retries = 3
    connection.pool.size = 20
    
    exactly_once = false   # In analytical scenarios, disabling exactly-once consistency allows some duplicates/losses for better performance.
    schema-changes.enabled = true # Enable schema evolution to avoid frequent modifications; supports add, rename, drop operations.
  }
}
```



# Key MySQL CDC Configurations

1.  **Time Zone Configuration**： It’s recommended to specify the MySQL connection timezone to prevent discrepancies when extracting`datetime`or`timestamp`data.
2.  **User Credentials**：

-   The **username** and **password** must have **replication privileges** , allowing access to the **bin_log** logs.
-   The account should be able to query all tables under the designated databases.

## Database & Table Selection

Typically, each database is assigned to a separate task. Here, we specify only the`test`database.  
Two methods can be used：

1.  **Direct table name selection**
2.  **Regular expression-based table matching**(recommended for large datasets or entire database synchronization).

> **Important：**  
> When using **regular expressions**, both the **database name** and **table name** must be included. The`.`character, which separates them, must be escaped (`\\.`).

For example, to match tables prefixed with`test_`, we use：
```
test\\.test_.*
```

-   The first dot (`.`) represents a literal separator, requiring escaping (`\\.`).
-   The second dot (`.`) represents**any single character**in regex.

Additionally, for tables **without primary keys**, logical primary keys can be specified manually to facilitate data synchronization.

# Startup Mode

The default startup mode is**“initial”**, which means：

1.  **Full historical data sync**first
2.  **Incremental updates**afterward

**Sharding & Fetching**

-   The **default values** for **shard size** and **batch fetch size** work well.
-   If the server has **higher performance**, these values can be increased.

**Server ID**

-   MySQL requires **unique server IDs** for replication nodes.
-   Apache SeaTunnel must **masquerade as a MySQL replica**.
-   If not configured, a default value is used, but **manual specification is recommended** to avoid conflicts.
-   The **server ID range must be greater than the parallelism level**, or errors may occur.

# Timeouts & Retries

-   **Connection Timeout**： For large datasets, increase this value accordingly.
-   **Auto-Retry Interval**： If handling a high volume of tables, consider extending retry intervals.

# Exactly-Once Consistency

For **CDC-based data synchronization**,**exactly-once consistency** is often **not required** in analytical scenarios.

-   **Disabling**it can significantly **boost performance**.
-   However, if strict consistency is required, it **can be enabled** at the cost of reduced performance.

# Schema Evolution

It’s **highly recommended** to **enable schema evolution**, which：

-   Allows **automatic table modifications** (e.g., adding/removing fields)
-   Reduces the need for **manual job updates** when the schema changes

However,**downstream tasks** may fail if they rely on a field that was modified.  
Supported schema changes：  
✔️`ADD COLUMN`  
✔️`DROP COLUMN`  
✔️`RENAME COLUMN`  
✔️`MODIFY COLUMN`

> **Note：** Schema evolution **does not support**`CREATE TABLE`or`DROP TABLE`.

# Configuring the Sink (PostgreSQL)

The **sink** configuration inserts data into **PostgreSQL**.
```
sink {
  jdbc {
        url = "jdbc：postgresql：//192.168.8.101：5432/test"
        driver = "org.postgresql.Driver"
        user = "postgres"
        password = "123456"
        
        generate_sink_sql = true
        database = "test"
        table = "${database_name}.${table_name}"
        schema_save_mode = "CREATE_SCHEMA_WHEN_NOT_EXIST"
        data_save_mode = "APPEND_DATA"
        # enable_upsert = false
    }
}
```

**Key Considerations：**

**JDBC Connection**：

-   Specify PostgreSQL **driver, user, and password**.

**Auto SQL Generation**：

-   Enabling `generate_sink_sql` lets SeaTunnel automatically create tables and generate `INSERT`,`DELETE`, and`UPDATE`statements.

**Schema Handling**：

-   PostgreSQL uses **Database → Schema → Table**, while MySQL has only **Database → Table**.
-   Ensure the **schema is correctly mapped** to avoid data mismatches.

**User Permissions**：

-   The PostgreSQL **user must have table creation permissions** if using auto-schema generation.

> **_For more details, refer to the official documentation：_**  
> _🔗_[_SeaTunnel MySQL-CDC Connector Docs_](https：//seatunnel.apache.org/docs/2.3.9/connector-v2/source/MySQL-CDC/)

# Using Placeholders in Sink Configuration

Apache SeaTunnel supports **placeholders**, which dynamically adjust table names based on the source data.

For example：
```
table = "${database\_name}.${table\_name}"
```
-   Ensures each table syncs correctly without **manual specification**.
-   Supports **concatenation and dynamic formatting**.

# Schema Save Mode and Data Append Strategy

The`schema_save_mode`parameter plays a crucial role in **database-wide synchronization**. It simplifies the process by **automatically creating tables** in the target database, eliminating the need for manual table creation steps.

Another key configuration is`APPEND_DATA`, which is particularly useful when the target database already contains **previously synchronized data**. This setting **prevents the accidental deletion of existing records** , making it a **safer** choice for most scenarios. However, if your use case requires a different approach, you can modify this setting according to the **official documentation guidelines**.

# Enable Upsert for Performance Optimization

Another important parameter is`enable_upsert`. If you **can guarantee that the source data contains no duplicate records** , disabling upsert (`enable_upsert = false`) can **significantly enhance synchronization performance** . This is because, without upsert, the system does not need to check for existing records before inserting new ones.

However, if there is a possibility of duplicate records in the source data, it is **strongly recommended** to keep **Upsert enabled (`enable_upsert = true`). This ensures that records are inserted or updated based on their **primary key** , preventing duplication issues.

For **detailed parameter explanations and further customization options** , please refer to the **official Apache SeaTunnel documentation**.

# Task Submission and Monitoring

Once your configuration file is ready, submit the job using the SeaTunnel command-line tool：

```
./bin/start-seatunnel.sh --config /path/to/config.yaml --async
```

**Key Parameters：**

-   `--config`： Specifies the path to your configuration file.
-   `--async`： Submits the job asynchronously, allowing the command line to exit while the job continues in the background.

After submission, you can monitor the job via SeaTunnel’s cluster UI. In version 2.3.9, SeaTunnel provides a visual interface where you can view job logs, execution status, and data throughput details.

# Data Synchronization Demonstration

For this demonstration, we created two tables (`test_001`and`test_002`) and inserted sample data into MySQL. Using SeaTunnel's synchronization tasks, the data was successfully synchronized to PostgreSQL. The demonstration included insertions, deletions, updates, and even table schema modifications—all of which were reflected in real time on PostgreSQL.

**Key Points：**

-   **Schema Synchronization：**  
    SeaTunnel supports automatic table schema synchronization. When the source MySQL table structure changes, the target PostgreSQL table automatically updates.
-   **Data Consistency：**  
    SeaTunnel ensures data consistency by accurately synchronizing all insert, delete, and update operations to the target database.

# About SeaTunnel

Apache SeaTunnel focuses on data integration and synchronization, addressing common challenges such as：

-   **Diverse Data Sources：**  
    Supporting hundreds of data sources, even as new ones emerge.
-   **Complex Sync Scenarios：**  
    Including full, incremental, CDC, real-time, and whole-database synchronizations.
-   **High Resource Demands：**  
    Traditional tools often require extensive computing or JDBC resources for real-time sync of many small tables.
-   **Monitoring and Quality：**  
    Sync processes can suffer from data loss or duplication, and effective monitoring is essential.
-   **Complex Technology Stacks：**  
    Multiple sync programs may be needed for different systems.
-   **Management Challenges：**  
    Offline and real-time sync are often developed and managed separately, increasing complexity.