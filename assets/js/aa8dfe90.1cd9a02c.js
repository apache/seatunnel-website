"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[24341],{15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>y});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=s(t),g=r,y=u["".concat(p,".").concat(g)]||u[g]||d[g]||o;return t?a.createElement(y,l(l({ref:n},c),{},{components:t})):a.createElement(y,l({ref:n},c))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=g;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[u]="string"==typeof e?e:r,l[1]=i;for(var s=2;s<o;s++)l[s]=t[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},21033:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var a=t(58168),r=(t(96540),t(15680));const o={sidebar_position:4},l="Quick Start With Spark",i={unversionedId:"start-v2/locally/quick-start-spark",id:"start-v2/locally/quick-start-spark",title:"Quick Start With Spark",description:"Step 1: Deployment SeaTunnel And Connectors",source:"@site/docs/start-v2/locally/quick-start-spark.md",sourceDirName:"start-v2/locally",slug:"/start-v2/locally/quick-start-spark",permalink:"/docs/start-v2/locally/quick-start-spark",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/start-v2/locally/quick-start-spark.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docs",previous:{title:"Quick Start With Flink",permalink:"/docs/start-v2/locally/quick-start-flink"},next:{title:"Set Up With Docker",permalink:"/docs/start-v2/docker/"}},p={},s=[{value:"Step 1: Deployment SeaTunnel And Connectors",id:"step-1-deployment-seatunnel-and-connectors",level:2},{value:"Step 2: Deploy And Config Spark",id:"step-2-deploy-and-config-spark",level:2},{value:"Step 3: Add Job Config File To Define A Job",id:"step-3-add-job-config-file-to-define-a-job",level:2},{value:"Step 4: Run SeaTunnel Application",id:"step-4-run-seatunnel-application",level:2},{value:"What&#39;s More",id:"whats-more",level:2}],c={toc:s},u="wrapper";function d(e){let{components:n,...t}=e;return(0,r.yg)(u,(0,a.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"quick-start-with-spark"},"Quick Start With Spark"),(0,r.yg)("h2",{id:"step-1-deployment-seatunnel-and-connectors"},"Step 1: Deployment SeaTunnel And Connectors"),(0,r.yg)("p",null,"Before starting, make sure you have downloaded and deployed SeaTunnel as described in ",(0,r.yg)("a",{parentName:"p",href:"/docs/start-v2/locally/deployment"},"Deployment")),(0,r.yg)("h2",{id:"step-2-deploy-and-config-spark"},"Step 2: Deploy And Config Spark"),(0,r.yg)("p",null,"Please ",(0,r.yg)("a",{parentName:"p",href:"https://spark.apache.org/downloads.html"},"Download Spark")," first(",(0,r.yg)("strong",{parentName:"p"},"required version >= 2.4.0"),"). For more information you can\nsee ",(0,r.yg)("a",{parentName:"p",href:"https://spark.apache.org/docs/latest/spark-standalone.html#installing-spark-standalone-to-a-cluster"},"Getting Started: Standalone")),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Configure SeaTunnel"),": Change the setting in ",(0,r.yg)("inlineCode",{parentName:"p"},"${SEATUNNEL_HOME}/config/seatunnel-env.sh")," and set ",(0,r.yg)("inlineCode",{parentName:"p"},"SPARK_HOME")," to the Spark deployment dir."),(0,r.yg)("h2",{id:"step-3-add-job-config-file-to-define-a-job"},"Step 3: Add Job Config File To Define A Job"),(0,r.yg)("p",null,"Edit ",(0,r.yg)("inlineCode",{parentName:"p"},"config/seatunnel.streaming.conf.template"),", which determines the way and logic of data input, processing, and output after seatunnel is started.\nThe following is an example of the configuration file, which is the same as the example application mentioned above."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'env {\n  parallelism = 1\n  job.mode = "BATCH"\n}\n\nsource {\n  FakeSource {\n    plugin_output = "fake"\n    row.num = 16\n    schema = {\n      fields {\n        name = "string"\n        age = "int"\n      }\n    }\n  }\n}\n\ntransform {\n  FieldMapper {\n    plugin_input = "fake"\n    plugin_output = "fake1"\n    field_mapper = {\n      age = age\n      name = new_name\n    }\n  }\n}\n\nsink {\n  Console {\n    plugin_input = "fake1"\n  }\n}\n\n')),(0,r.yg)("p",null,"More information about config please check ",(0,r.yg)("a",{parentName:"p",href:"/docs/concept/config"},"Config Concept")),(0,r.yg)("h2",{id:"step-4-run-seatunnel-application"},"Step 4: Run SeaTunnel Application"),(0,r.yg)("p",null,"You could start the application by the following commands:"),(0,r.yg)("p",null,"Spark 2.4.x"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},'cd "apache-seatunnel-${version}"\n./bin/start-seatunnel-spark-2-connector-v2.sh \\\n--master local[4] \\\n--deploy-mode client \\\n--config ./config/v2.streaming.conf.template\n')),(0,r.yg)("p",null,"Spark3.x.x"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},'cd "apache-seatunnel-${version}"\n./bin/start-seatunnel-spark-3-connector-v2.sh \\\n--master local[4] \\\n--deploy-mode client \\\n--config ./config/v2.streaming.conf.template\n')),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"See The Output"),": When you run the command, you can see its output in your console. This\nis a sign to determine whether the command ran successfully or not."),(0,r.yg)("p",null,"The SeaTunnel console will print some logs as below:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-shell"},"fields : name, age\ntypes : STRING, INT\nrow=1 : elWaB, 1984352560\nrow=2 : uAtnp, 762961563\nrow=3 : TQEIB, 2042675010\nrow=4 : DcFjo, 593971283\nrow=5 : SenEb, 2099913608\nrow=6 : DHjkg, 1928005856\nrow=7 : eScCM, 526029657\nrow=8 : sgOeE, 600878991\nrow=9 : gwdvw, 1951126920\nrow=10 : nSiKE, 488708928\nrow=11 : xubpl, 1420202810\nrow=12 : rHZqb, 331185742\nrow=13 : rciGD, 1112878259\nrow=14 : qLhdI, 1457046294\nrow=15 : ZTkRx, 1240668386\nrow=16 : SGZCr, 94186144\n")),(0,r.yg)("h2",{id:"whats-more"},"What's More"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Start write your own config file now, choose the ",(0,r.yg)("a",{parentName:"li",href:"../../connector-v2/source"},"connector")," you want to use, and configure the parameters according to the connector's documentation."),(0,r.yg)("li",{parentName:"ul"},"See ",(0,r.yg)("a",{parentName:"li",href:"/docs/other-engine/spark"},"SeaTunnel With Spark")," if you want to know more about SeaTunnel With Spark."),(0,r.yg)("li",{parentName:"ul"},"SeaTunnel have a builtin engine named ",(0,r.yg)("inlineCode",{parentName:"li"},"Zeta"),", and it's the default engine of SeaTunnel. You can follow ",(0,r.yg)("a",{parentName:"li",href:"/docs/start-v2/locally/quick-start-seatunnel-engine"},"Quick Start")," to configure and run a data synchronization job.")))}d.isMDXComponent=!0}}]);