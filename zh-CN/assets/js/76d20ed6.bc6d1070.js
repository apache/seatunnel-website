"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[33],{15680:(e,t,n)=>{n.d(t,{xA:()=>g,yg:()=>d});var r=n(96540);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},g=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),u=s(n),c=a,d=u["".concat(p,".").concat(c)]||u[c]||m[c]||l;return n?r.createElement(d,i(i({ref:t},g),{},{components:n})):r.createElement(d,i({ref:t},g))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[u]="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},35190:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var r=n(58168),a=(n(96540),n(15680));const l={},i="Apache Pulsar",o={unversionedId:"connector-v2/source/Pulsar",id:"connector-v2/source/Pulsar",title:"Apache Pulsar",description:"Apache Pulsar source connector",source:"@site/docs/connector-v2/source/Pulsar.md",sourceDirName:"connector-v2/source",slug:"/connector-v2/source/Pulsar",permalink:"/zh-CN/docs/connector-v2/source/Pulsar",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/connector-v2/source/Pulsar.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Prometheus",permalink:"/zh-CN/docs/connector-v2/source/Prometheus"},next:{title:"Qdrant",permalink:"/zh-CN/docs/connector-v2/source/Qdrant"}},p={},s=[{value:"Description",id:"description",level:2},{value:"Key features",id:"key-features",level:2},{value:"Options",id:"options",level:2},{value:"topic String",id:"topic-string",level:3},{value:"topic-pattern String",id:"topic-pattern-string",level:3},{value:"topic-discovery.interval Long",id:"topic-discoveryinterval-long",level:3},{value:"subscription.name String",id:"subscriptionname-string",level:3},{value:"client.service-url String",id:"clientservice-url-string",level:3},{value:"admin.service-url String",id:"adminservice-url-string",level:3},{value:"auth.plugin-class String",id:"authplugin-class-string",level:3},{value:"auth.params String",id:"authparams-string",level:3},{value:"poll.timeout Integer",id:"polltimeout-integer",level:3},{value:"poll.interval Long",id:"pollinterval-long",level:3},{value:"poll.batch.size Integer",id:"pollbatchsize-integer",level:3},{value:"cursor.startup.mode Enum",id:"cursorstartupmode-enum",level:3},{value:"cursor.startup.timestamp Long",id:"cursorstartuptimestamp-long",level:3},{value:"cursor.reset.mode Enum",id:"cursorresetmode-enum",level:3},{value:"cursor.stop.mode String",id:"cursorstopmode-string",level:3},{value:"cursor.stop.timestamp Long",id:"cursorstoptimestamp-long",level:3},{value:"schema Config",id:"schema-config",level:3},{value:"format String",id:"format-string",level:2},{value:"common options",id:"common-options",level:3},{value:"Example",id:"example",level:2},{value:"Changelog",id:"changelog",level:2},{value:"2.3.0-beta 2022-10-20",id:"230-beta-2022-10-20",level:3},{value:"next version",id:"next-version",level:3}],g={toc:s},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.yg)(u,(0,r.A)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"apache-pulsar"},"Apache Pulsar"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Apache Pulsar source connector")),(0,a.yg)("h2",{id:"description"},"Description"),(0,a.yg)("p",null,"Source connector for Apache Pulsar."),(0,a.yg)("h2",{id:"key-features"},"Key features"),(0,a.yg)("ul",{className:"contains-task-list"},(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"../../concept/connector-v2-features.md"},"batch")),(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"../../concept/connector-v2-features.md"},"stream")),(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"../../concept/connector-v2-features.md"},"exactly-once")),(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"../../concept/connector-v2-features.md"},"column projection")),(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!0,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"../../concept/connector-v2-features.md"},"parallelism")),(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"../../concept/connector-v2-features.md"},"support user-defined split"))),(0,a.yg)("h2",{id:"options"},"Options"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"name"),(0,a.yg)("th",{parentName:"tr",align:null},"type"),(0,a.yg)("th",{parentName:"tr",align:null},"required"),(0,a.yg)("th",{parentName:"tr",align:null},"default value"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"topic"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"topic-pattern"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"topic-discovery.interval"),(0,a.yg)("td",{parentName:"tr",align:null},"Long"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-1")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"subscription.name"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"Yes"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"client.service-url"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"Yes"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"admin.service-url"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"Yes"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"auth.plugin-class"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"auth.params"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"poll.timeout"),(0,a.yg)("td",{parentName:"tr",align:null},"Integer"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"100")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"poll.interval"),(0,a.yg)("td",{parentName:"tr",align:null},"Long"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"50")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"poll.batch.size"),(0,a.yg)("td",{parentName:"tr",align:null},"Integer"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"500")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"cursor.startup.mode"),(0,a.yg)("td",{parentName:"tr",align:null},"Enum"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"LATEST")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"cursor.startup.timestamp"),(0,a.yg)("td",{parentName:"tr",align:null},"Long"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"cursor.reset.mode"),(0,a.yg)("td",{parentName:"tr",align:null},"Enum"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"LATEST")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"cursor.stop.mode"),(0,a.yg)("td",{parentName:"tr",align:null},"Enum"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"NEVER")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"cursor.stop.timestamp"),(0,a.yg)("td",{parentName:"tr",align:null},"Long"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"schema"),(0,a.yg)("td",{parentName:"tr",align:null},"config"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"common-options"),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"format"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"json")))),(0,a.yg)("h3",{id:"topic-string"},"topic ","[String]"),(0,a.yg)("p",null,"Topic name(s) to read data from when the table is used as source. It also supports topic list for source by separating topic by semicolon like 'topic-1;topic-2'."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},'Note, only one of "topic-pattern" and "topic" can be specified for sources.')),(0,a.yg)("h3",{id:"topic-pattern-string"},"topic-pattern ","[String]"),(0,a.yg)("p",null,"The regular expression for a pattern of topic names to read from. All topics with names that match the specified regular expression will be subscribed by the consumer when the job starts running."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},'Note, only one of "topic-pattern" and "topic" can be specified for sources.')),(0,a.yg)("h3",{id:"topic-discoveryinterval-long"},"topic-discovery.interval ","[Long]"),(0,a.yg)("p",null,"The interval (in ms) for the Pulsar source to discover the new topic partitions. A non-positive value disables the topic partition discovery."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Note, This option only works if the 'topic-pattern' option is used.")),(0,a.yg)("h3",{id:"subscriptionname-string"},"subscription.name ","[String]"),(0,a.yg)("p",null,"Specify the subscription name for this consumer. This argument is required when constructing the consumer."),(0,a.yg)("h3",{id:"clientservice-url-string"},"client.service-url ","[String]"),(0,a.yg)("p",null,"Service URL provider for Pulsar service.\nTo connect to Pulsar using client libraries, you need to specify a Pulsar protocol URL.\nYou can assign Pulsar protocol URLs to specific clusters and use the Pulsar scheme."),(0,a.yg)("p",null,"For example, ",(0,a.yg)("inlineCode",{parentName:"p"},"localhost"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"pulsar://localhost:6650,localhost:6651"),"."),(0,a.yg)("h3",{id:"adminservice-url-string"},"admin.service-url ","[String]"),(0,a.yg)("p",null,"The Pulsar service HTTP URL for the admin endpoint."),(0,a.yg)("p",null,"For example, ",(0,a.yg)("inlineCode",{parentName:"p"},"http://my-broker.example.com:8080"),", or ",(0,a.yg)("inlineCode",{parentName:"p"},"https://my-broker.example.com:8443")," for TLS."),(0,a.yg)("h3",{id:"authplugin-class-string"},"auth.plugin-class ","[String]"),(0,a.yg)("p",null,"Name of the authentication plugin."),(0,a.yg)("h3",{id:"authparams-string"},"auth.params ","[String]"),(0,a.yg)("p",null,"Parameters for the authentication plugin."),(0,a.yg)("p",null,"For example, ",(0,a.yg)("inlineCode",{parentName:"p"},"key1:val1,key2:val2")),(0,a.yg)("h3",{id:"polltimeout-integer"},"poll.timeout ","[Integer]"),(0,a.yg)("p",null,"The maximum time (in ms) to wait when fetching records. A longer time increases throughput but also latency."),(0,a.yg)("h3",{id:"pollinterval-long"},"poll.interval ","[Long]"),(0,a.yg)("p",null,"The interval time(in ms) when fetcing records. A shorter time increases throughput, but also increases CPU load."),(0,a.yg)("h3",{id:"pollbatchsize-integer"},"poll.batch.size ","[Integer]"),(0,a.yg)("p",null,"The maximum number of records to fetch to wait when polling. A longer time increases throughput but also latency."),(0,a.yg)("h3",{id:"cursorstartupmode-enum"},"cursor.startup.mode ","[Enum]"),(0,a.yg)("p",null,"Startup mode for Pulsar consumer, valid values are ",(0,a.yg)("inlineCode",{parentName:"p"},"'EARLIEST'"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"'LATEST'"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"'SUBSCRIPTION'"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"'TIMESTAMP'"),"."),(0,a.yg)("h3",{id:"cursorstartuptimestamp-long"},"cursor.startup.timestamp ","[Long]"),(0,a.yg)("p",null,"Start from the specified epoch timestamp (in milliseconds)."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},'Note, This option is required when the "cursor.startup.mode" option used ',(0,a.yg)("inlineCode",{parentName:"strong"},"'TIMESTAMP'"),".")),(0,a.yg)("h3",{id:"cursorresetmode-enum"},"cursor.reset.mode ","[Enum]"),(0,a.yg)("p",null,"Cursor reset strategy for Pulsar consumer valid values are ",(0,a.yg)("inlineCode",{parentName:"p"},"'EARLIEST'"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"'LATEST'"),"."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},'Note, This option only works if the "cursor.startup.mode" option used ',(0,a.yg)("inlineCode",{parentName:"strong"},"'SUBSCRIPTION'"),".")),(0,a.yg)("h3",{id:"cursorstopmode-string"},"cursor.stop.mode ","[String]"),(0,a.yg)("p",null,"Stop mode for Pulsar consumer, valid values are ",(0,a.yg)("inlineCode",{parentName:"p"},"'NEVER'"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"'LATEST'"),"and ",(0,a.yg)("inlineCode",{parentName:"p"},"'TIMESTAMP'"),"."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},"Note, When ",(0,a.yg)("inlineCode",{parentName:"strong"},"'NEVER' "),"is specified, it is a real-time job, and other mode are off-line jobs.")),(0,a.yg)("h3",{id:"cursorstoptimestamp-long"},"cursor.stop.timestamp ","[Long]"),(0,a.yg)("p",null,"Stop from the specified epoch timestamp (in milliseconds)."),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},'Note, This option is required when the "cursor.stop.mode" option used ',(0,a.yg)("inlineCode",{parentName:"strong"},"'TIMESTAMP'"),".")),(0,a.yg)("h3",{id:"schema-config"},"schema ","[Config]"),(0,a.yg)("p",null,"The structure of the data, including field names and field types.\nreference to ",(0,a.yg)("a",{parentName:"p",href:"../../concept/schema-feature.md"},"Schema-Feature")),(0,a.yg)("h2",{id:"format-string"},"format ","[String]"),(0,a.yg)("p",null,"Data format. The default format is json, reference ",(0,a.yg)("a",{parentName:"p",href:"../formats"},"formats"),"."),(0,a.yg)("h3",{id:"common-options"},"common options"),(0,a.yg)("p",null,"Source plugin common parameters, please refer to ",(0,a.yg)("a",{parentName:"p",href:"../source-common-options.md"},"Source Common Options")," for details."),(0,a.yg)("h2",{id:"example"},"Example"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-Jdbc",metastring:"{","{":!0},'source {\n  Pulsar {\n    topic = "example"\n    subscription.name = "seatunnel"\n    client.service-url = "pulsar://localhost:6650"\n    admin.service-url = "http://my-broker.example.com:8080"\n    plugin_output = "test"\n  }\n}\n')),(0,a.yg)("h2",{id:"changelog"},"Changelog"),(0,a.yg)("h3",{id:"230-beta-2022-10-20"},"2.3.0-beta 2022-10-20"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"Add Pulsar Source Connector")),(0,a.yg)("h3",{id:"next-version"},"next version"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"[Feature]"," Add Pulsar canal-format and e2e (",(0,a.yg)("a",{parentName:"li",href:"https://github.com/apache/seatunnel/pull/4111"},"4111"),")")))}m.isMDXComponent=!0}}]);