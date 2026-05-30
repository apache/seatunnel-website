import ChangeLog from '../changelog/connector-cdc-oracle.md';

# Oracle CDC

> Oracle CDC 源连接器

## 支持这些引擎

> SeaTunnel Zeta<br/>
> Flink <br/>

## 关键特性

- [ ] [批](../../introduction/concepts/connector-v2-features.md)
- [x] [流](../../introduction/concepts/connector-v2-features.md)
- [x] [精确一次](../../introduction/concepts/connector-v2-features.md)
- [ ] [列投影](../../introduction/concepts/connector-v2-features.md)
- [x] [并行性](../../introduction/concepts/connector-v2-features.md)
- [x] [支持用户自定义split](../../introduction/concepts/connector-v2-features.md)

## 描述

Oracle CDC 连接器允许从 Oracle 数据库读取快照数据和增量数据。本文档描述了如何设置 Oracle CDC 连接器以针对 Oracle 数据库运行 SQL 查询。

## 注意

Debezium Oracle 连接器不依赖于连续挖掘选项。连接器负责检测日志切换并自动调整要挖掘的日志，这是连续挖掘选项为您自动执行的操作。
因此，您不能在 debezium 中设置名为 `log.mining.continuous.mine` 的此属性。

## 支持的数据源信息

| 数据源 | 支持的版本 | 驱动程序 | URL | Maven |
|--------|-----------|---------|-----|-------|
| Oracle | 不同的依赖版本有不同的驱动程序类。 | oracle.jdbc.OracleDriver | jdbc:oracle:thin:@datasource01:1523:xe | https://mvnrepository.com/artifact/com.oracle.database.jdbc/ojdbc8 |

## 数据库依赖

### 安装 JDBC 驱动程序

#### 对于 Spark/Flink 引擎

> 1. 您需要确保 [JDBC 驱动程序 jar 包](https://mvnrepository.com/artifact/com.oracle.database.jdbc/ojdbc8) 已放置在目录 `${SEATUNNEL_HOME}/plugins/` 中。
> 2. 为了支持 i18n 字符集，将 `orai18n.jar` 复制到 `$SEATUNNEL_HOME/plugins/` 目录。

#### 对于 SeaTunnel Zeta 引擎

> 1. 您需要确保 [JDBC 驱动程序 jar 包](https://mvnrepository.com/artifact/com.oracle.database.jdbc/ojdbc8) 已放置在目录 `${SEATUNNEL_HOME}/lib/` 中。
> 2. 为了支持 i18n 字符集，将 `orai18n.jar` 复制到 `$SEATUNNEL_HOME/lib/` 目录。

### 启用 Oracle Logminer

> 要在 Seatunnel 中启用 Oracle CDC（变更数据捕获）使用 Logminer（这是 Oracle 提供的内置工具），请按照以下步骤操作：

#### 在没有 CDB（容器数据库）模式的情况下启用 Logminer。

1. 操作系统创建一个空文件目录来存储 Oracle 归档日志和用户表空间。

```shell
mkdir -p /opt/oracle/oradata/recovery_area
mkdir -p /opt/oracle/oradata/ORCLCDB
chown -R oracle /opt/oracle/***
```

2. 以管理员身份登录并启用 Oracle 归档日志。

```sql
sqlplus /nolog;
connect sys as sysdba;
alter system set db_recovery_file_dest_size = 10G;
alter system set db_recovery_file_dest = '/opt/oracle/oradata/recovery_area' scope=spfile;
shutdown immediate;
startup mount;
alter database archivelog;
alter database open;
ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
archive log list;
```

3. 以管理员身份登录并创建一个名为 logminer_user 的帐户，密码为 "oracle"，并授予其读取表和日志的权限。

## 常见问题

### Oracle CDC 需要哪些数据库权限？

LogMiner 用户需要以下权限：

```sql
GRANT CREATE SESSION TO logminer_user;
GRANT SET CONTAINER TO logminer_user;
GRANT SELECT ON V_$DATABASE TO logminer_user;
GRANT FLASHBACK ANY TABLE TO logminer_user;
GRANT SELECT ANY TABLE TO logminer_user;
GRANT SELECT_CATALOG_ROLE TO logminer_user;
GRANT EXECUTE_CATALOG_ROLE TO logminer_user;
GRANT SELECT ANY TRANSACTION TO logminer_user;
GRANT LOGMINING TO logminer_user;
GRANT CREATE TABLE TO logminer_user;
GRANT LOCK ANY TABLE TO logminer_user;
GRANT CREATE SEQUENCE TO logminer_user;
GRANT EXECUTE ON DBMS_LOGMNR TO logminer_user;
GRANT EXECUTE ON DBMS_LOGMNR_D TO logminer_user;
GRANT SELECT ON V_$LOG TO logminer_user;
GRANT SELECT ON V_$LOG_HISTORY TO logminer_user;
GRANT SELECT ON V_$LOGMNR_LOGS TO logminer_user;
GRANT SELECT ON V_$LOGMNR_CONTENTS TO logminer_user;
GRANT SELECT ON V_$LOGMNR_PARAMETERS TO logminer_user;
GRANT SELECT ON V_$LOGFILE TO logminer_user;
GRANT SELECT ON V_$ARCHIVED_LOG TO logminer_user;
GRANT SELECT ON V_$ARCHIVE_DEST_STATUS TO logminer_user;
GRANT SELECT ON V_$TRANSACTION TO logminer_user;
```

同时，需要在数据库和表级别开启附加日志：

```sql
ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
ALTER TABLE schema_name.table_name ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
```

### Oracle CDC 是否支持多租户（CDB/PDB）数据库？

支持。将 `database-names` 设置为 CDB 名称，并将 JDBC URL 指向 CDB 根容器。用户必须是公共用户（以 `C##` 为前缀），且需在所有容器中以 `CONTAINER = ALL` 方式授予上述权限。

### Oracle CDC 是否支持无主键表？

默认情况下，Oracle CDC 需要主键。如果表中存在合适的唯一列，可通过 `table-names-config` 中的 `primaryKeys` 字段指定自定义主键列。

### 如何提升 LogMiner 性能？

- 仅对所需的表和列启用附加日志，以减少重做日志量。
- 在高吞吐量环境中，使用 `log.mining.strategy = online_catalog`（持续挖掘模式）可以获得更好的性能。
- 增大 `log.mining.batch.size.max` 以减少 LogMiner 会话次数。
- 确保重做日志文件足够大，避免频繁的日志切换。

### 支持哪些 Oracle 版本？

Oracle CDC 支持 Oracle Database 11g、12c、19c 和 21c。对于 12c 及更高版本的多租户配置，需使用 CDB 根连接和公共用户。

## 变更日志

<ChangeLog />

