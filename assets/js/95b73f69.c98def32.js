"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[76508],{15680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>g});var a=n(96540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(n),u=r,g=m["".concat(s,".").concat(u)]||m[u]||d[u]||l;return n?a.createElement(g,i(i({ref:t},c),{},{components:n})):a.createElement(g,i({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[m]="string"==typeof e?e:r,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},14498:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(58168),r=(n(96540),n(15680));const l={},i="Maxcompute",o={unversionedId:"connector-v2/sink/Maxcompute",id:"connector-v2/sink/Maxcompute",title:"Maxcompute",description:"Maxcompute sink connector",source:"@site/docs/connector-v2/sink/Maxcompute.md",sourceDirName:"connector-v2/sink",slug:"/connector-v2/sink/Maxcompute",permalink:"/docs/connector-v2/sink/Maxcompute",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/connector-v2/sink/Maxcompute.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"LocalFile",permalink:"/docs/connector-v2/sink/LocalFile"},next:{title:"Milvus",permalink:"/docs/connector-v2/sink/Milvus"}},s={},p=[{value:"Description",id:"description",level:2},{value:"Key features",id:"key-features",level:2},{value:"Options",id:"options",level:2},{value:"accessId string",id:"accessid-string",level:3},{value:"accesskey string",id:"accesskey-string",level:3},{value:"endpoint string",id:"endpoint-string",level:3},{value:"project string",id:"project-string",level:3},{value:"table_name string",id:"table_name-string",level:3},{value:"partition_spec string",id:"partition_spec-string",level:3},{value:"overwrite boolean",id:"overwrite-boolean",level:3},{value:"save_mode_create_template",id:"save_mode_create_template",level:3},{value:"schema_save_modeEnum",id:"schema_save_modeenum",level:3},{value:"data_save_modeEnum",id:"data_save_modeenum",level:3},{value:"custom_sqlString",id:"custom_sqlstring",level:3},{value:"common options",id:"common-options",level:3},{value:"Examples",id:"examples",level:2}],c={toc:p},m="wrapper";function d(e){let{components:t,...n}=e;return(0,r.yg)(m,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"maxcompute"},"Maxcompute"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"Maxcompute sink connector")),(0,r.yg)("h2",{id:"description"},"Description"),(0,r.yg)("p",null,"Used to read data from Maxcompute."),(0,r.yg)("h2",{id:"key-features"},"Key features"),(0,r.yg)("ul",{className:"contains-task-list"},(0,r.yg)("li",{parentName:"ul",className:"task-list-item"},(0,r.yg)("input",{parentName:"li",type:"checkbox",checked:!1,disabled:!0})," ",(0,r.yg)("a",{parentName:"li",href:"/docs/concept/connector-v2-features"},"exactly-once"))),(0,r.yg)("h2",{id:"options"},"Options"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"name"),(0,r.yg)("th",{parentName:"tr",align:null},"type"),(0,r.yg)("th",{parentName:"tr",align:null},"required"),(0,r.yg)("th",{parentName:"tr",align:null},"default value"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"accessId"),(0,r.yg)("td",{parentName:"tr",align:null},"string"),(0,r.yg)("td",{parentName:"tr",align:null},"yes"),(0,r.yg)("td",{parentName:"tr",align:null},"-")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"accesskey"),(0,r.yg)("td",{parentName:"tr",align:null},"string"),(0,r.yg)("td",{parentName:"tr",align:null},"yes"),(0,r.yg)("td",{parentName:"tr",align:null},"-")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"endpoint"),(0,r.yg)("td",{parentName:"tr",align:null},"string"),(0,r.yg)("td",{parentName:"tr",align:null},"yes"),(0,r.yg)("td",{parentName:"tr",align:null},"-")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"project"),(0,r.yg)("td",{parentName:"tr",align:null},"string"),(0,r.yg)("td",{parentName:"tr",align:null},"yes"),(0,r.yg)("td",{parentName:"tr",align:null},"-")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"table_name"),(0,r.yg)("td",{parentName:"tr",align:null},"string"),(0,r.yg)("td",{parentName:"tr",align:null},"yes"),(0,r.yg)("td",{parentName:"tr",align:null},"-")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"partition_spec"),(0,r.yg)("td",{parentName:"tr",align:null},"string"),(0,r.yg)("td",{parentName:"tr",align:null},"no"),(0,r.yg)("td",{parentName:"tr",align:null},"-")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"overwrite"),(0,r.yg)("td",{parentName:"tr",align:null},"boolean"),(0,r.yg)("td",{parentName:"tr",align:null},"no"),(0,r.yg)("td",{parentName:"tr",align:null},"false")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"common-options"),(0,r.yg)("td",{parentName:"tr",align:null},"string"),(0,r.yg)("td",{parentName:"tr",align:null},"no"),(0,r.yg)("td",{parentName:"tr",align:null})))),(0,r.yg)("h3",{id:"accessid-string"},"accessId ","[string]"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"accessId")," Your Maxcompute accessId which cloud be access from Alibaba Cloud."),(0,r.yg)("h3",{id:"accesskey-string"},"accesskey ","[string]"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"accesskey")," Your Maxcompute accessKey which cloud be access from Alibaba Cloud."),(0,r.yg)("h3",{id:"endpoint-string"},"endpoint ","[string]"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"endpoint")," Your Maxcompute endpoint start with http."),(0,r.yg)("h3",{id:"project-string"},"project ","[string]"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"project")," Your Maxcompute project which is created in Alibaba Cloud."),(0,r.yg)("h3",{id:"table_name-string"},"table_name ","[string]"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"table_name")," Target Maxcompute table name eg: fake."),(0,r.yg)("h3",{id:"partition_spec-string"},"partition_spec ","[string]"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"partition_spec")," This spec of Maxcompute partition table eg:ds='20220101'."),(0,r.yg)("h3",{id:"overwrite-boolean"},"overwrite ","[boolean]"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"overwrite")," Whether to overwrite the table or partition, default: false."),(0,r.yg)("h3",{id:"save_mode_create_template"},"save_mode_create_template"),(0,r.yg)("p",null,"We use templates to automatically create MaxCompute tables,\nwhich will create corresponding table creation statements based on the type of upstream data and schema type,\nand the default template can be modified according to the situation. Only work on multi-table mode at now."),(0,r.yg)("p",null,"Default template:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE IF NOT EXISTS `${table}` (\n${rowtype_fields}\n);\n")),(0,r.yg)("p",null,"If a custom field is filled in the template, such as adding an ",(0,r.yg)("inlineCode",{parentName:"p"},"id")," field"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE IF NOT EXISTS `${table}`\n(   \n    id,\n    ${rowtype_fields}\n);\n")),(0,r.yg)("p",null,"The connector will automatically obtain the corresponding type from the upstream to complete the filling,\nand remove the id field from ",(0,r.yg)("inlineCode",{parentName:"p"},"rowtype_fields"),". This method can be used to customize the modification of field types and attributes."),(0,r.yg)("p",null,"You can use the following placeholders"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"database: Used to get the database in the upstream schema"),(0,r.yg)("li",{parentName:"ul"},"table_name: Used to get the table name in the upstream schema"),(0,r.yg)("li",{parentName:"ul"},"rowtype_fields: Used to get all the fields in the upstream schema, we will automatically map to the field\ndescription of MaxCompute"),(0,r.yg)("li",{parentName:"ul"},"rowtype_primary_key: Used to get the primary key in the upstream schema (maybe a list)"),(0,r.yg)("li",{parentName:"ul"},"rowtype_unique_key: Used to get the unique key in the upstream schema (maybe a list)")),(0,r.yg)("h3",{id:"schema_save_modeenum"},"schema_save_mode","[Enum]"),(0,r.yg)("p",null,"Before the synchronous task is turned on, different treatment schemes are selected for the existing surface structure of the target side.",(0,r.yg)("br",{parentName:"p"}),"\n","Option introduction\uff1a",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"RECREATE_SCHEMA")," \uff1aWill create when the table does not exist, delete and rebuild when the table is saved",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"CREATE_SCHEMA_WHEN_NOT_EXIST")," \uff1aWill Created when the table does not exist, skipped when the table is saved",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"ERROR_WHEN_SCHEMA_NOT_EXIST")," \uff1aError will be reported when the table does not exist",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"IGNORE")," \uff1aIgnore the treatment of the table"),(0,r.yg)("h3",{id:"data_save_modeenum"},"data_save_mode","[Enum]"),(0,r.yg)("p",null,"Before the synchronous task is turned on, different processing schemes are selected for data existing data on the target side.",(0,r.yg)("br",{parentName:"p"}),"\n","Option introduction\uff1a",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"DROP_DATA"),"\uff1a Preserve database structure and delete data",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"APPEND_DATA"),"\uff1aPreserve database structure, preserve data",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"CUSTOM_PROCESSING"),"\uff1aUser defined processing",(0,r.yg)("br",{parentName:"p"}),"\n",(0,r.yg)("inlineCode",{parentName:"p"},"ERROR_WHEN_DATA_EXISTS"),"\uff1aWhen there is data, an error is reported"),(0,r.yg)("h3",{id:"custom_sqlstring"},"custom_sql","[String]"),(0,r.yg)("p",null,"When data_save_mode selects CUSTOM_PROCESSING, you should fill in the CUSTOM_SQL parameter. This parameter usually fills in a SQL that can be executed. SQL will be executed before synchronization tasks."),(0,r.yg)("h3",{id:"common-options"},"common options"),(0,r.yg)("p",null,"Sink plugin common parameters, please refer to ",(0,r.yg)("a",{parentName:"p",href:"/docs/connector-v2/sink-common-options"},"Sink Common Options")," for details."),(0,r.yg)("h2",{id:"examples"},"Examples"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-hocon"},'sink {\n  Maxcompute {\n    accessId="<your access id>"\n    accesskey="<your access Key>"\n    endpoint="<http://service.odps.aliyun.com/api>"\n    project="<your project>"\n    table_name="<your table name>"\n    #partition_spec="<your partition spec>"\n    #overwrite = false\n  }\n}\n')))}d.isMDXComponent=!0}}]);