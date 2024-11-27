"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[56879],{15680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>y});var r=t(96540);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(t),m=a,y=c["".concat(p,".").concat(m)]||c[m]||g[m]||o;return t?r.createElement(y,i(i({ref:n},u),{},{components:t})):r.createElement(y,i({ref:n},u))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},31916:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=t(58168),a=(t(96540),t(15680));const o={sidebar_position:9},i="Resource Isolation",l={unversionedId:"seatunnel-engine/resource-isolation",id:"seatunnel-engine/resource-isolation",title:"Resource Isolation",description:"SeaTunnel can add tag to each worker node, when you submit job you can use tag_filter to filter the node you want run this job.",source:"@site/docs/seatunnel-engine/resource-isolation.md",sourceDirName:"seatunnel-engine",slug:"/seatunnel-engine/resource-isolation",permalink:"/docs/seatunnel-engine/resource-isolation",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/seatunnel-engine/resource-isolation.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"docs",previous:{title:"TCP Network",permalink:"/docs/seatunnel-engine/tcp"},next:{title:"RESTful API V1",permalink:"/docs/seatunnel-engine/rest-api-v1"}},p={},s=[{value:"Configuration",id:"configuration",level:2}],u={toc:s},c="wrapper";function g(e){let{components:n,...o}=e;return(0,a.yg)(c,(0,r.A)({},u,o,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"resource-isolation"},"Resource Isolation"),(0,a.yg)("p",null,"SeaTunnel can add ",(0,a.yg)("inlineCode",{parentName:"p"},"tag")," to each worker node, when you submit job you can use ",(0,a.yg)("inlineCode",{parentName:"p"},"tag_filter")," to filter the node you want run this job."),(0,a.yg)("h2",{id:"configuration"},"Configuration"),(0,a.yg)("ol",null,(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"update the config in ",(0,a.yg)("inlineCode",{parentName:"p"},"hazelcast.yaml"),","),(0,a.yg)("pre",{parentName:"li"},(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},"hazelcast:\n  cluster-name: seatunnel\n  network:\n    rest-api:\n      enabled: true\n      endpoint-groups:\n        CLUSTER_WRITE:\n          enabled: true\n        DATA:\n          enabled: true\n    join:\n      tcp-ip:\n        enabled: true\n        member-list:\n          - localhost\n    port:\n      auto-increment: false\n      port: 5801\n  properties:\n    hazelcast.invocation.max.retry.count: 20\n    hazelcast.tcp.join.port.try.count: 30\n    hazelcast.logging.type: log4j2\n    hazelcast.operation.generic.thread.count: 50\n  member-attributes:\n    group:\n      type: string\n      value: platform\n    team:\n      type: string\n      value: team1\n")),(0,a.yg)("p",{parentName:"li"},"In this config, we specify the tag by ",(0,a.yg)("inlineCode",{parentName:"p"},"member-attributes"),", the node has ",(0,a.yg)("inlineCode",{parentName:"p"},"group=platform, team=team1")," tags.")),(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"add ",(0,a.yg)("inlineCode",{parentName:"p"},"tag_filter")," to your job config"))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-hacon"},'env {\n  parallelism = 1\n  job.mode = "BATCH"\n  tag_filter {\n    group = "platform"\n    team = "team1"\n  }\n}\nsource {\n  FakeSource {\n    plugin_output = "fake"\n    parallelism = 1\n    schema = {\n      fields {\n        name = "string"\n      }\n    }\n  }\n}\ntransform {\n}\nsink {\n  console {\n    plugin_input="fake"\n  }\n}\n')),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre"},"**Notice:**\n")),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"If not set ",(0,a.yg)("inlineCode",{parentName:"p"},"tag_filter")," in job config, it will random choose the node in all active nodes.")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},"When you add multiple tag in ",(0,a.yg)("inlineCode",{parentName:"p"},"tag_filter"),", it need all key exist and value match. if all node not match, you will get ",(0,a.yg)("inlineCode",{parentName:"p"},"NoEnoughResourceException")," exception."),(0,a.yg)("p",{parentName:"li"},(0,a.yg)("img",{alt:"img.png",src:t(37784).A,width:"1010",height:"471"})))),(0,a.yg)("ol",{start:3},(0,a.yg)("li",{parentName:"ol"},(0,a.yg)("p",{parentName:"li"},"update running node tags by rest api (optional)"),(0,a.yg)("p",{parentName:"li"},"for more information, please refer to ",(0,a.yg)("a",{parentName:"p",href:"/docs/seatunnel-engine/rest-api-v2"},"Update the tags of running node")))))}g.isMDXComponent=!0},37784:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/resource-isolation-a002d8a1611f1d7d27b7821f321b8413.png"}}]);