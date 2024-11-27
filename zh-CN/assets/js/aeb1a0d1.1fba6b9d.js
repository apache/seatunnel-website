"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[51720],{15680:(e,n,t)=>{t.d(n,{xA:()=>s,yg:()=>d});var a=t(96540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var m=a.createContext({}),p=function(e){var n=a.useContext(m),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=p(e.components);return a.createElement(m.Provider,{value:n},e.children)},g="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,m=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),g=p(t),u=r,d=g["".concat(m,".").concat(u)]||g[u]||y[u]||l;return t?a.createElement(d,o(o({ref:n},s),{},{components:t})):a.createElement(d,o({ref:n},s))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,o=new Array(l);o[0]=u;var i={};for(var m in n)hasOwnProperty.call(n,m)&&(i[m]=n[m]);i.originalType=e,i[g]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<l;p++)o[p]=t[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},45210:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>o,default:()=>y,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var a=t(58168),r=(t(96540),t(15680));const l={sidebar_position:2},o="Transform\u7684\u591a\u8868\u8f6c\u6362",i={unversionedId:"transform-v2/transform-multi-table",id:"transform-v2/transform-multi-table",title:"Transform\u7684\u591a\u8868\u8f6c\u6362",description:"SeaTunnel transform\u652f\u6301\u591a\u8868\u8f6c\u6362\uff0c\u5728\u4e0a\u6e38\u63d2\u4ef6\u8f93\u51fa\u591a\u4e2a\u8868\u7684\u65f6\u5019\u7279\u522b\u6709\u7528\uff0c\u80fd\u591f\u5728\u4e00\u4e2atransform\u4e2d\u5b8c\u6210\u6240\u6709\u7684\u8f6c\u6362\u64cd\u4f5c\u3002\u76ee\u524dSeaTunnel\u5f88\u591aConnectors\u652f\u6301\u591a\u8868\u8f93\u51fa\uff0c\u6bd4\u5982JDBCSource\u3001MySQL-CDC",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/transform-v2/transform-multi-table.md",sourceDirName:"transform-v2",slug:"/transform-v2/transform-multi-table",permalink:"/zh-CN/docs/transform-v2/transform-multi-table",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/i18n/zh-CN/docusaurus-plugin-content-docs/current/transform-v2/transform-multi-table.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docs",previous:{title:"Transform-V2",permalink:"/zh-CN/docs/transform-v2"},next:{title:"\u8f6c\u6362\u5e38\u89c1\u9009\u9879",permalink:"/zh-CN/docs/transform-v2/common-options"}},m={},p=[{value:"\u5c5e\u6027",id:"\u5c5e\u6027",level:2},{value:"\u5339\u914d\u903b\u8f91",id:"\u5339\u914d\u903b\u8f91",level:2},{value:"\u89e3\u91ca",id:"\u89e3\u91ca",level:3}],s={toc:p},g="wrapper";function y(e){let{components:n,...t}=e;return(0,r.yg)(g,(0,a.A)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"transform\u7684\u591a\u8868\u8f6c\u6362"},"Transform\u7684\u591a\u8868\u8f6c\u6362"),(0,r.yg)("p",null,"SeaTunnel transform\u652f\u6301\u591a\u8868\u8f6c\u6362\uff0c\u5728\u4e0a\u6e38\u63d2\u4ef6\u8f93\u51fa\u591a\u4e2a\u8868\u7684\u65f6\u5019\u7279\u522b\u6709\u7528\uff0c\u80fd\u591f\u5728\u4e00\u4e2atransform\u4e2d\u5b8c\u6210\u6240\u6709\u7684\u8f6c\u6362\u64cd\u4f5c\u3002\u76ee\u524dSeaTunnel\u5f88\u591aConnectors\u652f\u6301\u591a\u8868\u8f93\u51fa\uff0c\u6bd4\u5982",(0,r.yg)("inlineCode",{parentName:"p"},"JDBCSource"),"\u3001",(0,r.yg)("inlineCode",{parentName:"p"},"MySQL-CDC"),"\n\u7b49\u3002\u6240\u6709\u7684Transform\u90fd\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u914d\u7f6e\u5b9e\u73b0\u591a\u8868\u8f6c\u6362\u3002"),(0,r.yg)("admonition",{type:"tip"},(0,r.yg)("p",{parentName:"admonition"},"\u591a\u8868Transform\u6ca1\u6709\u5bf9Transform\u80fd\u529b\u7684\u9650\u5236\uff0c\u4efb\u4f55Transform\u7684\u914d\u7f6e\u90fd\u53ef\u4ee5\u5728\u591a\u8868Transform\u4e2d\u4f7f\u7528\u3002\u591a\u8868Transform\u7684\u4f5c\u7528\u9488\u5bf9\u6570\u636e\u6d41\u4e2d\u7684\u591a\u4e2a\u8868\u8fdb\u884c\u5355\u72ec\u7684\u5904\u7406\uff0c\u5e76\u5c06\u591a\u4e2a\u8868\u7684Transform\u914d\u7f6e\u5408\u5e76\u5230\u4e00\u4e2aTransform\u4e2d\uff0c\u65b9\u4fbf\u7528\u6237\u7ba1\u7406\u3002")),(0,r.yg)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Name"),(0,r.yg)("th",{parentName:"tr",align:null},"Type"),(0,r.yg)("th",{parentName:"tr",align:null},"Required"),(0,r.yg)("th",{parentName:"tr",align:null},"Default"),(0,r.yg)("th",{parentName:"tr",align:null},"Description"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"table_match_regex"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},".*"),(0,r.yg)("td",{parentName:"tr",align:null},"\u8868\u540d\u7684\u6b63\u5219\u8868\u8fbe\u5f0f\uff0c\u901a\u8fc7\u6b63\u5219\u8868\u8fbe\u5f0f\u6765\u5339\u914d\u9700\u8981\u8fdb\u884c\u8f6c\u6362\u7684\u8868\uff0c\u9ed8\u8ba4\u5339\u914d\u6240\u6709\u7684\u8868\u3002\u6ce8\u610f\u8fd9\u4e2a\u8868\u540d\u662f\u4e0a\u6e38\u7684\u771f\u6b63\u8868\u540d\uff0c\u4e0d\u662fresult_table_name\u3002")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"table_transform"),(0,r.yg)("td",{parentName:"tr",align:null},"List"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"\u53ef\u4ee5\u901a\u8fc7table_transform\u5217\u8868\u6765\u6307\u5b9a\u90e8\u5206\u8868\u7684\u89c4\u5219\uff0c\u5f53\u5728table_transform\u4e2d\u914d\u7f6e\u67d0\u4e2a\u8868\u7684\u8f6c\u6362\u89c4\u5219\u540e\uff0c\u5916\u5c42\u9488\u5bf9\u5f53\u524d\u8868\u7684\u89c4\u5219\u4e0d\u4f1a\u751f\u6548\uff0c\u4ee5table_transform\u4e2d\u7684\u4e3a\u51c6")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"table_transform.table_path"),(0,r.yg)("td",{parentName:"tr",align:null},"String"),(0,r.yg)("td",{parentName:"tr",align:null},"No"),(0,r.yg)("td",{parentName:"tr",align:null},"-"),(0,r.yg)("td",{parentName:"tr",align:null},"\u5f53\u5728table_transform\u4e2d\u914d\u7f6e\u67d0\u4e2a\u8868\u7684\u8f6c\u6362\u89c4\u5219\u540e\uff0c\u9700\u8981\u4f7f\u7528table_path\u5b57\u6bb5\u6307\u5b9a\u8868\u540d\uff0c\u8868\u540d\u9700\u8981\u5305\u542b",(0,r.yg)("inlineCode",{parentName:"td"},"databaseName[.schemaName].tableName"),"\u3002")))),(0,r.yg)("h2",{id:"\u5339\u914d\u903b\u8f91"},"\u5339\u914d\u903b\u8f91"),(0,r.yg)("p",null,"\u5047\u8bbe\u6211\u4eec\u4ece\u4e0a\u6e38\u8bfb\u53d6\u4e865\u5f20\u8868\uff0c\u5206\u522b\u4e3a",(0,r.yg)("inlineCode",{parentName:"p"},"test.abc"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.abcd"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.xyz"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.xyzxyz"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.www"),"\u3002\u4ed6\u4eec\u7684\u8868\u7ed3\u6784\u4e00\u81f4\uff0c\u90fd\u6709",(0,r.yg)("inlineCode",{parentName:"p"},"id"),"\u3001",(0,r.yg)("inlineCode",{parentName:"p"},"name"),"\u3001",(0,r.yg)("inlineCode",{parentName:"p"},"age"),"\u4e09\u4e2a\u5b57\u6bb5\u3002"),(0,r.yg)("p",null,"| id | name | age |"),(0,r.yg)("p",null,"\u73b0\u5728\u6211\u4eec\u60f3\u901a\u8fc7Copy transform\u5c06\u8fd95\u5f20\u8868\u7684\u6570\u636e\u8fdb\u884c\u590d\u5236\uff0c\u5177\u4f53\u9700\u6c42\u662f\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.abc"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.abcd"),"\u8868\u9700\u8981\u5c06",(0,r.yg)("inlineCode",{parentName:"p"},"name"),"\u590d\u5236\u4e3a",(0,r.yg)("inlineCode",{parentName:"p"},"name1"),"\uff0c\n",(0,r.yg)("inlineCode",{parentName:"p"},"test.xyz"),"\u8868\u9700\u8981\u590d\u5236\u4e3a",(0,r.yg)("inlineCode",{parentName:"p"},"name2"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.xyzxyz"),"\u8868\u9700\u8981\u590d\u5236\u4e3a",(0,r.yg)("inlineCode",{parentName:"p"},"name3"),"\uff0c",(0,r.yg)("inlineCode",{parentName:"p"},"test.www"),"\u6570\u636e\u7ed3\u6784\u4e0d\u53d8\u3002\u90a3\u4e48\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u914d\u7f6e\u6765\u5b9e\u73b0\uff1a"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'transform {\n  Copy {\n    source_table_name = "fake"  // \u53ef\u9009\u7684\u8bfb\u53d6\u6570\u636e\u96c6\u540d\n    result_table_name = "fake1" // \u53ef\u9009\u7684\u8f93\u51fa\u6570\u636e\u96c6\u540d\n\n    table_match_regex = "test.a.*" // 1. \u901a\u8fc7\u6b63\u5219\u8868\u8fbe\u5f0f\u5339\u914d\u9700\u8981\u8fdb\u884c\u8f6c\u6362\u7684\u8868\uff0ctest.a.*\u8868\u793a\u5339\u914dtest.abc\u548ctest.abcd\n    src_field = "name" // \u6e90\u5b57\u6bb5\n    dest_field = "name1" // \u76ee\u6807\u5b57\u6bb5\n    table_transform = [{\n      table_path = "test.xyz" // 2. \u6307\u5b9a\u8868\u540d\u8fdb\u884c\u8f6c\u6362\n      src_field = "name"  // \u6e90\u5b57\u6bb5\n      dest_field = "name2" // \u76ee\u6807\u5b57\u6bb5\n    }, {\n      table_path = "test.xyzxyz"\n      src_field = "name"\n      dest_field = "name3"\n    }]\n  }\n}\n')),(0,r.yg)("h3",{id:"\u89e3\u91ca"},"\u89e3\u91ca"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},"\u901a\u8fc7\u7b2c\u4e00\u5c42\u7684\u6b63\u5219\u8868\u8fbe\u5f0f\uff0c\u548c\u5bf9\u5e94\u7684Copy transform options\u914d\u7f6e\uff0c\u6211\u4eec\u53ef\u4ee5\u5339\u914d\u5230",(0,r.yg)("inlineCode",{parentName:"li"},"test.abc"),"\u548c",(0,r.yg)("inlineCode",{parentName:"li"},"test.abcd"),"\u8868\uff0c\u5c06",(0,r.yg)("inlineCode",{parentName:"li"},"name"),"\u5b57\u6bb5\u590d\u5236\u4e3a",(0,r.yg)("inlineCode",{parentName:"li"},"name1"),"\u3002"),(0,r.yg)("li",{parentName:"ol"},"\u901a\u8fc7",(0,r.yg)("inlineCode",{parentName:"li"},"table_transform"),"\u914d\u7f6e\uff0c\u6211\u4eec\u53ef\u4ee5\u6307\u5b9a",(0,r.yg)("inlineCode",{parentName:"li"},"test.xyz"),"\u8868\uff0c\u5c06",(0,r.yg)("inlineCode",{parentName:"li"},"name"),"\u5b57\u6bb5\u590d\u5236\u4e3a",(0,r.yg)("inlineCode",{parentName:"li"},"name2"),"\u3002")),(0,r.yg)("p",null,"\u8fd9\u6837\u6211\u4eec\u5c31\u53ef\u4ee5\u901a\u8fc7\u4e00\u4e2atransform\u5b8c\u6210\u5bf9\u591a\u4e2a\u8868\u7684\u8f6c\u6362\u64cd\u4f5c\u3002"),(0,r.yg)("p",null,"\u5bf9\u4e8e\u6bcf\u4e2a\u8868\u6765\u8bf4\uff0c\u914d\u7f6e\u7684\u4f18\u5148\u7ea7\u662f\uff1a",(0,r.yg)("inlineCode",{parentName:"p"},"table_transform")," > ",(0,r.yg)("inlineCode",{parentName:"p"},"table_match_regex"),"\u3002\u5982\u679c\u6240\u6709\u7684\u89c4\u5219\u90fd\u6ca1\u6709\u5339\u914d\u5230\uff0c\u90a3\u4e48\u8be5\u8868\u5c06\u4e0d\u4f1a\u8fdb\u884c\u4efb\u4f55\u8f6c\u6362\u64cd\u4f5c\u3002"),(0,r.yg)("p",null,"\u9488\u5bf9\u6bcf\u4e2a\u8868\u6765\u8bf4\uff0c\u4ed6\u4eec\u7684Transform\u914d\u7f6e\u662f\uff1a"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"test.abc"),"\u548c",(0,r.yg)("strong",{parentName:"li"},"test.abcd"))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'transform {\n  Copy {\n    src_field = "name"\n    dest_field = "name1"\n  }\n}\n')),(0,r.yg)("p",null,"\u8f93\u51fa\u8868\u7ed3\u6784\uff1a"),(0,r.yg)("p",null,"| id | name | age | name1 |"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"test.xyz"))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'transform {\n  Copy {\n    src_field = "name"\n    dest_field = "name2"\n  }\n}\n')),(0,r.yg)("p",null,"\u8f93\u51fa\u8868\u7ed3\u6784\uff1a"),(0,r.yg)("p",null,"| id | name | age | name2 |"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"test.xyzxyz"))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'transform {\n  Copy {\n    src_field = "name"\n    dest_field = "name3"\n  }\n}\n')),(0,r.yg)("p",null,"\u8f93\u51fa\u8868\u7ed3\u6784\uff1a"),(0,r.yg)("p",null,"| id | name | age | name3 |"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"test.www"))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},"transform {\n  // \u65e0\u9700\u8f6c\u6362\n}\n")),(0,r.yg)("p",null,"\u8f93\u51fa\u8868\u7ed3\u6784\uff1a"),(0,r.yg)("p",null,"| id | name | age |"),(0,r.yg)("p",null,"\u6211\u4eec\u4f7f\u7528\u4e86Copy Transform\u4f5c\u4e3a\u4e86\u793a\u4f8b\uff0c\u5b9e\u9645\u4e0a\u6240\u6709\u7684Transform\u90fd\u652f\u6301\u591a\u8868\u8f6c\u6362\uff0c\u53ea\u9700\u8981\u5728\u5bf9\u5e94\u7684Transform\u4e2d\u914d\u7f6e\u5373\u53ef\u3002"))}y.isMDXComponent=!0}}]);