"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[9461],{15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>m});var o=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},l=Object.keys(e);for(o=0;o<l.length;o++)t=l[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(o=0;o<l.length;o++)t=l[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=o.createContext({}),u=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},c=function(e){var n=u(e.components);return o.createElement(s.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},g=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=u(t),g=a,m=p["".concat(s,".").concat(g)]||p[g]||d[g]||l;return t?o.createElement(m,r(r({ref:n},c),{},{components:t})):o.createElement(m,r({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,r=new Array(l);r[0]=g;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[p]="string"==typeof e?e:a,r[1]=i;for(var u=2;u<l;u++)r[u]=t[u];return o.createElement.apply(null,r)}return o.createElement.apply(null,t)}g.displayName="MDXCreateElement"},94932:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>u});var o=t(58168),a=(t(96540),t(15680));const l={},r="Console",i={unversionedId:"connector-v2/sink/Console",id:"connector-v2/sink/Console",title:"Console",description:"Console sink connector",source:"@site/docs/connector-v2/sink/Console.md",sourceDirName:"connector-v2/sink",slug:"/connector-v2/sink/Console",permalink:"/docs/connector-v2/sink/Console",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/connector-v2/sink/Console.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"ClickhouseFile",permalink:"/docs/connector-v2/sink/ClickhouseFile"},next:{title:"CosFile",permalink:"/docs/connector-v2/sink/CosFile"}},s={},u=[{value:"Support Connector Version",id:"support-connector-version",level:2},{value:"Support Those Engines",id:"support-those-engines",level:2},{value:"Description",id:"description",level:2},{value:"Key Features",id:"key-features",level:2},{value:"Options",id:"options",level:2},{value:"Task Example",id:"task-example",level:2},{value:"Simple:",id:"simple",level:3},{value:"Multiple Sources Simple:",id:"multiple-sources-simple",level:3},{value:"Console Sample Data",id:"console-sample-data",level:2}],c={toc:u},p="wrapper";function d(e){let{components:n,...t}=e;return(0,a.yg)(p,(0,o.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"console"},"Console"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Console sink connector")),(0,a.yg)("h2",{id:"support-connector-version"},"Support Connector Version"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"All versions")),(0,a.yg)("h2",{id:"support-those-engines"},"Support Those Engines"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Spark",(0,a.yg)("br",null),"\nFlink",(0,a.yg)("br",null),"\nSeaTunnel Zeta",(0,a.yg)("br",null))),(0,a.yg)("h2",{id:"description"},"Description"),(0,a.yg)("p",null,"Used to send data to Console. Both support streaming and batch mode."),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"For example, if the data from upstream is ","[",(0,a.yg)("inlineCode",{parentName:"p"},"age: 12, name: jared"),"]",", the content send to console is the following: ",(0,a.yg)("inlineCode",{parentName:"p"},'{"name":"jared","age":17}'))),(0,a.yg)("h2",{id:"key-features"},"Key Features"),(0,a.yg)("ul",{className:"contains-task-list"},(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"/docs/concept/connector-v2-features"},"exactly-once"))),(0,a.yg)("h2",{id:"options"},"Options"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Name"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Required"),(0,a.yg)("th",{parentName:"tr",align:null},"Default"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"common-options"),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-"),(0,a.yg)("td",{parentName:"tr",align:null},"Sink plugin common parameters, please refer to ",(0,a.yg)("a",{parentName:"td",href:"/docs/connector-v2/sink-common-options"},"Sink Common Options")," for details")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"log.print.data"),(0,a.yg)("td",{parentName:"tr",align:null},"boolean"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-"),(0,a.yg)("td",{parentName:"tr",align:null},"Flag to determine whether data should be printed in the logs. The default value is ",(0,a.yg)("inlineCode",{parentName:"td"},"true"))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"log.print.delay.ms"),(0,a.yg)("td",{parentName:"tr",align:null},"int"),(0,a.yg)("td",{parentName:"tr",align:null},"No"),(0,a.yg)("td",{parentName:"tr",align:null},"-"),(0,a.yg)("td",{parentName:"tr",align:null},"Delay in milliseconds between printing each data item to the logs. The default value is ",(0,a.yg)("inlineCode",{parentName:"td"},"0"),".")))),(0,a.yg)("h2",{id:"task-example"},"Task Example"),(0,a.yg)("h3",{id:"simple"},"Simple:"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"This is a randomly generated data, written to the console, with a degree of parallelism of 1")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},'env {\n  parallelism = 1\n  job.mode = "STREAMING"\n}\n\nsource {\n  FakeSource {\n    plugin_output = "fake"\n    schema = {\n      fields {\n        name = "string"\n        age = "int"\n      }\n    }\n  }\n}\n\nsink {\n  Console {\n    plugin_input = "fake"\n  }\n}\n')),(0,a.yg)("h3",{id:"multiple-sources-simple"},"Multiple Sources Simple:"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"This is a multiple source and you can specify a data source to write to the specified end")),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},'env {\n  parallelism = 1\n  job.mode = "STREAMING"\n}\n\nsource {\n  FakeSource {\n    plugin_output = "fake1"\n    schema = {\n      fields {\n        id = "int"\n        name = "string"\n        age = "int"\n        sex = "string"\n      }\n    }\n  }\n   FakeSource {\n    plugin_output = "fake2"\n    schema = {\n      fields {\n        name = "string"\n        age = "int"\n      }\n    }\n  }\n}\n\nsink {\n  Console {\n    plugin_input = "fake1"\n  }\n  Console {\n    plugin_input = "fake2"\n  }\n}\n')),(0,a.yg)("h2",{id:"console-sample-data"},"Console Sample Data"),(0,a.yg)("p",null,"This is a printout from our console"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"2022-12-19 11:01:45,417 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - output rowType: name<STRING>, age<INT>\n2022-12-19 11:01:46,489 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=1: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: CpiOd, 8520946\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=2: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: eQqTs, 1256802974\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=3: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: UsRgO, 2053193072\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=4: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: jDQJj, 1993016602\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=5: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: rqdKp, 1392682764\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=6: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: wCoWN, 986999925\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=7: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: qomTU, 72775247\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=8: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: jcqXR, 1074529204\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=9: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: AkWIO, 1961723427\n2022-12-19 11:01:46,490 INFO  org.apache.seatunnel.connectors.seatunnel.console.sink.ConsoleSinkWriter - subtaskIndex=0 rowIndex=10: SeaTunnelRow#tableId=-1 SeaTunnelRow#kind=INSERT: hBoib, 929089763\n")))}d.isMDXComponent=!0}}]);