"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[54533],{15680:(e,t,a)=>{a.d(t,{xA:()=>g,yg:()=>d});var n=a(96540);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},g=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),m=p(a),c=r,d=m["".concat(s,".").concat(c)]||m[c]||u[c]||l;return a?n.createElement(d,i(i({ref:t},g),{},{components:a})):n.createElement(d,i({ref:t},g))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[m]="string"==typeof e?e:r,i[1]=o;for(var p=2;p<l;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},5763:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var n=a(58168),r=(a(96540),a(15680));const l={},i="Kafka",o={unversionedId:"connector-v2/sink/Kafka",id:"connector-v2/sink/Kafka",title:"Kafka",description:"Kafka sink connector",source:"@site/docs/connector-v2/sink/Kafka.md",sourceDirName:"connector-v2/sink",slug:"/connector-v2/sink/Kafka",permalink:"/docs/connector-v2/sink/Kafka",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/connector-v2/sink/Kafka.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"JDBC",permalink:"/docs/connector-v2/sink/Jdbc"},next:{title:"Kingbase",permalink:"/docs/connector-v2/sink/Kingbase"}},s={},p=[{value:"Support Those Engines",id:"support-those-engines",level:2},{value:"Key Features",id:"key-features",level:2},{value:"Description",id:"description",level:2},{value:"Supported DataSource Info",id:"supported-datasource-info",level:2},{value:"Sink Options",id:"sink-options",level:2},{value:"Parameter Interpretation",id:"parameter-interpretation",level:2},{value:"Topic Formats",id:"topic-formats",level:3},{value:"Semantics",id:"semantics",level:3},{value:"Partition Key Fields",id:"partition-key-fields",level:3},{value:"Assign Partitions",id:"assign-partitions",level:3},{value:"Task Example",id:"task-example",level:2},{value:"Simple:",id:"simple",level:3},{value:"AWS MSK SASL/SCRAM",id:"aws-msk-saslscram",level:3},{value:"AWS MSK IAM",id:"aws-msk-iam",level:3},{value:"Kerberos Authentication Example",id:"kerberos-authentication-example",level:3},{value:"Protobuf Configuration",id:"protobuf-configuration",level:3}],g={toc:p},m="wrapper";function u(e){let{components:t,...a}=e;return(0,r.yg)(m,(0,n.A)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"kafka"},"Kafka"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"Kafka sink connector")),(0,r.yg)("h2",{id:"support-those-engines"},"Support Those Engines"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"Spark",(0,r.yg)("br",null),"\nFlink",(0,r.yg)("br",null),"\nSeatunnel Zeta",(0,r.yg)("br",null))),(0,r.yg)("h2",{id:"key-features"},"Key Features"),(0,r.yg)("ul",{className:"contains-task-list"},(0,r.yg)("li",{parentName:"ul",className:"task-list-item"},(0,r.yg)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",(0,r.yg)("a",{parentName:"li",href:"/docs/concept/connector-v2-features"},"exactly-once")),(0,r.yg)("li",{parentName:"ul",className:"task-list-item"},(0,r.yg)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,r.yg)("a",{parentName:"li",href:"/docs/concept/connector-v2-features"},"cdc"))),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"By default, we will use 2pc to guarantee the message is sent to kafka exactly once.")),(0,r.yg)("h2",{id:"description"},"Description"),(0,r.yg)("p",null,"Write Rows to a Kafka topic."),(0,r.yg)("h2",{id:"supported-datasource-info"},"Supported DataSource Info"),(0,r.yg)("p",null,"In order to use the Kafka connector, the following dependencies are required.\nThey can be downloaded via install-plugin.sh or from the Maven central repository."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Datasource"),(0,r.yg)("th",{parentName:"tr",align:null},"Supported Versions"),(0,r.yg)("th",{parentName:"tr",align:null},"Maven"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Kafka"),(0,r.yg)("td",{parentName:"tr",align:null},"Universal"),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("a",{parentName:"td",href:"https://mvnrepository.com/artifact/org.apache.seatunnel/connector-kafka"},"Download"))))),(0,r.yg)("h2",{id:"sink-options"},"Sink Options"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Type"),(0,r.yg)("th",{parentName:"tr",align:null},"Required"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"topic"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"When the table is used as sink, the topic name is the topic to write data to.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"bootstrap.servers"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"Yes"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"Comma separated list of Kafka brokers.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"kafka.config"),(0,r.yg)("td",{parentName:"tr",align:null},"Map"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"In addition to the above parameters that must be specified by the ",(0,r.yg)("inlineCode",{parentName:"td"},"Kafka producer")," client, the user can also specify multiple non-mandatory parameters for the ",(0,r.yg)("inlineCode",{parentName:"td"},"producer")," client, covering ",(0,r.yg)("a",{parentName:"td",href:"https://kafka.apache.org/documentation.html#producerconfigs"},"all the producer parameters specified in the official Kafka document"),".")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"semantics"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"NON"),(0,r.yg)("td",{parentName:"tr",align:null},"Semantics that can be chosen EXACTLY_ONCE/AT_LEAST_ONCE/NON, default NON.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"partition_key_fields"),(0,r.yg)("td",{parentName:"tr",align:null},"Array"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"Configure which fields are used as the key of the kafka message.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"partition"),(0,r.yg)("td",{parentName:"tr",align:null},"Int"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"We can specify the partition, all messages will be sent to this partition.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"assign_partitions"),(0,r.yg)("td",{parentName:"tr",align:null},"Array"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"We can decide which partition to send based on the content of the message. The function of this parameter is to distribute information.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"transaction_prefix"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"If semantic is specified as EXACTLY_ONCE, the producer will write all messages in a Kafka transaction,kafka distinguishes different transactions by different transactionId. This parameter is prefix of  kafka  transactionId, make sure different job use different prefix.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"format"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"json"),(0,r.yg)("td",{parentName:"tr",align:null},'Data format. The default format is json. Optional text format, canal_json, debezium_json, ogg_json and avro.If you use json or text format. The default field separator is ", ". If you customize the delimiter, add the "field_delimiter" option.If you use canal format, please refer to ',(0,r.yg)("a",{parentName:"td",href:"/docs/connector-v2/formats/canal-json"},"canal-json")," for details.If you use debezium format, please refer to ",(0,r.yg)("a",{parentName:"td",href:"/docs/connector-v2/formats/debezium-json"},"debezium-json")," for details.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"field_delimiter"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},","),(0,r.yg)("td",{parentName:"tr",align:null},"Customize the field delimiter for data format.")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"common-options"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"Source plugin common parameters, please refer to ",(0,r.yg)("a",{parentName:"td",href:"/docs/connector-v2/sink-common-options"},"Source Common Options")," for details")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"protobuf_message_name"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"Effective when the format is set to protobuf, specifies the Message name")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"protobuf_schema"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"Effective when the format is set to protobuf, specifies the Schema definition")))),(0,r.yg)("h2",{id:"parameter-interpretation"},"Parameter Interpretation"),(0,r.yg)("h3",{id:"topic-formats"},"Topic Formats"),(0,r.yg)("p",null,"Currently two formats are supported:"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Fill in the name of the topic.")),(0,r.yg)("li",{parentName:"ol"},(0,r.yg)("p",{parentName:"li"},"Use value of a field from upstream data as topic,the format is ",(0,r.yg)("inlineCode",{parentName:"p"},"${your field name}"),", where topic is the value of one of the columns of the upstream data."),(0,r.yg)("p",{parentName:"li"},"For example, Upstream data is the following:"))),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"name"),(0,r.yg)("th",{parentName:"tr",align:null},"age"),(0,r.yg)("th",{parentName:"tr",align:null},"data"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Jack"),(0,r.yg)("td",{parentName:"tr",align:null},"16"),(0,r.yg)("td",{parentName:"tr",align:null},"data-example1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Mary"),(0,r.yg)("td",{parentName:"tr",align:null},"23"),(0,r.yg)("td",{parentName:"tr",align:null},"data-example2")))),(0,r.yg)("p",null,"If ",(0,r.yg)("inlineCode",{parentName:"p"},"${name}")," is set as the topic. So the first row is sent to Jack topic, and the second row is sent to Mary topic."),(0,r.yg)("h3",{id:"semantics"},"Semantics"),(0,r.yg)("p",null,"In EXACTLY_ONCE, producer will write all messages in a Kafka transaction that will be committed to Kafka on a checkpoint.\nIn AT_LEAST_ONCE, producer will wait for all outstanding messages in the Kafka buffers to be acknowledged by the Kafka producer on a checkpoint.\nNON does not provide any guarantees: messages may be lost in case of issues on the Kafka broker and messages may be duplicated."),(0,r.yg)("h3",{id:"partition-key-fields"},"Partition Key Fields"),(0,r.yg)("p",null,"For example, if you want to use value of fields from upstream data as key, you can assign field names to this property."),(0,r.yg)("p",null,"Upstream data is the following:"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"name"),(0,r.yg)("th",{parentName:"tr",align:null},"age"),(0,r.yg)("th",{parentName:"tr",align:null},"data"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Jack"),(0,r.yg)("td",{parentName:"tr",align:null},"16"),(0,r.yg)("td",{parentName:"tr",align:null},"data-example1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Mary"),(0,r.yg)("td",{parentName:"tr",align:null},"23"),(0,r.yg)("td",{parentName:"tr",align:null},"data-example2")))),(0,r.yg)("p",null,'If name is set as the key, then the hash value of the name column will determine which partition the message is sent to.\nIf not set partition key fields, the null message key will be sent to.\nThe format of the message key is json, If name is set as the key, for example \'{"name":"Jack"}\'.\nThe selected field must be an existing field in the upstream.'),(0,r.yg)("h3",{id:"assign-partitions"},"Assign Partitions"),(0,r.yg)("p",null,"For example, there are five partitions in total, and the assign_partitions field in config is as follows:\nassign_partitions = ",'["shoe", "clothing"]','\nThen the message containing "shoe" will be sent to partition zero ,because "shoe" is subscribed as zero in assign_partitions, and the message containing "clothing" will be sent to partition one.For other messages, the hash algorithm will be used to divide them into the remaining partitions.\nThis function by ',(0,r.yg)("inlineCode",{parentName:"p"},"MessageContentPartitioner")," class implements ",(0,r.yg)("inlineCode",{parentName:"p"},"org.apache.kafka.clients.producer.Partitioner")," interface.If we need custom partitions, we need to implement this interface as well."),(0,r.yg)("h2",{id:"task-example"},"Task Example"),(0,r.yg)("h3",{id:"simple"},"Simple:"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"This example defines a SeaTunnel synchronization task that automatically generates data through FakeSource and sends it to Kafka Sink. FakeSource generates a total of 16 rows of data (row.num=16), with each row having two fields, name (string type) and age (int type). The final target topic is test_topic will also be 16 rows of data in the topic. And if you have not yet installed and deployed SeaTunnel, you need to follow the instructions in ",(0,r.yg)("a",{parentName:"p",href:"/docs/start-v2/locally/deployment"},"Install SeaTunnel")," to install and deploy SeaTunnel. And then follow the instructions in ",(0,r.yg)("a",{parentName:"p",href:"/docs/start-v2/locally/quick-start-seatunnel-engine"},"Quick Start With SeaTunnel Engine")," to run this job.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'# Defining the runtime environment\nenv {\n  parallelism = 1\n  job.mode = "BATCH"\n}\n\nsource {\n  FakeSource {\n    parallelism = 1\n    plugin_output = "fake"\n    row.num = 16\n    schema = {\n      fields {\n        name = "string"\n        age = "int"\n      }\n    }\n  }\n}\n\nsink {\n  kafka {\n      topic = "test_topic"\n      bootstrap.servers = "localhost:9092"\n      format = json\n      kafka.request.timeout.ms = 60000\n      semantics = EXACTLY_ONCE\n      kafka.config = {\n        acks = "all"\n        request.timeout.ms = 60000\n        buffer.memory = 33554432\n      }\n  }\n}\n')),(0,r.yg)("h3",{id:"aws-msk-saslscram"},"AWS MSK SASL/SCRAM"),(0,r.yg)("p",null,"Replace the following ",(0,r.yg)("inlineCode",{parentName:"p"},"${username}")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"${password}")," with the configuration values in AWS MSK."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'sink {\n  kafka {\n      topic = "seatunnel"\n      bootstrap.servers = "localhost:9092"\n      format = json\n      kafka.request.timeout.ms = 60000\n      semantics = EXACTLY_ONCE\n      kafka.config = {\n         security.protocol=SASL_SSL\n         sasl.mechanism=SCRAM-SHA-512\n         sasl.jaas.config="org.apache.kafka.common.security.scram.ScramLoginModule required \\nusername=${username}\\npassword=${password};"\n      }\n  }\n}\n')),(0,r.yg)("h3",{id:"aws-msk-iam"},"AWS MSK IAM"),(0,r.yg)("p",null,"Download ",(0,r.yg)("inlineCode",{parentName:"p"},"aws-msk-iam-auth-1.1.5.jar")," from ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/aws/aws-msk-iam-auth/releases"},"https://github.com/aws/aws-msk-iam-auth/releases")," and put it in ",(0,r.yg)("inlineCode",{parentName:"p"},"$SEATUNNEL_HOME/plugin/kafka/lib")," dir."),(0,r.yg)("p",null,"Please ensure the IAM policy have ",(0,r.yg)("inlineCode",{parentName:"p"},'"kafka-cluster:Connect",'),". Like this:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'"Effect": "Allow",\n"Action": [\n    "kafka-cluster:Connect",\n    "kafka-cluster:AlterCluster",\n    "kafka-cluster:DescribeCluster"\n],\n')),(0,r.yg)("p",null,"Sink Config"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'sink {\n  kafka {\n      topic = "seatunnel"\n      bootstrap.servers = "localhost:9092"\n      format = json\n      kafka.request.timeout.ms = 60000\n      semantics = EXACTLY_ONCE\n      kafka.config = {\n         security.protocol=SASL_SSL\n         sasl.mechanism=AWS_MSK_IAM\n         sasl.jaas.config="software.amazon.msk.auth.iam.IAMLoginModule required;"\n         sasl.client.callback.handler.class="software.amazon.msk.auth.iam.IAMClientCallbackHandler"\n      }\n  }\n}\n')),(0,r.yg)("h3",{id:"kerberos-authentication-example"},"Kerberos Authentication Example"),(0,r.yg)("p",null,"Sink Config"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},'sink {\n    Kafka {\n        topic = "seatunnel"\n        bootstrap.servers = "127.0.0.1:9092"\n        format = json\n        semantics = EXACTLY_ONCE\n        kafka.config = {\n            security.protocol=SASL_PLAINTEXT\n            sasl.kerberos.service.name=kafka\n            sasl.mechanism=GSSAPI\n            java.security.krb5.conf="/etc/krb5.conf"\n            sasl.jaas.config="com.sun.security.auth.module.Krb5LoginModule required \\n        useKeyTab=true \\n        storeKey=true  \\n        keyTab=\\"/path/to/xxx.keytab\\" \\n        principal=\\"user@xxx.com\\";"\n        }\n    }\n}\n')),(0,r.yg)("h3",{id:"protobuf-configuration"},"Protobuf Configuration"),(0,r.yg)("p",null,"Set the ",(0,r.yg)("inlineCode",{parentName:"p"},"format")," to ",(0,r.yg)("inlineCode",{parentName:"p"},"protobuf")," and configure the ",(0,r.yg)("inlineCode",{parentName:"p"},"protobuf")," data structure using the ",(0,r.yg)("inlineCode",{parentName:"p"},"protobuf_message_name")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"protobuf_schema")," parameters."),(0,r.yg)("p",null,"Example Usage:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'sink {\n  kafka {\n      topic = "test_protobuf_topic_fake_source"\n      bootstrap.servers = "kafkaCluster:9092"\n      format = protobuf\n      kafka.request.timeout.ms = 60000\n      kafka.config = {\n        acks = "all"\n        request.timeout.ms = 60000\n        buffer.memory = 33554432\n      }\n      protobuf_message_name = Person\n      protobuf_schema = """\n              syntax = "proto3";\n\n              package org.apache.seatunnel.format.protobuf;\n\n              option java_outer_classname = "ProtobufE2E";\n\n              message Person {\n                int32 c_int32 = 1;\n                int64 c_int64 = 2;\n                float c_float = 3;\n                double c_double = 4;\n                bool c_bool = 5;\n                string c_string = 6;\n                bytes c_bytes = 7;\n\n                message Address {\n                  string street = 1;\n                  string city = 2;\n                  string state = 3;\n                  string zip = 4;\n                }\n\n                Address address = 8;\n\n                map<string, float> attributes = 9;\n\n                repeated string phone_numbers = 10;\n              }\n              """\n  }\n}\n')))}u.isMDXComponent=!0}}]);