<details><summary> Change Log </summary>

| Change | Commit | Version |
| --- | --- | --- |
|[Feature][Jdbc] Support sink ddl for sqlserver #8114 (#8936)|https://github.com/apache/seatunnel/commit/30aa485b3|2.3.10|
|[Fix][Connector-V2] Fix parse SqlServer JDBC Url error (#8784)|https://github.com/apache/seatunnel/commit/373d2162d|2.3.10|
|[Improve][Jdbc] Support upsert for opengauss (#8627)|https://github.com/apache/seatunnel/commit/56110bf39|2.3.10|
|[Improve][Jdbc] Remove useless utils. (#8793)|https://github.com/apache/seatunnel/commit/36a7533e8|2.3.10|
|[Improve][Jdbc] Improve catalog connection cache (#8626)|https://github.com/apache/seatunnel/commit/6205065b2|2.3.10|
|[Fix][Connector-V2] Fix jdbc sink statement buffer wrong time to clear (#8653)|https://github.com/apache/seatunnel/commit/cf35eecdf|2.3.10|
|[Feature][Jdbc] Support sink ddl for dameng (#8380)|https://github.com/apache/seatunnel/commit/5ff342742|2.3.10|
|[Improve] restruct connector common options (#8634)|https://github.com/apache/seatunnel/commit/f3499a6ee|2.3.10|
|[Improve][Jdbc] Remove oracle &#x27;v$database&#x27; query (#8571)|https://github.com/apache/seatunnel/commit/3cf09f61c|2.3.10|
|[Fix] [Connector-V2] Postgres support for multiple primary keys (#8526)|https://github.com/apache/seatunnel/commit/04db40d97|2.3.10|
|[Feature][JDBC source] pg support char types (#8420)|https://github.com/apache/seatunnel/commit/776ac9447|2.3.9|
|[Feature][Jdbc] Support sink ddl for postgresql (#8276)|https://github.com/apache/seatunnel/commit/353bbd21a|2.3.9|
|[Feature][Connector-V2] Support the jdbc connector for highgo db (#8282)|https://github.com/apache/seatunnel/commit/aa381cbfb|2.3.9|
|[Improve][Jdbc] Support nvarchar in dm (#8270)|https://github.com/apache/seatunnel/commit/2f1c54ee2|2.3.9|
|[Improve][Connector-v2] Use regex to match filedName placeholders in jdbc sink (#8222)|https://github.com/apache/seatunnel/commit/c02d4fed3|2.3.9|
|[Improve][Connector-V2] Support read comment when jdbc dialect without catalog (#8196)|https://github.com/apache/seatunnel/commit/567cd54de|2.3.9|
|[Improve][Connector-V2] The interface supports jdbc respects the target database field type (#8031)|https://github.com/apache/seatunnel/commit/1de056a9a|2.3.9|
|[Improve][dist]add shade check rule (#8136)|https://github.com/apache/seatunnel/commit/51ef80001|2.3.9|
|[Improve][Jdbc] Improve ddl write validate (#8158)|https://github.com/apache/seatunnel/commit/9cdaacddd|2.3.9|
|[Feature][Jdbc] Add Jdbc default dialect for all jdbc series database without dialect (#8132)|https://github.com/apache/seatunnel/commit/399eabcd3|2.3.9|
|[Improve][Jdbc] Refactor ddl change (#8134)|https://github.com/apache/seatunnel/commit/e1f0a238f|2.3.9|
|[Feature][Core] Rename `result_table_name`/`source_table_name` to `plugin_input/plugin_output` (#8072)|https://github.com/apache/seatunnel/commit/c7bbd322d|2.3.9|
|[Improve][Connector-V2] Improve schema evolution on column insert after for mysql-jdbc (#8017)|https://github.com/apache/seatunnel/commit/3fb05da36|2.3.9|
|[Feature][Core] Support cdc task ddl restore for zeta (#7463)|https://github.com/apache/seatunnel/commit/8e322281e|2.3.9|
|[Feature][transform] transform support explode (#7928)|https://github.com/apache/seatunnel/commit/132278c06|2.3.9|
|[Feature][Connector-v2] Support schema evolution for Oracle connector (#7908)|https://github.com/apache/seatunnel/commit/79406bcc2|2.3.9|
|[Improve][Connector-V2] Improve jdbc merge table from path and query when type is decimal (#7917)|https://github.com/apache/seatunnel/commit/8baa012ce|2.3.9|
|[Fix][Connector-V2] Fix hana type loss of precision (#7912)|https://github.com/apache/seatunnel/commit/18dcca36c|2.3.9|
|[Feature][Connector-V2] Jdbc DB2 support upsert SQL  (#7879)|https://github.com/apache/seatunnel/commit/139919334|2.3.9|
|[Improve][Jdbc] Optimize index name conflicts when create table for postgresql (#7875)|https://github.com/apache/seatunnel/commit/312ee866f|2.3.9|
|[Improve][Jdbc] Support postgresql inet type. (#7820)|https://github.com/apache/seatunnel/commit/25b68b362|2.3.9|
|[Fix][Connector-V2]Oceanbase vector database is added as the source server (#7832)|https://github.com/apache/seatunnel/commit/258f93176|2.3.9|
|[Feature][connector-v2]Support opengauss jdbc connnector using opengauss driver. (#7622)|https://github.com/apache/seatunnel/commit/bbf643772|2.3.9|
|[Improve][Jdbc] Support save mode for the sink of jdbc-dm (#7814)|https://github.com/apache/seatunnel/commit/b87d732c8|2.3.9|
|[Feature][Restapi] Allow metrics information to be associated to logical plan nodes (#7786)|https://github.com/apache/seatunnel/commit/6b7c53d03|2.3.9|
|[Feature][Connector-V2] SqlServer support user-defined type (#7706)|https://github.com/apache/seatunnel/commit/fb8903327|2.3.8|
|[Hotfix][CDC] Fix ddl duplicate execution error when config multi_table_sink_replica (#7634)|https://github.com/apache/seatunnel/commit/23ab3edbb|2.3.8|
|[Feature][Connector-Paimon] Support dynamic bucket splitting improves Paimon writing efficiency (#7335)|https://github.com/apache/seatunnel/commit/bc0326cba|2.3.8|
|[Fix][Connector-V2] Fix jdbc test case failed (#7690)|https://github.com/apache/seatunnel/commit/4f5d27f62|2.3.8|
|[Improve][Jdbc] Jdbc truncate table should check table not database (#7654)|https://github.com/apache/seatunnel/commit/0c0eb7e41|2.3.8|
|[Feature][Connector-V2] jdbc saphana source tablepath support view and  synonym (#7670)|https://github.com/apache/seatunnel/commit/7e0c20a48|2.3.8|
|[Fix][Connector-v2] Throw Exception in sql query for JdbcCatalog in table or db exists query (#7651)|https://github.com/apache/seatunnel/commit/70ec59ce0|2.3.8|
|[Fix][JDBC] Fix starrocks jdbc dialect catalog conflict with starrocks connector (#7578)|https://github.com/apache/seatunnel/commit/020aab422|2.3.8|
|[Feature] Support tidb cdc connector source #7199 (#7477)|https://github.com/apache/seatunnel/commit/87ec786bd|2.3.8|
|[bugfix] fix oracle query table length (#7627)|https://github.com/apache/seatunnel/commit/2e002ce09|2.3.8|
|[Hotfix][Connector-v2] Fix the NullPointerException for jdbc oracle which used the table_list (#7544)|https://github.com/apache/seatunnel/commit/555028217|2.3.8|
|[Improve][Connector-v2] Support mysql 8.1/8.2/8.3 for jdbc (#7530)|https://github.com/apache/seatunnel/commit/657fe69b2|2.3.8|
|[Improve][Connector-v2] Release resource in closeStatements even exception occurred in executeBatch (#7533)|https://github.com/apache/seatunnel/commit/590f7d110|2.3.8|
|[Fix][Connector-V2] Fix jdbc query sql can not get table path (#7484)|https://github.com/apache/seatunnel/commit/8e0ca8f72|2.3.8|
|[Feature][Connector-V2] Add `decimal_type_narrowing` option in jdbc (#7461)|https://github.com/apache/seatunnel/commit/696f2948f|2.3.8|
|[Improve][Connector-V2] update vectorType (#7446)|https://github.com/apache/seatunnel/commit/1bba72385|2.3.8|
|[Improve][API] Move catalog open to SaveModeHandler (#7439)|https://github.com/apache/seatunnel/commit/8c2c5c79a|2.3.8|
|[FIX][E2E]Modify the OceanBase test case to the latest imageChange image (#7452)|https://github.com/apache/seatunnel/commit/6abb83dea|2.3.8|
|[Feature][Connector-V2][OceanBase] Support vector types on OceanBase (#7375)|https://github.com/apache/seatunnel/commit/a6b188d55|2.3.8|
|[Improve][Connector-V2] Remove system table limit (#7391)|https://github.com/apache/seatunnel/commit/adf888e00|2.3.8|
|[Fix] Fix oracle sample data from column error (#7340)|https://github.com/apache/seatunnel/commit/2130e0d5a|2.3.8|
|[Improve][Connector-V2] Close all ResultSet after used (#7389)|https://github.com/apache/seatunnel/commit/853e97321|2.3.8|
|[Hotifx][Jdbc] Fix MySQL unsupport &#x27;ZEROFILL&#x27; column type (#7407)|https://github.com/apache/seatunnel/commit/713038212|2.3.8|
|[Improvement] add starrocks jdbc dialect (#7294)|https://github.com/apache/seatunnel/commit/b5140f598|2.3.8|
|[Hotfix][Connector] Fix jdbc compile error (#7359)|https://github.com/apache/seatunnel/commit/2769ed502|2.3.7|
|[Fix][Connector-V2][OceanBase] Remove OceanBase catalog&#x27;s dependency on mysql driver (#7311)|https://github.com/apache/seatunnel/commit/3130ae089|2.3.7|
|[Improve][Jdbc] Skip all index when auto create table to improve performance of write (#7288)|https://github.com/apache/seatunnel/commit/dc3c23981|2.3.7|
|[Improve][Jdbc] Remove MysqlType references in JdbcDialect (#7333)|https://github.com/apache/seatunnel/commit/16eeb1c12|2.3.7|
|[Improve][Jdbc] Merge user config primary key when create table (#7313)|https://github.com/apache/seatunnel/commit/819c68565|2.3.7|
|[Improve][Connector-v2] Optimize the way of databases and tables are checked for existence (#7261)|https://github.com/apache/seatunnel/commit/f012b2a6f|2.3.7|
|[Feature][Jdbc] Support hive compatibleMode add inceptor dialect (#7262)|https://github.com/apache/seatunnel/commit/31e59cdf8|2.3.6|
|[Improve][Connector-v2] Optimize the count table rows for jdbc-oracle and oracle-cdc (#7248)|https://github.com/apache/seatunnel/commit/0d08b2006|2.3.6|
|[Feature][Core] Support using upstream table placeholders in sink options and auto replacement (#7131)|https://github.com/apache/seatunnel/commit/c4ca74122|2.3.6|
|[Fix] Fix Hana type converter decimal scale is 0 convert to int error (#7167)|https://github.com/apache/seatunnel/commit/6e33a97c8|2.3.6|
|[Improve][Jdbc] Support write unicode text into sqlserver (#7159)|https://github.com/apache/seatunnel/commit/e44e8b93b|2.3.6|
|[Improve][Jdbc] Remove user info in catalog-table options (#7178)|https://github.com/apache/seatunnel/commit/4e001be25|2.3.6|
|[Improve][connector-v2-jdbc-mysql] Add support for MySQL 8.4 (#7151)|https://github.com/apache/seatunnel/commit/dbdbdf015|2.3.6|
|[Feature][Connector-V2] Support jdbc hana catalog and type convertor (#6950)|https://github.com/apache/seatunnel/commit/d66339873|2.3.6|
|[Improve] Change catalog table log to debug level (#7136)|https://github.com/apache/seatunnel/commit/b111d2f84|2.3.6|
|[Improve][Connector-V2] Support schema evolution for mysql-cdc and mysql-jdbc (#6929)|https://github.com/apache/seatunnel/commit/cf91e51fc|2.3.6|
|[connector-jdbc][bugfix] fix sqlServer create table comment special string bug (#7024)|https://github.com/apache/seatunnel/commit/403564db1|2.3.6|
|[bugfix] fix pgsql create table comment special string bug (#7022)|https://github.com/apache/seatunnel/commit/9fe844f62|2.3.6|
|[connector-jdbc][bugfix] fix oracle create table comment special string bug (#7012)|https://github.com/apache/seatunnel/commit/a9e0f6787|2.3.6|
|[bugfix] fix mysql create table comment special string bug (#6998)|https://github.com/apache/seatunnel/commit/904e9cf78|2.3.6|
|[Improve][[Jdbc]sink sql support custom field.(#6515) (#6525)|https://github.com/apache/seatunnel/commit/ef3e61dbc|2.3.6|
|[Feature][Jdbc] Support redshift catalog (#6992)|https://github.com/apache/seatunnel/commit/8d5cbcee7|2.3.6|
|[Improve][Connector-V2] Clean key name in catalog table (#6942)|https://github.com/apache/seatunnel/commit/a399ef48c|2.3.6|
|[Improve][Zeta] Move SaveMode behavior to master (#6843)|https://github.com/apache/seatunnel/commit/80cf91318|2.3.6|
|[Improve][Jdbc] Quotes the identifier for table path (#6951)|https://github.com/apache/seatunnel/commit/d70ec61f3|2.3.6|
|[Hotfix][Jdbc] Fix oracle savemode create table (#6651)|https://github.com/apache/seatunnel/commit/4b6c13e8f|2.3.6|
|[Improve][JDBC Source] Fix Split can not be cancel (#6825)|https://github.com/apache/seatunnel/commit/ee3b7c372|2.3.6|
|[Feature][Doris] Add Doris type converter (#6354)|https://github.com/apache/seatunnel/commit/518999184|2.3.6|
|[Hotfix][Jdbc/CDC] Fix postgresql uuid type in jdbc read (#6684)|https://github.com/apache/seatunnel/commit/868ba4d7c|2.3.6|
|[Improve][Connector] Add some sqlserver IDENTITY type for catalog (#6822)|https://github.com/apache/seatunnel/commit/f69839655|2.3.6|
|[Feature][Jdbc] Support the jdbc connector for InterSystems IRIS (#6797)|https://github.com/apache/seatunnel/commit/46600969b|2.3.6|
|[Fix][MySQL]: Fix MySqlTypeConverter could not be instantiated (#6781)|https://github.com/apache/seatunnel/commit/a5609d600|2.3.6|
|[Hotfix][Jdbc] Fix table/query columns order merge for jdbc catalog (#6771)|https://github.com/apache/seatunnel/commit/df1954d52|2.3.6|
|[Fix] Fix Oracle type converter handle negative scale in number type (#6758)|https://github.com/apache/seatunnel/commit/6d710690c|2.3.6|
|[Improve][mysql-cdc] Support mysql 5.5 versions (#6710)|https://github.com/apache/seatunnel/commit/058f5594a|2.3.6|
|[Improve][Jdbc] Add quote identifier for sql (#6669)|https://github.com/apache/seatunnel/commit/849d748d3|2.3.5|
|[Improve][Jdbc] Increase tyepe converter when auto creating tables (#6617)|https://github.com/apache/seatunnel/commit/cc660206d|2.3.5|
|[feature][connector-v2] add xugudb connector (#6561)|https://github.com/apache/seatunnel/commit/80f392afb|2.3.5|
|[Hotfix] Fix DEFAULT TABLE problem (#6352)|https://github.com/apache/seatunnel/commit/cdb1856e8|2.3.5|
|[Improve] Improve MultiTableSinkWriter prepare commit performance (#6495)|https://github.com/apache/seatunnel/commit/2086b0e8a|2.3.5|
|[Improve][JDBC] Optimized code style for getting jdbc field types (#6583)|https://github.com/apache/seatunnel/commit/ddca95f32|2.3.5|
|[Improve] Add SaveMode log of process detail (#6375)|https://github.com/apache/seatunnel/commit/b0d70ce22|2.3.5|
|[Improve][Jdbc] Support custom case-sensitive config for dameng (#6510)|https://github.com/apache/seatunnel/commit/d6dcb03bf|2.3.5|
|feat: jdbc support copy in statement. (#6443)|https://github.com/apache/seatunnel/commit/ca4a65fc0|2.3.5|
|[Improve][Jdbc] Using varchar2 datatype store string in oracle (#6392)|https://github.com/apache/seatunnel/commit/14405fa8d|2.3.5|
|[Improve][API] Unify type system api(data &amp; type) (#5872)|https://github.com/apache/seatunnel/commit/b38c7edcc|2.3.5|
|Fix Jdbc sink target table name error (#6269)|https://github.com/apache/seatunnel/commit/2f62235e3|2.3.4|
|[Improve][JDBC] Use PreparedStatement to sample data from column (#6242)|https://github.com/apache/seatunnel/commit/bd0e66d53|2.3.4|
|[Improve][JDBC-sink] Improve query Approximate Total Row Count of a Table (#5972)|https://github.com/apache/seatunnel/commit/8156036a2|2.3.4|
|[Feature][JDBC、CDC] Support Short and Byte Type in spliter (#6027)|https://github.com/apache/seatunnel/commit/6f8d0a504|2.3.4|
|[Improve] Support `int identity` type in sql server (#6186)|https://github.com/apache/seatunnel/commit/1a8da1c84|2.3.4|
|[Bugfix][JDBC、CDC] Fix Spliter Error in Case of Extensive Duplicate Data (#6026)|https://github.com/apache/seatunnel/commit/635c24e8b|2.3.4|
| [Feature][Connector-V2][Postgres-cdc]Support for Postgres cdc (#5986)|https://github.com/apache/seatunnel/commit/97438b940|2.3.4|
|Add date type and float type column split support (#6160)|https://github.com/apache/seatunnel/commit/b9a62e5c3|2.3.4|
|[Improve] Extend `SupportResourceShare` to spark/flink (#5847)|https://github.com/apache/seatunnel/commit/c69da93b8|2.3.4|
|[Feature] Support `uuid` in postgres jdbc (#6185)|https://github.com/apache/seatunnel/commit/f56855098|2.3.4|
|[Feature][Connector-V2][Oracle-cdc]Support for oracle cdc (#5196)|https://github.com/apache/seatunnel/commit/aaef22b31|2.3.4|
|[Feature][Connector] update pgsql catalog for save mode (#6080)|https://github.com/apache/seatunnel/commit/84ce51692|2.3.4|
|[Hotfix][Jdbc] Fix dameng catalog query table sql (#6141)|https://github.com/apache/seatunnel/commit/413fa7450|2.3.4|
|[improve][catalog-postgres] Improve get column sql compatibility (#5664)|https://github.com/apache/seatunnel/commit/23ce592ad|2.3.4|
|[Feature][Connector] update oracle catalog for save mode (#6092)|https://github.com/apache/seatunnel/commit/dfbf92769|2.3.4|
|[Feature][Connectors-V2][Jdbc] Supports Sqlserver Niche Data Types (#6122)|https://github.com/apache/seatunnel/commit/6673f6f77|2.3.4|
|[Improve][Connector-V2][Jdbc] Shade hikari in jdbc connector (#6116)|https://github.com/apache/seatunnel/commit/dd698c95b|2.3.4|
|[Feature][Connector] update sqlserver catalog for save mode (#6086)|https://github.com/apache/seatunnel/commit/edcaacecb|2.3.4|
|[Feature][Connector-V2][PostgresSql] add JDBC source support string type as partition key (#6079)|https://github.com/apache/seatunnel/commit/3522eb157|2.3.4|
|[Hotfix][Jdbc] Fix jdbc setFetchSize error (#6005)|https://github.com/apache/seatunnel/commit/d41af8a6e|2.3.4|
|Support using multiple hadoop account (#5903)|https://github.com/apache/seatunnel/commit/d69d88d1a|2.3.4|
|[Feature] Add unsupported datatype check for all catalog (#5890)|https://github.com/apache/seatunnel/commit/b9791285a|2.3.4|
|[Hotfix][Split] Fix split key not support BigInteger type|https://github.com/apache/seatunnel/commit/5adf5d2b9|2.3.4|
|[Improve] Replace SeaTunnelRowType with TableSchema in the JdbcRowConverter|https://github.com/apache/seatunnel/commit/1cc1b1b8c|2.3.4|
|[Hotfix][Jdbc] Fix cdc updates were not filtering same primary key (#5923)|https://github.com/apache/seatunnel/commit/38d3b8581|2.3.4|
|[Improve]Change System.out.println to log output. (#5912)|https://github.com/apache/seatunnel/commit/bbedb07a9|2.3.4|
|[Bug] Fix Hive-Jdbc use krb5 overwrite kerberosKeytabPath (#5891)|https://github.com/apache/seatunnel/commit/f0b6092c1|2.3.4|
|Reduce the time cost of getCatalogTable in jdbc (#5908)|https://github.com/apache/seatunnel/commit/51a373757|2.3.4|
|[Improve] Improve Jdbc connector error message when datatype unsupported (#5864)|https://github.com/apache/seatunnel/commit/69f79af3a|2.3.4|
|[Improve] Rename `getCountSql` to `getExistDataSql` (#5838)|https://github.com/apache/seatunnel/commit/2233b3a38|2.3.4|
|[Fix] Fix read from Oracle Date type value lose time (#5814)|https://github.com/apache/seatunnel/commit/2d704e36b|2.3.4|
|[Improve][JdbcSource] Optimize catalog-table metadata merge logic (#5828)|https://github.com/apache/seatunnel/commit/7d8028a60|2.3.4|
|[Improve][Common] Introduce new error define rule (#5793)|https://github.com/apache/seatunnel/commit/9d1b2582b|2.3.4|
|[Feature][Hive JDBC Source] Support Hive JDBC Source Connector (#5424)|https://github.com/apache/seatunnel/commit/a64e177d0|2.3.4|
|[Improve] Remove use `SeaTunnelSink::getConsumedType` method and mark it as deprecated (#5755)|https://github.com/apache/seatunnel/commit/8de740810|2.3.4|
|[Improve][Connector] Add field name to `DataTypeConvertor` to improve error message (#5782)|https://github.com/apache/seatunnel/commit/ab60790f0|2.3.4|
|[Feature][Oracle] Support XMLTYPE data integration #5716 (#5723)|https://github.com/apache/seatunnel/commit/620f081ad|2.3.4|
|[Fix] Fix Postgres create table test case failed (#5778)|https://github.com/apache/seatunnel/commit/b98b6bcee|2.3.4|
|[Improve][Jdbc] Fix database identifier (#5756)|https://github.com/apache/seatunnel/commit/dbfc8a670|2.3.4|
|[Fix] Fix PG will not create index when using auto create table #5721|https://github.com/apache/seatunnel/commit/e5fd88dbe|2.3.4|
|[Improve] Remove all useless `prepare`, `getProducedType` method (#5741)|https://github.com/apache/seatunnel/commit/ed94fffbb|2.3.4|
|[feature][connector-jdbc]Add Save Mode function and Connector-JDBC (MySQL) connector has been realized (#5663)|https://github.com/apache/seatunnel/commit/eff17ccbe|2.3.4|
|[Bug] [connector-jdbc] Nullable Column source have null data could be unexpected results. (#5560)|https://github.com/apache/seatunnel/commit/3f429e1f0|2.3.4|
|[Improve] Add default implement for `SeaTunnelSink::setTypeInfo` (#5682)|https://github.com/apache/seatunnel/commit/86cba8745|2.3.4|
|[BUG][Connector-V2][Jdbc] support postgresql xml type  (#5724)|https://github.com/apache/seatunnel/commit/5f5d4da13|2.3.4|
|[Improve][E2E][Jdbc] Enable IT case for Oceanbase Mysql mode (#5697)|https://github.com/apache/seatunnel/commit/879c2aa07|2.3.4|
|[Feature][Jdbc] Support read multiple tables (#5581)|https://github.com/apache/seatunnel/commit/33fa8ff24|2.3.4|
|[Feature] Support multi-table sink (#5620)|https://github.com/apache/seatunnel/commit/81ac17318|2.3.4|
|[Improve] Remove catalog tag for config file (#5645)|https://github.com/apache/seatunnel/commit/dc509aa08|2.3.4|
|[Feature][Jdbc] Supporting more ways to configure connection parameters. (#5388)|https://github.com/apache/seatunnel/commit/d31e9478f|2.3.4|
|[Feature][Connector-V2][Jdbc] Add OceanBase catalog (#5439)|https://github.com/apache/seatunnel/commit/cd4b7ff7d|2.3.4|
|[BUGFIX][Catalog] oracle catalog create table repeat and oracle pg null point (#5517)|https://github.com/apache/seatunnel/commit/103da931f|2.3.4|
|Support config column/primaryKey/constraintKey in schema (#5564)|https://github.com/apache/seatunnel/commit/eac76b4e5|2.3.4|
|[Improve] Refactor CatalogTable and add `SeaTunnelSource::getProducedCatalogTables` (#5562)|https://github.com/apache/seatunnel/commit/41173357f|2.3.4|
|[Feature][Jdbc] Add Dameng catalog (#5451)|https://github.com/apache/seatunnel/commit/c23070919|2.3.4|
|[Feature] Add tidb datatype convertor (#5440)|https://github.com/apache/seatunnel/commit/61391bda9|2.3.4|
|[Feature][Connector-V2]  jdbc connector supports Kingbase database (#4803)|https://github.com/apache/seatunnel/commit/953856715|2.3.4|
|[Feature][Catalog] Catalog add Case Conversion Definition (#5328)|https://github.com/apache/seatunnel/commit/7b5b28bdb|2.3.4|
|[Feature][Jdbc] Jdbc database support identifier (#5089)|https://github.com/apache/seatunnel/commit/38b6d6e4b|2.3.4|
|[Improve][Connector-v2][Jdbc] Refactor AbstractJdbcCatalog (#5096)|https://github.com/apache/seatunnel/commit/dde3104f7|2.3.4|
|[Improve][CheckStyle] Remove useless &#x27;SuppressWarnings&#x27; annotation of checkstyle. (#5260)|https://github.com/apache/seatunnel/commit/51c0d709b|2.3.4|
|[Hotfix] Fix com.google.common.base.Preconditions to seatunnel shade one (#5284)|https://github.com/apache/seatunnel/commit/ed5eadcf7|2.3.3|
|[bug][jdbc][oracle]Fix the Oracle number type mapping problem (#5209)|https://github.com/apache/seatunnel/commit/9d3c3de90|2.3.3|
|[BUG][Connector-V2][Jdbc] support postgresql json type  (#5194)|https://github.com/apache/seatunnel/commit/7a862d14b|2.3.3|
|[Improve] [Connector-V2] Remove scheduler in JDBC sink #4736 (#5168)|https://github.com/apache/seatunnel/commit/3b0a39314|2.3.3|
|[CI] Split updated modules integration test for part 5 (#5208)|https://github.com/apache/seatunnel/commit/18f14d608|2.3.3|
|[Bug] [connector-v2] PostgreSQL versions below 9.5 are compatible use cdc sync problem (#5120)|https://github.com/apache/seatunnel/commit/9af696a1d|2.3.3|
|[Improve][Connector-v2][Jdbc]  check url not null throw friendly message (#5097)|https://github.com/apache/seatunnel/commit/b0815f2a9|2.3.3|
|[Feature][Catalog] Add JDBC Catalog auto create table (#4917)|https://github.com/apache/seatunnel/commit/63eb13767|2.3.3|
|[Feature][CDC] Support tables without primary keys (with unique keys) (#163) (#5150)|https://github.com/apache/seatunnel/commit/32b7f2b69|2.3.3|
|[Hotfix][Connector][Jdbc] Fix the problem of JdbcOutputFormat database connection leak (#4802)|https://github.com/apache/seatunnel/commit/4cc10e83e|2.3.3|
|[Feature][JDBC Sink] Add DM upsert support (#5073)|https://github.com/apache/seatunnel/commit/5e8d982e2|2.3.3|
|[Improve] Improve savemode api (#4767)|https://github.com/apache/seatunnel/commit/4acd370d4|2.3.3|
|[Feature][Connector-V2] JDBC source support string type as partition key (#4947)|https://github.com/apache/seatunnel/commit/d1d267765|2.3.3|
|[Feature][Connector-V2][Jdbc] Add oceanbase dialect factory (#4989)|https://github.com/apache/seatunnel/commit/7ba11cecd|2.3.3|
|Fix XA Transaction bug (#5020)|https://github.com/apache/seatunnel/commit/852fe104b|2.3.3|
|[Improve][CDC]Remove  driver for cdc connector (#4952)|https://github.com/apache/seatunnel/commit/b65f40c3c|2.3.3|
|[Improve] Documentation and partial word optimization. (#4936)|https://github.com/apache/seatunnel/commit/6e8de0e2a|2.3.3|
|[Improve][Connector-V2][Jdbc-Source] Support for Decimal types as splict keys  (#4634)|https://github.com/apache/seatunnel/commit/d56bb1ba1|2.3.3|
|[Bugfix][zeta] Fix the deadlock issue with JDBC driver loading (#4878)|https://github.com/apache/seatunnel/commit/c30a2a1b1|2.3.2|
|[Hotfix][Jdbc] Fix XA DataSource crash(Oracle/Dameng/SqlServer) (#4866)|https://github.com/apache/seatunnel/commit/bde19b637|2.3.2|
|[Feature][Connector-v2] Add Snowflake Source&amp;Sink connector (#4470)|https://github.com/apache/seatunnel/commit/06c59a25f|2.3.2|
|[Hotfix][Connector-V2][Jdbc] Fix the error of extracting primary key column in sink (#4815)|https://github.com/apache/seatunnel/commit/0eff3aeed|2.3.2|
|[Hotfix][Connector][Jdbc] Fix reconnect throw close statement exception (#4801)|https://github.com/apache/seatunnel/commit/ea3bc1a67|2.3.2|
|[Hotfix][Connector][Jdbc] Fix sqlserver system table case sensitivity (#4806)|https://github.com/apache/seatunnel/commit/2ca7426d2|2.3.2|
|[Hotfix][Jdbc][Oracle] Fix oracle sql table identifier (#4754)|https://github.com/apache/seatunnel/commit/84cb51ff8|2.3.2|
|[Improve][Jdbc] Populate primary key when jdbc sink is created using CatalogTable (#4755)|https://github.com/apache/seatunnel/commit/4af3bf901|2.3.2|
|[Feature][PostgreSQL-jdbc] Supports GEOMETRY data type for PostgreSQL… (#4673)|https://github.com/apache/seatunnel/commit/a5af4d9b6|2.3.2|
|[Improve][Core] Add check of sink and source config to avoid null pointer exception. (#4734)|https://github.com/apache/seatunnel/commit/8f66ce96c|2.3.2|
|[Hotfix][JDBC-SINK] Fix TiDBCatalog without open (#4718)|https://github.com/apache/seatunnel/commit/34a7f3eaa|2.3.2|
|[Feature][E2E] Add mysql-cdc e2e testcase (#4639)|https://github.com/apache/seatunnel/commit/87001dfd1|2.3.2|
|[Hotfix][JDBC Sink] Fix JDBC Sink oom bug (#4690)|https://github.com/apache/seatunnel/commit/08b6f992a|2.3.2|
|Improve the option rule for jdbc sink (#4694)|https://github.com/apache/seatunnel/commit/a6b370441|2.3.2|
|[feature][catalog] Support for multiplexing connections (#4550)|https://github.com/apache/seatunnel/commit/41277d7f7|2.3.2|
|[Bugfix][Jdbc-Mysql Mysql-CDC] Fix MySQL BIT type incorrectly converted to Boolean type (#4671)|https://github.com/apache/seatunnel/commit/89b0099ff|2.3.2|
|[Hotfix][Jdbc[SqlServer] Fix sqlserver jdbc url parse (#4697)|https://github.com/apache/seatunnel/commit/b24c3226e|2.3.2|
|Revert &quot;[Improve][Catalog] refactor catalog (#4540)&quot; (#4628)|https://github.com/apache/seatunnel/commit/2d1933195|2.3.2|
|[Feature][Connector][Jdbc] Add DataTypeConvertor for JDBC-Postgres (#4575)|https://github.com/apache/seatunnel/commit/91f512597|2.3.2|
|[Improve][Catalog] refactor catalog (#4540)|https://github.com/apache/seatunnel/commit/b0a701cb8|2.3.2|
|[Bug] [JDBC Source] fix split exception when source table is empty (#4570)|https://github.com/apache/seatunnel/commit/c73b9331c|2.3.2|
|[Feature][Connector][Jdbc] Add vertica connector. (#4303)|https://github.com/apache/seatunnel/commit/e6b4f9872|2.3.2|
|[Hotfix][Catalog] Filter out unavailable constrain keys (#4557)|https://github.com/apache/seatunnel/commit/5e5859546|2.3.2|
|[Hotfix][Connector-V2][Jdbc] Simple sql has the highest priority (#4548)|https://github.com/apache/seatunnel/commit/74d4d2485|2.3.2|
|[Improve][Connector-V2][Jdbc] Jdbc source supports factory SPI (#4264)|https://github.com/apache/seatunnel/commit/a97f33797|2.3.2|
|[Jdbc][Chore] improve the exception message when primary key not found in row (#4474)|https://github.com/apache/seatunnel/commit/06fa850da|2.3.2|
|[hotfix][JDBC] Fix the table name is not automatically obtained when multiple tables (#4514)|https://github.com/apache/seatunnel/commit/c84d6f8d1|2.3.2|
|[Chore][Jdbc] add the log for sql and update some style (#4475)|https://github.com/apache/seatunnel/commit/a9e650304|2.3.2|
|[Hotfix][Connector-V2][Jdbc] Set default value to false of JdbcOption: generate_sink_sql (#4471)|https://github.com/apache/seatunnel/commit/7da11c2f4|2.3.2|
|[feature][jdbc][TiDB] add TiDB catalog (#4438)|https://github.com/apache/seatunnel/commit/9a32db6fc|2.3.2|
|[Hotfix][Connector] Fix sqlserver catalog (#4441)|https://github.com/apache/seatunnel/commit/8540c7f9f|2.3.2|
|[Feature][CDC][SqlServer] Support multi-table read (#4377)|https://github.com/apache/seatunnel/commit/c4e3f2dc0|2.3.2|
|[Improve][JdbcSink]Fix connection failure caused by connection timeout. (#4322)|https://github.com/apache/seatunnel/commit/e1f6d3b3f|2.3.2|
|[Hotfix][Connector-V2][Jdbc] Field aliases are not supported in the query of jdbc source. (#4158) (#4210)|https://github.com/apache/seatunnel/commit/3d7ff831f|2.3.1|
|Change file type to file_format_type in file source/sink (#4249)|https://github.com/apache/seatunnel/commit/973a2fae3|2.3.1|
|Change redshift type to lowercase (#4248)|https://github.com/apache/seatunnel/commit/10447ae10|2.3.1|
|Add redshift datatype convertor (#4245)|https://github.com/apache/seatunnel/commit/b19011517|2.3.1|
|[improve][zeta] fix zeta bugs|https://github.com/apache/seatunnel/commit/3a82e8b39|2.3.1|
|[Improve] Support MySqlCatalog Use JDBC URL With Custom Suffix|https://github.com/apache/seatunnel/commit/210d0ff1f|2.3.1|
|[hotfix] fixed jdbc IT error|https://github.com/apache/seatunnel/commit/dd20af0a9|2.3.1|
|Merge branch &#x27;dev&#x27; into merge/cdc|https://github.com/apache/seatunnel/commit/4324ee191|2.3.1|
|[Improve][Project] Code format with spotless plugin.|https://github.com/apache/seatunnel/commit/423b58303|2.3.1|
|[improve][jdbc] use ReadonlyConfig instead of Config (#4236)|https://github.com/apache/seatunnel/commit/c90c58e24|2.3.1|
|[Improve][Jdbc-sink] add database field to sink config (#4199)|https://github.com/apache/seatunnel/commit/ec368902f|2.3.1|
|[improve][jdbc] Reduce jdbc options configuration (#4218)|https://github.com/apache/seatunnel/commit/ddd8f808b|2.3.1|
|Fix mysql get default value (#4204)|https://github.com/apache/seatunnel/commit/6848434f2|2.3.1|
|[hotfix][zeta] fix zeta multi-table parser error (#4193)|https://github.com/apache/seatunnel/commit/98f2ad0c1|2.3.1|
|[Improve] Remove AUTO_COMMIT To Optional In JDBC OptionRule (#4194)|https://github.com/apache/seatunnel/commit/9d088017a|2.3.1|
|[Improve] [Connector-V2] [StarRocks] Starrocks Support Auto Create Table (#4177)|https://github.com/apache/seatunnel/commit/7e0008e6f|2.3.1|
|[improve][catalog][jdbc] Add MySQL catalog factory (#4168)|https://github.com/apache/seatunnel/commit/95e3cbf87|2.3.1|
|[Improve][build] Give the maven module a human readable name (#4114)|https://github.com/apache/seatunnel/commit/d7cd60105|2.3.1|
|Add convertor factory (#4119)|https://github.com/apache/seatunnel/commit/cbdea45d9|2.3.1|
|Add ElasticSearch catalog (#4108)|https://github.com/apache/seatunnel/commit/9ee4d8394|2.3.1|
|Add Kafka catalog (#4106)|https://github.com/apache/seatunnel/commit/34f1f21e4|2.3.1|
|[Improve][Project] Code format with spotless plugin. (#4101)|https://github.com/apache/seatunnel/commit/a2ab16656|2.3.1|
|Add DataTypeConvertor in Catalog (#4094)|https://github.com/apache/seatunnel/commit/840c3e5eb|2.3.1|
|[Feature] [Catalog] Support create/drop table, create/drop database in catalog (#4075)|https://github.com/apache/seatunnel/commit/d8a0be84c|2.3.1|
| [Bug][Connector-V2][Jdbc] Fixed no exception throwing problem (#3957)|https://github.com/apache/seatunnel/commit/6ab266e59|2.3.1|
|[Bug][CDC] Fix jdbc sink generate update sql (#3940)|https://github.com/apache/seatunnel/commit/233465d4e|2.3.1|
|[Improve][JDBC] improve jdbc sink option (#3864)|https://github.com/apache/seatunnel/commit/768a9300e|2.3.1|
|Fix Source Class Support Parallelism judge &amp; Add UT for it (#3878)|https://github.com/apache/seatunnel/commit/ce85a8c68|2.3.1|
|[Feature][Connector] add get source method to all source connector (#3846)|https://github.com/apache/seatunnel/commit/417178fb8|2.3.1|
|[Feature][Connector-V2] Jdbc connector support SAP HANA. (#3017)|https://github.com/apache/seatunnel/commit/fe0180fab|2.3.1|
|[Feature][API &amp; Connector &amp; Doc] add parallelism and column projection interface (#3829)|https://github.com/apache/seatunnel/commit/b9164b8ba|2.3.1|
|[Improve][JDBC Connector]improve option rule (#3802)|https://github.com/apache/seatunnel/commit/139256741|2.3.1|
|[Hotfix][Jdbc Sink] fix xa transaction commit failure on pipeline restore (#3809)|https://github.com/apache/seatunnel/commit/39dae4cfd|2.3.1|
|[Improve][Connector-V2][JDBC] Add exactly-once for JDBC source connector (#3750)|https://github.com/apache/seatunnel/commit/5328e9d84|2.3.1|
|[Improve][Connector-v2] Remove unused options for jdbc source factory (#3794)|https://github.com/apache/seatunnel/commit/861004d30|2.3.1|
|[Feature][Connector-jdbc] Fix JDBC Connector Throw Exception Error. (#3796)|https://github.com/apache/seatunnel/commit/38646b11b|2.3.1|
|[hotfix][ST-Engine] fix jdbc connector exactly-once null pointer (#3730)|https://github.com/apache/seatunnel/commit/0c5986fbe|2.3.0|
|[Improve][connector-jdbc] Add config item enable upsert by query (#3708)|https://github.com/apache/seatunnel/commit/e1f951f78|2.3.0|
|[Hotfix][connector-v2] fix SemanticXidGenerator#generateXid indexOutOfBounds #3701 (#3705)|https://github.com/apache/seatunnel/commit/f351ceaf4|2.3.0|
|[Hotfix][Connector-V2][jdbc] fix jdbc connection reset bug (#3670)|https://github.com/apache/seatunnel/commit/6fe0e6aec|2.3.0|
|[Improve][Connector-V2][JDBC] Unified exception for JDBC source &amp; sink (#3598)|https://github.com/apache/seatunnel/commit/865ca2bba|2.3.0|
|[Connector][JDBC]Support Redshift sink and source (#3615)|https://github.com/apache/seatunnel/commit/8d9d8638d|2.3.0|
|[Improve][Connectors-V2][jdbc] Adapts to multiple versions of Flink #3589|https://github.com/apache/seatunnel/commit/e77fdbbef|2.3.0|
|[Hotfix][OptionRule] Fix option rule about all connectors (#3592)|https://github.com/apache/seatunnel/commit/226dc6a11|2.3.0|
|[Feature][Connector-V2][Doris]Add Doris Source &amp; Sink connector (#3586)|https://github.com/apache/seatunnel/commit/3d46b7961|2.3.0|
|[Feature][Connector-V2][Teradata] Add Teradata Source And Sink Connector|https://github.com/apache/seatunnel/commit/3a095d30f|2.3.0|
|[Feature][Connector-V2][JDBC] support sqlite Source &amp; Sink (#3089)|https://github.com/apache/seatunnel/commit/a73bb3e71|2.3.0|
|Bump postgresql in /seatunnel-connectors-v2/connector-jdbc (#3559)|https://github.com/apache/seatunnel/commit/c8dfdf3e4|2.3.0|
|[feature][connector][cdc] add SeaTunnelRowDebeziumDeserializeSchema (#3499)|https://github.com/apache/seatunnel/commit/ff44db116|2.3.0|
|[JDBC] [ORACLE] Improve Oracle Type to SeaTunnel Type Mapping (#3486)|https://github.com/apache/seatunnel/commit/8fe0dda6e|2.3.0|
|[JDBC] [Config] Add JDBC Fetch Size Config And Custom Postgres PrepareStatement (#3478)|https://github.com/apache/seatunnel/commit/d60a705f5|2.3.0|
|[feature][connector][jdbc] expose configurable options in JDBC (#3410)|https://github.com/apache/seatunnel/commit/72b8a73ca|2.3.0|
|[feature][connector][jdbc] Support write cdc changelog event in jdbc sink (#3444)|https://github.com/apache/seatunnel/commit/b12a908f0|2.3.0|
|[Improve][Connector-v2][Jdbc] Add AutoCommit to jdbcConfig (#3453)|https://github.com/apache/seatunnel/commit/cfb1e9785|2.3.0|
|[Improve][Connector-v2] Unset AutoCommit default to true (#3451)|https://github.com/apache/seatunnel/commit/439f686d9|2.3.0|
|[Feature][connector-v2] add tablestore source and sink  (#3309)|https://github.com/apache/seatunnel/commit/ebebf0b63|2.3.0|
|Close jdbc connection after use. (#3358)|https://github.com/apache/seatunnel/commit/219fea517|2.3.0|
|[Improve] [Engine] Improve Engine performance. (#3216)|https://github.com/apache/seatunnel/commit/7393c4732|2.3.0|
|[Bug][Connector-V2][JDBC]fix jdbc split bug (#3220)|https://github.com/apache/seatunnel/commit/40d67ab90|2.3.0|
|[Feature][Connector-V2][JDBC] Support DB2 Source &amp; Sink (#2410)|https://github.com/apache/seatunnel/commit/bf1ef69e8|2.3.0|
|update org.postgresql:postgresql 42.3.3 to 42.4.1 (#3097)|https://github.com/apache/seatunnel/commit/285251649|2.3.0|
|[Feature][Connector-V2][Jdbc] support gbase 8a  (#3026)|https://github.com/apache/seatunnel/commit/dc6e85d06|2.3.0-beta|
|[Bug] [sqlserver] timestamp convert exception (#3024)|https://github.com/apache/seatunnel/commit/99ac1a655|2.3.0-beta|
|[Feature][Connector-V2] oracle connector (#2550)|https://github.com/apache/seatunnel/commit/384ece191|2.3.0-beta|
|[Improve][Connector-v2][jdbc] Support for specify number of partitions when parallel reading (#2950)|https://github.com/apache/seatunnel/commit/fc284ac32|2.3.0-beta|
|[Feature][Connector-V2] add sqlserver connector (#2646)|https://github.com/apache/seatunnel/commit/05d105dea|2.3.0-beta|
|[Improve][e2e] Unified e2e IT for DaMengDB (#2946)|https://github.com/apache/seatunnel/commit/15636bdea|2.3.0-beta|
|[Improve][e2e] modify DM-driver by downLoad and add the value comparison of all columns (#2772)|https://github.com/apache/seatunnel/commit/f3ff39bdf|2.3.0-beta|
|[Improve][e2e] Improve jdbc driver management (#2770)|https://github.com/apache/seatunnel/commit/f907927a3|2.3.0-beta|
|[hotfix][connector][jdbc] fix JDBC split exception (#2904)|https://github.com/apache/seatunnel/commit/57342c654|2.3.0-beta|
|[Improve][connector-jdbc] Calculate splits only once in JdbcSourceSplitEnumerator (#2900)|https://github.com/apache/seatunnel/commit/7622f2899|2.3.0-beta|
|[Feature] [Connector-V2 E2E] Add mysql and postgres e2e test and bug fix (#2838)|https://github.com/apache/seatunnel/commit/db434adc1|2.2.0-beta|
|fix XAConnection being wrongly submitted (#2805)|https://github.com/apache/seatunnel/commit/d9a6039fd|2.2.0-beta|
|fix spark execute exception is not thrown (#2791)|https://github.com/apache/seatunnel/commit/b1711c984|2.2.0-beta|
|[Improve][e2e] Add driver-jar to lib (#2719)|https://github.com/apache/seatunnel/commit/d64d452c8|2.2.0-beta|
|[DEV][Api] Replace SeaTunnelContext with JobContext and remove singleton pattern (#2706)|https://github.com/apache/seatunnel/commit/cbf82f755|2.2.0-beta|
|[Connector-V2][JDBC-connector] support Jdbc dm (#2377)|https://github.com/apache/seatunnel/commit/7278209ca|2.2.0-beta|
|[#2606]Dependency management split (#2630)|https://github.com/apache/seatunnel/commit/fc047be69|2.2.0-beta|
|[Bug] [connector-jdbc-v2] Fix transaction force commit when autoCommit is enabled (#2636)|https://github.com/apache/seatunnel/commit/8cd8cf7aa|2.2.0-beta|
| [Feature][Connector-V2] Add phoenix connector sink  (#2499)|https://github.com/apache/seatunnel/commit/05ccf9d68|2.2.0-beta|
|[Connector-V2][JDBC] Support database: greenplum (#2429)|https://github.com/apache/seatunnel/commit/3561d3878|2.2.0-beta|
|Add jdbc connector e2e test (#2321)|https://github.com/apache/seatunnel/commit/5fbcb811c|2.2.0-beta|
|StateT of SeaTunnelSource should extend `Serializable` (#2214)|https://github.com/apache/seatunnel/commit/8c426ef85|2.2.0-beta|
|update the condition to 1 = 0 about get table operation (#2186)|https://github.com/apache/seatunnel/commit/7c56d7143|2.2.0-beta|
|[SeaTunnel API] [Sink] remove useless context field (#2124)|https://github.com/apache/seatunnel/commit/a31fdeedc|2.2.0-beta|
|[bugfix] Check isOpen before closing (#2107)|https://github.com/apache/seatunnel/commit/7ec0ada2b|2.2.0-beta|
|[API-DRAFT] [MERGE] fix merge error|https://github.com/apache/seatunnel/commit/3c0e98464|2.2.0-beta|
|merge dev to api-draft|https://github.com/apache/seatunnel/commit/d265597c6|2.2.0-beta|
|[api-draft][Optimize] Optimize module name (#2062)|https://github.com/apache/seatunnel/commit/f79e3112b|2.2.0-beta|

</details>
