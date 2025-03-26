<details><summary> Change Log </summary>

| Change | Commit | Version |
| --- | --- | --- |
|Revert &quot; [improve] update localfile connector config&quot; (#9018)|https://github.com/apache/seatunnel/commit/cdc79e13a|2.3.10|
| [improve] update localfile connector config (#8765)|https://github.com/apache/seatunnel/commit/def369a85|2.3.10|
|[Improve][Connector-V2] Ensure that the FTP connector behaves reliably during directory operation (#8959)|https://github.com/apache/seatunnel/commit/b5f0b43fc|2.3.10|
|[Feature][Connector-V2] Add `filename_extension` parameter for read/write file (#8769)|https://github.com/apache/seatunnel/commit/78b23c0ef|2.3.10|
|[Improve] restruct connector common options (#8634)|https://github.com/apache/seatunnel/commit/f3499a6ee|2.3.10|
|[Feature][Connector-V2] Support create emtpy file when no data (#8543)|https://github.com/apache/seatunnel/commit/275db7891|2.3.10|
|[Feature][Connector-V2] Support single file mode in file sink (#8518)|https://github.com/apache/seatunnel/commit/e893deed5|2.3.10|
|[Improve][Connector-V2] Add some debug log when create dir in (S)FTP (#8286)|https://github.com/apache/seatunnel/commit/8687bb8e9|2.3.9|
|[Feature][File] Support config null format for text file read (#8109)|https://github.com/apache/seatunnel/commit/2dbf02df4|2.3.9|
|[Fix][Connector-V2][FTP] Fix FTP connector connection_mode is not effective (#7865)|https://github.com/apache/seatunnel/commit/26c528a5e|2.3.9|
|[Feature][Restapi] Allow metrics information to be associated to logical plan nodes (#7786)|https://github.com/apache/seatunnel/commit/6b7c53d03|2.3.9|
|[Feature][Connector-V2]Ftp file source support multiple table (#7795)|https://github.com/apache/seatunnel/commit/22fe27a3d|2.3.9|
|[Improve][Connector-V2] Support read archive compress file (#7633)|https://github.com/apache/seatunnel/commit/3f98cd8a1|2.3.8|
|[Feature][Connector-V2] Ftp file sink suport multiple table and save mode (#7665)|https://github.com/apache/seatunnel/commit/4f812e12a|2.3.8|
|[Improve][Files] Support write fixed/timestamp as int96 of parquet (#6971)|https://github.com/apache/seatunnel/commit/1a48a9c49|2.3.6|
|[Feature][Connector-V2] Supports the transfer of any file (#6826)|https://github.com/apache/seatunnel/commit/c1401787b|2.3.6|
|Add support for XML file type to various file connectors such as SFTP, FTP, LocalFile, HdfsFile, and more. (#6327)|https://github.com/apache/seatunnel/commit/ec533ecd9|2.3.5|
|[Feature][Connectors-v2-file-ftp] FTP source/sink add ftp connection mode (#6077)  (#6099)|https://github.com/apache/seatunnel/commit/f6bcc4d59|2.3.4|
|[Refactor][File Connector] Put Multiple Table File API to File Base Module (#6033)|https://github.com/apache/seatunnel/commit/c324d663b|2.3.4|
|Support using multiple hadoop account (#5903)|https://github.com/apache/seatunnel/commit/d69d88d1a|2.3.4|
|[Improve][Common] Introduce new error define rule (#5793)|https://github.com/apache/seatunnel/commit/9d1b2582b|2.3.4|
|[Improve][connector-file] unifiy option between file source/sink and update document (#5680)|https://github.com/apache/seatunnel/commit/8d87cf8fc|2.3.4|
|[Feature] Support `LZO` compress on File Read (#5083)|https://github.com/apache/seatunnel/commit/a4a190109|2.3.4|
|[Feature][Connector-V2][File] Support read empty directory (#5591)|https://github.com/apache/seatunnel/commit/1f58f224a|2.3.4|
|Support config column/primaryKey/constraintKey in schema (#5564)|https://github.com/apache/seatunnel/commit/eac76b4e5|2.3.4|
|[Feature] [File Connector]optionrule FILE_FORMAT_TYPE is text/csv ,add parameter BaseSinkConfig.ENABLE_HEADER_WRITE: #5566 (#5567)|https://github.com/apache/seatunnel/commit/0e02db768|2.3.4|
|[Feature][Connector V2][File] Add config of &#x27;file_filter_pattern&#x27;, which used for filtering files. (#5153)|https://github.com/apache/seatunnel/commit/a3c13e59e|2.3.3|
| [Feature][ConnectorV2]add file excel sink and source (#4164)|https://github.com/apache/seatunnel/commit/e3b97ae5d|2.3.2|
|Change file type to file_format_type in file source/sink (#4249)|https://github.com/apache/seatunnel/commit/973a2fae3|2.3.1|
|Merge branch &#x27;dev&#x27; into merge/cdc|https://github.com/apache/seatunnel/commit/4324ee191|2.3.1|
|[Improve][Project] Code format with spotless plugin.|https://github.com/apache/seatunnel/commit/423b58303|2.3.1|
|[improve][api] Refactoring schema parse (#4157)|https://github.com/apache/seatunnel/commit/b2f573a13|2.3.1|
|[Improve][build] Give the maven module a human readable name (#4114)|https://github.com/apache/seatunnel/commit/d7cd60105|2.3.1|
|[Improve][Project] Code format with spotless plugin. (#4101)|https://github.com/apache/seatunnel/commit/a2ab16656|2.3.1|
|[Feature][Connector-V2][File] Support compress (#3899)|https://github.com/apache/seatunnel/commit/55602f6b1|2.3.1|
|[Feature][Connector] add get source method to all source connector (#3846)|https://github.com/apache/seatunnel/commit/417178fb8|2.3.1|
|[Improve][Connector-V2][File] Improve file connector option rule and document (#3812)|https://github.com/apache/seatunnel/commit/bd7607766|2.3.1|
|[Feature][Shade] Add seatunnel hadoop3 uber (#3755)|https://github.com/apache/seatunnel/commit/5a024bdf8|2.3.0|
|[Hotfix][OptionRule] Fix option rule about all connectors (#3592)|https://github.com/apache/seatunnel/commit/226dc6a11|2.3.0|
|[Improve][Connector-V2][File] Unified excetion for file source &amp; sink connectors (#3525)|https://github.com/apache/seatunnel/commit/031e8e263|2.3.0|
|[Feature][Connector-V2][File] Add option and factory for file connectors (#3375)|https://github.com/apache/seatunnel/commit/db286e863|2.3.0|
|[Improve][Connector-V2][File] Improve code structure (#3238)|https://github.com/apache/seatunnel/commit/dd5c35388|2.3.0|
|[Connector-V2] [ElasticSearch] Add ElasticSearch Source/Sink Factory (#3325)|https://github.com/apache/seatunnel/commit/38254e3f2|2.3.0|
|[Core] [Improve] Fix some sonar check error (#3240)|https://github.com/apache/seatunnel/commit/8664bb53a|2.3.0|
|[Improve][Connector-V2][File] Support parse field from file path (#2985)|https://github.com/apache/seatunnel/commit/0bc12085c|2.3.0-beta|
|[Improve][connector][file] Support user-defined schema for reading text file (#2976)|https://github.com/apache/seatunnel/commit/1c05ee0d7|2.3.0-beta|
|[Improve][Connector] Improve write parquet (#2943)|https://github.com/apache/seatunnel/commit/8fd966394|2.3.0-beta|
|[Fix][Connector-V2] Fix HiveSource Connector read orc table error (#2845)|https://github.com/apache/seatunnel/commit/61720306e|2.2.0-beta|
|[Improve][Connector-V2] Improve read parquet (#2841)|https://github.com/apache/seatunnel/commit/e19bc82f9|2.2.0-beta|
|[Imporve][Connector-V2] Refactor ftp sink &amp; Add ftp file source (#2774)|https://github.com/apache/seatunnel/commit/4aacbcdd1|2.2.0-beta|
|[Feature][File connector] Support ftp file sink (#2483)|https://github.com/apache/seatunnel/commit/a87e5de80|2.2.0-beta|

</details>
