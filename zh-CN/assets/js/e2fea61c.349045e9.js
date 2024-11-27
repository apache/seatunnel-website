"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[19020],{15680:(n,e,t)=>{t.d(e,{xA:()=>p,yg:()=>d});var l=t(96540);function a(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function r(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(n);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,l)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?r(Object(t),!0).forEach((function(e){a(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function g(n,e){if(null==n)return{};var t,l,a=function(n,e){if(null==n)return{};var t,l,a={},r=Object.keys(n);for(l=0;l<r.length;l++)t=r[l],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(l=0;l<r.length;l++)t=r[l],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}var u=l.createContext({}),o=function(n){var e=l.useContext(u),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},p=function(n){var e=o(n.components);return l.createElement(u.Provider,{value:e},n.children)},y="mdxType",_={inlineCode:"code",wrapper:function(n){var e=n.children;return l.createElement(l.Fragment,{},e)}},m=l.forwardRef((function(n,e){var t=n.components,a=n.mdxType,r=n.originalType,u=n.parentName,p=g(n,["components","mdxType","originalType","parentName"]),y=o(t),m=a,d=y["".concat(u,".").concat(m)]||y[m]||_[m]||r;return t?l.createElement(d,i(i({ref:e},p),{},{components:t})):l.createElement(d,i({ref:e},p))}));function d(n,e){var t=arguments,a=e&&e.mdxType;if("string"==typeof n||a){var r=t.length,i=new Array(r);i[0]=m;var g={};for(var u in e)hasOwnProperty.call(e,u)&&(g[u]=e[u]);g.originalType=n,g[y]="string"==typeof n?n:a,i[1]=g;for(var o=2;o<r;o++)i[o]=t[o];return l.createElement.apply(null,i)}return l.createElement.apply(null,t)}m.displayName="MDXCreateElement"},85928:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>u,contentTitle:()=>i,default:()=>_,frontMatter:()=>r,metadata:()=>g,toc:()=>o});var l=t(58168),a=(t(96540),t(15680));const r={},i="Assert",g={unversionedId:"connector-v2/sink/Assert",id:"connector-v2/sink/Assert",title:"Assert",description:"Assert \u6570\u636e\u63a5\u6536\u5668",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/connector-v2/sink/Assert.md",sourceDirName:"connector-v2/sink",slug:"/connector-v2/sink/Assert",permalink:"/zh-CN/docs/connector-v2/sink/Assert",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/i18n/zh-CN/docusaurus-plugin-content-docs/current/connector-v2/sink/Assert.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"AmazonSqs",permalink:"/zh-CN/docs/connector-v2/sink/AmazonSqs"},next:{title:"Cassandra",permalink:"/zh-CN/docs/connector-v2/sink/Cassandra"}},u={},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",level:2},{value:"\u6838\u5fc3\u7279\u6027",id:"\u6838\u5fc3\u7279\u6027",level:2},{value:"\u914d\u7f6e",id:"\u914d\u7f6e",level:2},{value:"rules ConfigMap",id:"rules-configmap",level:3},{value:"field_rules ConfigList",id:"field_rules-configlist",level:3},{value:"field_name string",id:"field_name-string",level:3},{value:"field_type string | ConfigMap",id:"field_type-string--configmap",level:3},{value:"field_value ConfigList",id:"field_value-configlist",level:3},{value:"rule_type string",id:"rule_type-string",level:3},{value:"rule_value numeric",id:"rule_value-numeric",level:3},{value:"equals_to boolean | numeric | string | ConfigList | ConfigMap",id:"equals_to-boolean--numeric--string--configlist--configmap",level:3},{value:"catalog_table_rule ConfigMap",id:"catalog_table_rule-configmap",level:3},{value:"table-names ConfigList",id:"table-names-configlist",level:3},{value:"tables_configs ConfigList",id:"tables_configs-configlist",level:3},{value:"table_path String",id:"table_path-string",level:3},{value:"common options",id:"common-options",level:3},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",level:2},{value:"\u7b80\u5355",id:"\u7b80\u5355",level:3},{value:"\u590d\u6742",id:"\u590d\u6742",level:3},{value:"\u9a8c\u8bc1\u591a\u8868",id:"\u9a8c\u8bc1\u591a\u8868",level:3}],p={toc:o},y="wrapper";function _(n){let{components:e,...t}=n;return(0,a.yg)(y,(0,l.A)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"assert"},"Assert"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"Assert \u6570\u636e\u63a5\u6536\u5668")),(0,a.yg)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,a.yg)("p",null,"Assert \u6570\u636e\u63a5\u6536\u5668\u662f\u4e00\u4e2a\u7528\u4e8e\u65ad\u8a00\u6570\u636e\u662f\u5426\u7b26\u5408\u7528\u6237\u5b9a\u4e49\u89c4\u5219\u7684\u6570\u636e\u63a5\u6536\u5668\u3002\u7528\u6237\u53ef\u4ee5\u901a\u8fc7\u914d\u7f6e\u89c4\u5219\u6765\u65ad\u8a00\u6570\u636e\u662f\u5426\u7b26\u5408\u9884\u671f\uff0c\u5982\u679c\u6570\u636e\u4e0d\u7b26\u5408\u89c4\u5219\uff0c\u5c06\u4f1a\u629b\u51fa\u5f02\u5e38\u3002"),(0,a.yg)("h2",{id:"\u6838\u5fc3\u7279\u6027"},"\u6838\u5fc3\u7279\u6027"),(0,a.yg)("ul",{className:"contains-task-list"},(0,a.yg)("li",{parentName:"ul",className:"task-list-item"},(0,a.yg)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,a.yg)("a",{parentName:"li",href:"/zh-CN/docs/concept/connector-v2-features"},"\u7cbe\u51c6\u4e00\u6b21"))),(0,a.yg)("h2",{id:"\u914d\u7f6e"},"\u914d\u7f6e"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Name"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Required"),(0,a.yg)("th",{parentName:"tr",align:null},"Default"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigMap"),(0,a.yg)("td",{parentName:"tr",align:null},"yes"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.field_rules"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"yes"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.field_rules.field_name"),(0,a.yg)("td",{parentName:"tr",align:null},"string","|","ConfigMap"),(0,a.yg)("td",{parentName:"tr",align:null},"yes"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.field_rules.field_type"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.field_rules.field_value"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigList"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.field_rules.field_value.rule_type"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.field_rules.field_value.rule_value"),(0,a.yg)("td",{parentName:"tr",align:null},"numeric"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.field_rules.field_value.equals_to"),(0,a.yg)("td",{parentName:"tr",align:null},"boolean","|","numeric","|","string","|","ConfigList","|","ConfigMap"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.row_rules"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"yes"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.row_rules.rule_type"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.row_rules.rule_value"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigMap"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.primary_key_rule"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigMap"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.primary_key_rule.primary_key_name"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.primary_key_rule.primary_key_columns"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigList"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.constraint_key_rule"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigList"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.constraint_key_rule.constraint_key_name"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.constraint_key_rule.constraint_key_type"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.constraint_key_rule.constraint_key_columns"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigList"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.constraint_key_rule.constraint_key_columns.constraint_key_column_name"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.constraint_key_rule.constraint_key_columns.constraint_key_sort_type"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.column_rule"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigList"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.column_rule.name"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.column_rule.type"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.column_rule.column_length"),(0,a.yg)("td",{parentName:"tr",align:null},"int"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.column_rule.nullable"),(0,a.yg)("td",{parentName:"tr",align:null},"boolean"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.column_rule.default_value"),(0,a.yg)("td",{parentName:"tr",align:null},"string"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.catalog_table_rule.column_rule.comment"),(0,a.yg)("td",{parentName:"tr",align:null},"comment"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.table-names"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigList"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.tables_configs"),(0,a.yg)("td",{parentName:"tr",align:null},"ConfigList"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"rules.tables_configs.table_path"),(0,a.yg)("td",{parentName:"tr",align:null},"String"),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"common-options"),(0,a.yg)("td",{parentName:"tr",align:null}),(0,a.yg)("td",{parentName:"tr",align:null},"no"),(0,a.yg)("td",{parentName:"tr",align:null},"-")))),(0,a.yg)("h3",{id:"rules-configmap"},"rules ","[ConfigMap]"),(0,a.yg)("p",null,"\u89c4\u5219\u5b9a\u4e49\u7528\u6237\u53ef\u7528\u6570\u636e\u7684\u89c4\u5219\u3002\u6bcf\u4e2a\u89c4\u5219\u4ee3\u8868\u4e00\u4e2a\u5b57\u6bb5\u9a8c\u8bc1\u6216\u884c\u6570\u91cf\u9a8c\u8bc1\u3002"),(0,a.yg)("h3",{id:"field_rules-configlist"},"field_rules ","[ConfigList]"),(0,a.yg)("p",null,"\u5b57\u6bb5\u89c4\u5219\u7528\u4e8e\u5b57\u6bb5\u9a8c\u8bc1"),(0,a.yg)("h3",{id:"field_name-string"},"field_name ","[string]"),(0,a.yg)("p",null,"\u5b57\u6bb5\u540d"),(0,a.yg)("h3",{id:"field_type-string--configmap"},"field_type ","[string | ConfigMap]"),(0,a.yg)("p",null,"\u5b57\u6bb5\u7c7b\u578b\u3002\u5b57\u6bb5\u7c7b\u578b\u5e94\u7b26\u5408\u6b64",(0,a.yg)("a",{parentName:"p",href:"/zh-CN/docs/concept/schema-feature#%E5%A6%82%E4%BD%95%E5%A3%B0%E6%98%8E%E6%94%AF%E6%8C%81%E7%9A%84%E7%B1%BB%E5%9E%8B"},"\u6307\u5357"),"\u3002"),(0,a.yg)("h3",{id:"field_value-configlist"},"field_value ","[ConfigList]"),(0,a.yg)("p",null,"\u5b57\u6bb5\u503c\u89c4\u5219\u5b9a\u4e49\u6570\u636e\u503c\u9a8c\u8bc1"),(0,a.yg)("h3",{id:"rule_type-string"},"rule_type ","[string]"),(0,a.yg)("p",null,"\u89c4\u5219\u7c7b\u578b\u3002\u76ee\u524d\u652f\u6301\u4ee5\u4e0b\u89c4\u5219"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},"NOT_NULL ",(0,a.yg)("inlineCode",{parentName:"li"},"\u503c\u4e0d\u80fd\u4e3a\u7a7a")),(0,a.yg)("li",{parentName:"ul"},"NULL ",(0,a.yg)("inlineCode",{parentName:"li"},"\u503c\u53ef\u4ee5\u4e3a\u7a7a")),(0,a.yg)("li",{parentName:"ul"},"MIN ",(0,a.yg)("inlineCode",{parentName:"li"},"\u5b9a\u4e49\u6570\u636e\u7684\u6700\u5c0f\u503c")),(0,a.yg)("li",{parentName:"ul"},"MAX ",(0,a.yg)("inlineCode",{parentName:"li"},"\u5b9a\u4e49\u6570\u636e\u7684\u6700\u5927\u503c")),(0,a.yg)("li",{parentName:"ul"},"MIN_LENGTH ",(0,a.yg)("inlineCode",{parentName:"li"},"\u5b9a\u4e49\u5b57\u7b26\u4e32\u6570\u636e\u7684\u6700\u5c0f\u957f\u5ea6")),(0,a.yg)("li",{parentName:"ul"},"MAX_LENGTH ",(0,a.yg)("inlineCode",{parentName:"li"},"\u5b9a\u4e49\u5b57\u7b26\u4e32\u6570\u636e\u7684\u6700\u5927\u957f\u5ea6")),(0,a.yg)("li",{parentName:"ul"},"MIN_ROW ",(0,a.yg)("inlineCode",{parentName:"li"},"\u5b9a\u4e49\u6700\u5c0f\u884c\u6570")),(0,a.yg)("li",{parentName:"ul"},"MAX_ROW ",(0,a.yg)("inlineCode",{parentName:"li"},"\u5b9a\u4e49\u6700\u5927\u884c\u6570"))),(0,a.yg)("h3",{id:"rule_value-numeric"},"rule_value ","[numeric]"),(0,a.yg)("p",null,"\u4e0e\u89c4\u5219\u7c7b\u578b\u76f8\u5173\u7684\u503c\u3002\u5f53",(0,a.yg)("inlineCode",{parentName:"p"},"rule_type"),"\u4e3a",(0,a.yg)("inlineCode",{parentName:"p"},"MIN"),"\u3001",(0,a.yg)("inlineCode",{parentName:"p"},"MAX"),"\u3001",(0,a.yg)("inlineCode",{parentName:"p"},"MIN_LENGTH"),"\u3001",(0,a.yg)("inlineCode",{parentName:"p"},"MAX_LENGTH"),"\u3001",(0,a.yg)("inlineCode",{parentName:"p"},"MIN_ROW"),"\u6216",(0,a.yg)("inlineCode",{parentName:"p"},"MAX_ROW"),"\u65f6\uff0c\u7528\u6237\u9700\u8981\u4e3a",(0,a.yg)("inlineCode",{parentName:"p"},"rule_value"),"\u5206\u914d\u4e00\u4e2a\u503c\u3002"),(0,a.yg)("h3",{id:"equals_to-boolean--numeric--string--configlist--configmap"},"equals_to ","[boolean | numeric | string | ConfigList | ConfigMap]"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"equals_to"),"\u7528\u4e8e\u6bd4\u8f83\u5b57\u6bb5\u503c\u662f\u5426\u7b49\u4e8e\u914d\u7f6e\u7684\u9884\u671f\u503c\u3002\u7528\u6237\u53ef\u4ee5\u5c06\u6240\u6709\u7c7b\u578b\u7684\u503c\u5206\u914d\u7ed9",(0,a.yg)("inlineCode",{parentName:"p"},"equals_to"),"\u3002\u8fd9\u4e9b\u7c7b\u578b\u5728",(0,a.yg)("a",{parentName:"p",href:"/zh-CN/docs/concept/schema-feature#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E5%93%AA%E4%BA%9B%E7%B1%BB%E5%9E%8B"},"\u8fd9\u91cc"),"\u6709\u8be6\u7ec6\u8bf4\u660e\u3002\n\u4f8b\u5982\uff0c\u5982\u679c\u4e00\u4e2a\u5b57\u6bb5\u662f\u4e00\u4e2a\u5305\u542b\u4e09\u4e2a\u5b57\u6bb5\u7684\u884c\uff0c\u884c\u7c7b\u578b\u7684\u58f0\u660e\u662f",(0,a.yg)("inlineCode",{parentName:"p"},"{a = array<string>, b = map<string, decimal(30, 2)>, c={c_0 = int, b = string}}"),"\uff0c\u7528\u6237\u53ef\u4ee5\u5c06\u503c",(0,a.yg)("inlineCode",{parentName:"p"},'[["a", "b"], { k0 = 9999.99, k1 = 111.11 }, [123, "abcd"]]'),"\u5206\u914d\u7ed9",(0,a.yg)("inlineCode",{parentName:"p"},"equals_to"),"\u3002"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"\u5b9a\u4e49\u5b57\u6bb5\u503c\u7684\u65b9\u5f0f\u4e0e",(0,a.yg)("a",{parentName:"p",href:"../../../en/connector-v2/source/FakeSource.md#customize-the-data-content-simple"},"FakeSource"),"\u4e00\u81f4\u3002"),(0,a.yg)("p",{parentName:"blockquote"},(0,a.yg)("inlineCode",{parentName:"p"},"equals_to"),"\u4e0d\u80fd\u5e94\u7528\u4e8e",(0,a.yg)("inlineCode",{parentName:"p"},"null"),"\u7c7b\u578b\u5b57\u6bb5\u3002\u4f46\u662f\uff0c\u7528\u6237\u53ef\u4ee5\u4f7f\u7528\u89c4\u5219\u7c7b\u578b",(0,a.yg)("inlineCode",{parentName:"p"},"NULL"),"\u8fdb\u884c\u9a8c\u8bc1\uff0c\u4f8b\u5982",(0,a.yg)("inlineCode",{parentName:"p"},"{rule_type = NULL}"),"\u3002")),(0,a.yg)("h3",{id:"catalog_table_rule-configmap"},"catalog_table_rule ","[ConfigMap]"),(0,a.yg)("p",null,"catalog_table_rule\u7528\u4e8e\u65ad\u8a00Catalog\u8868\u662f\u5426\u4e0e\u7528\u6237\u5b9a\u4e49\u7684\u8868\u76f8\u540c\u3002"),(0,a.yg)("h3",{id:"table-names-configlist"},"table-names ","[ConfigList]"),(0,a.yg)("p",null,"\u7528\u4e8e\u65ad\u8a00\u8868\u662f\u5426\u5728\u6570\u636e\u4e2d\u3002"),(0,a.yg)("h3",{id:"tables_configs-configlist"},"tables_configs ","[ConfigList]"),(0,a.yg)("p",null,"\u7528\u4e8e\u65ad\u8a00\u591a\u4e2a\u8868\u662f\u5426\u5728\u6570\u636e\u4e2d\u3002"),(0,a.yg)("h3",{id:"table_path-string"},"table_path ","[String]"),(0,a.yg)("p",null,"\u8868\u7684\u8def\u5f84\u3002"),(0,a.yg)("h3",{id:"common-options"},"common options"),(0,a.yg)("p",null,"Sink \u63d2\u4ef6\u7684\u901a\u7528\u53c2\u6570\uff0c\u8bf7\u53c2\u8003 ",(0,a.yg)("a",{parentName:"p",href:"/zh-CN/docs/connector-v2/sink-common-options"},"Sink Common Options")," \u4e86\u89e3\u8be6\u60c5"),(0,a.yg)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),(0,a.yg)("h3",{id:"\u7b80\u5355"},"\u7b80\u5355"),(0,a.yg)("p",null,"\u6574\u4e2aConfig\u9075\u5faa",(0,a.yg)("inlineCode",{parentName:"p"},"hocon"),"\u98ce\u683c"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-hocon"},'Assert {\n    rules =\n      {\n        row_rules = [\n          {\n            rule_type = MAX_ROW\n            rule_value = 10\n          },\n          {\n            rule_type = MIN_ROW\n            rule_value = 5\n          }\n        ],\n        field_rules = [{\n          field_name = name\n          field_type = string\n          field_value = [\n            {\n              rule_type = NOT_NULL\n            },\n            {\n              rule_type = MIN_LENGTH\n              rule_value = 5\n            },\n            {\n              rule_type = MAX_LENGTH\n              rule_value = 10\n            }\n          ]\n        }, {\n          field_name = age\n          field_type = int\n          field_value = [\n            {\n              rule_type = NOT_NULL\n              equals_to = 23\n            },\n            {\n              rule_type = MIN\n              rule_value = 32767\n            },\n            {\n              rule_type = MAX\n              rule_value = 2147483647\n            }\n          ]\n        }\n        ]\n        catalog_table_rule {\n            primary_key_rule = {\n                primary_key_name = "primary key"\n                primary_key_columns = ["id"]\n            }\n            constraint_key_rule = [\n                        {\n                        constraint_key_name = "unique_name"\n                        constraint_key_type = UNIQUE_KEY\n                        constraint_key_columns = [\n                            {\n                                constraint_key_column_name = "id"\n                                constraint_key_sort_type = ASC\n                            }\n                        ]\n                        }\n            ]\n            column_rule = [\n               {\n                name = "id"\n                type = bigint\n               },\n              {\n                name = "name"\n                type = string\n              },\n              {\n                name = "age"\n                type = int\n              }\n            ]\n        }\n      }\n\n  }\n')),(0,a.yg)("h3",{id:"\u590d\u6742"},"\u590d\u6742"),(0,a.yg)("p",null,"\u8fd9\u91cc\u6709\u4e00\u4e2a\u66f4\u590d\u6742\u7684\u4f8b\u5b50\uff0c\u6d89\u53ca\u5230",(0,a.yg)("inlineCode",{parentName:"p"},"equals_to"),"\u3002"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-hocon"},'source {\n  FakeSource {\n    row.num = 1\n    schema = {\n      fields {\n        c_null = "null"\n        c_string = string\n        c_boolean = boolean\n        c_tinyint = tinyint\n        c_smallint = smallint\n        c_int = int\n        c_bigint = bigint\n        c_float = float\n        c_double = double\n        c_decimal = "decimal(30, 8)"\n        c_date = date\n        c_timestamp = timestamp\n        c_time = time\n        c_bytes = bytes\n        c_array = "array<int>"\n        c_map = "map<time, string>"\n        c_map_nest = "map<string, {c_int = int, c_string = string}>"\n        c_row = {\n          c_null = "null"\n          c_string = string\n          c_boolean = boolean\n          c_tinyint = tinyint\n          c_smallint = smallint\n          c_int = int\n          c_bigint = bigint\n          c_float = float\n          c_double = double\n          c_decimal = "decimal(30, 8)"\n          c_date = date\n          c_timestamp = timestamp\n          c_time = time\n          c_bytes = bytes\n          c_array = "array<int>"\n          c_map = "map<string, string>"\n        }\n      }\n    }\n    rows = [\n      {\n        kind = INSERT\n        fields = [\n          null, "AAA", false, 1, 1, 333, 323232, 3.1, 9.33333, 99999.99999999, "2012-12-21", "2012-12-21T12:34:56", "12:34:56",\n          "bWlJWmo=",\n          [0, 1, 2],\n          "{ 12:01:26 = v0 }",\n          { k1 = [123, "BBB-BB"]},\n          [\n            null, "AAA", false, 1, 1, 333, 323232, 3.1, 9.33333, 99999.99999999, "2012-12-21", "2012-12-21T12:34:56", "12:34:56",\n            "bWlJWmo=",\n            [0, 1, 2],\n            { k0 = v0 }\n          ]\n        ]\n      }\n    ]\n    plugin_output = "fake"\n  }\n}\n\nsink{\n  Assert {\n    plugin_input = "fake"\n    rules =\n      {\n        row_rules = [\n          {\n            rule_type = MAX_ROW\n            rule_value = 1\n          },\n          {\n            rule_type = MIN_ROW\n            rule_value = 1\n          }\n        ],\n        field_rules = [\n            {\n                field_name = c_null\n                field_type = "null"\n                field_value = [\n                    {\n                        rule_type = NULL\n                    }\n                ]\n            },\n            {\n                field_name = c_string\n                field_type = string\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = "AAA"\n                    }\n                ]\n            },\n            {\n                field_name = c_boolean\n                field_type = boolean\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = false\n                    }\n                ]\n            },\n            {\n                field_name = c_tinyint\n                field_type = tinyint\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = 1\n                    }\n                ]\n            },\n            {\n                field_name = c_smallint\n                field_type = smallint\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = 1\n                    }\n                ]\n            },\n            {\n                field_name = c_int\n                field_type = int\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = 333\n                    }\n                ]\n            },\n            {\n                field_name = c_bigint\n                field_type = bigint\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = 323232\n                    }\n                ]\n            },\n            {\n                field_name = c_float\n                field_type = float\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = 3.1\n                    }\n                ]\n            },\n            {\n                field_name = c_double\n                field_type = double\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = 9.33333\n                    }\n                ]\n            },\n            {\n                field_name = c_decimal\n                field_type = "decimal(30, 8)"\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = 99999.99999999\n                    }\n                ]\n            },\n            {\n                field_name = c_date\n                field_type = date\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = "2012-12-21"\n                    }\n                ]\n            },\n            {\n                field_name = c_timestamp\n                field_type = timestamp\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = "2012-12-21T12:34:56"\n                    }\n                ]\n            },\n            {\n                field_name = c_time\n                field_type = time\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = "12:34:56"\n                    }\n                ]\n            },\n            {\n                field_name = c_bytes\n                field_type = bytes\n                field_value = [\n                      {\n                          rule_type = NOT_NULL\n                          equals_to = "bWlJWmo="\n                      }\n                ]\n            },\n            {\n                field_name = c_array\n                field_type = "array<int>"\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = [0, 1, 2]\n                    }\n                ]\n            },\n            {\n                field_name = c_map\n                field_type = "map<time, string>"\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = "{ 12:01:26 = v0 }"\n                    }\n                ]\n            },\n            {\n                field_name = c_map_nest\n                field_type = "map<string, {c_int = int, c_string = string}>"\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = { k1 = [123, "BBB-BB"] }\n                    }\n                ]\n            },\n            {\n                field_name = c_row\n                field_type = {\n                    c_null = "null"\n                    c_string = string\n                    c_boolean = boolean\n                    c_tinyint = tinyint\n                    c_smallint = smallint\n                    c_int = int\n                    c_bigint = bigint\n                    c_float = float\n                    c_double = double\n                    c_decimal = "decimal(30, 8)"\n                    c_date = date\n                    c_timestamp = timestamp\n                    c_time = time\n                    c_bytes = bytes\n                    c_array = "array<int>"\n                    c_map = "map<string, string>"\n                }\n                field_value = [\n                    {\n                        rule_type = NOT_NULL\n                        equals_to = [\n                           null, "AAA", false, 1, 1, 333, 323232, 3.1, 9.33333, 99999.99999999, "2012-12-21", "2012-12-21T12:34:56", "12:34:56",\n                           "bWlJWmo=",\n                           [0, 1, 2],\n                           { k0 = v0 }\n                        ]\n                    }\n                ]\n            }\n        ]\n    }\n  }\n}\n')),(0,a.yg)("h3",{id:"\u9a8c\u8bc1\u591a\u8868"},"\u9a8c\u8bc1\u591a\u8868"),(0,a.yg)("p",null,"\u9a8c\u8bc1\u591a\u4e2a\u8868"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-hocon"},'env {\n  parallelism = 1\n  job.mode = BATCH\n}\n\nsource {\n  FakeSource {\n    tables_configs = [\n      {\n        row.num = 16\n        schema {\n          table = "test.table1"\n          fields {\n            c_int = int\n            c_bigint = bigint\n          }\n        }\n      },\n      {\n        row.num = 17\n        schema {\n          table = "test.table2"\n          fields {\n            c_string = string\n            c_tinyint = tinyint\n          }\n        }\n      }\n    ]\n  }\n}\n\ntransform {\n}\n\nsink {\n  Assert {\n    rules =\n      {\n        tables_configs = [\n          {\n            table_path = "test.table1"\n            row_rules = [\n              {\n                rule_type = MAX_ROW\n                rule_value = 16\n              },\n              {\n                rule_type = MIN_ROW\n                rule_value = 16\n              }\n            ],\n            field_rules = [{\n              field_name = c_int\n              field_type = int\n              field_value = [\n                {\n                  rule_type = NOT_NULL\n                }\n              ]\n            }, {\n              field_name = c_bigint\n              field_type = bigint\n              field_value = [\n                {\n                  rule_type = NOT_NULL\n                }\n              ]\n            }]\n          },\n          {\n            table_path = "test.table2"\n            row_rules = [\n              {\n                rule_type = MAX_ROW\n                rule_value = 17\n              },\n              {\n                rule_type = MIN_ROW\n                rule_value = 17\n              }\n            ],\n            field_rules = [{\n              field_name = c_string\n              field_type = string\n              field_value = [\n                {\n                  rule_type = NOT_NULL\n                }\n              ]\n            }, {\n              field_name = c_tinyint\n              field_type = tinyint\n              field_value = [\n                {\n                  rule_type = NOT_NULL\n                }\n              ]\n            }]\n          }\n        ]\n\n      }\n  }\n}\n\n')))}_.isMDXComponent=!0}}]);