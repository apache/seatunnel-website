"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[65060],{15680:(e,n,r)=>{r.d(n,{xA:()=>s,yg:()=>y});var t=r(96540);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function o(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=t.createContext({}),d=function(e){var n=t.useContext(p),r=n;return e&&(r="function"==typeof e?e(n):l(l({},n),e)),r},s=function(e){var n=d(e.components);return t.createElement(p.Provider,{value:n},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=d(r),m=a,y=u["".concat(p,".").concat(m)]||u[m]||c[m]||i;return r?t.createElement(y,l(l({ref:n},s),{},{components:r})):t.createElement(y,l({ref:n},s))}));function y(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=m;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[u]="string"==typeof e?e:a,l[1]=o;for(var d=2;d<i;d++)l[d]=r[d];return t.createElement.apply(null,l)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},40359:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>p,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var t=r(58168),a=(r(96540),r(15680));const i={},l="FilterRowKind",o={unversionedId:"transform-v2/filter-rowkind",id:"transform-v2/filter-rowkind",title:"FilterRowKind",description:"FilterRowKind transform plugin",source:"@site/docs/transform-v2/filter-rowkind.md",sourceDirName:"transform-v2",slug:"/transform-v2/filter-rowkind",permalink:"/docs/transform-v2/filter-rowkind",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/transform-v2/filter-rowkind.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"FieldMapper",permalink:"/docs/transform-v2/field-mapper"},next:{title:"Filter",permalink:"/docs/transform-v2/filter"}},p={},d=[{value:"Description",id:"description",level:2},{value:"Options",id:"options",level:2},{value:"include_kinds array",id:"include_kinds-array",level:3},{value:"exclude_kinds array",id:"exclude_kinds-array",level:3},{value:"common options string",id:"common-options-string",level:3},{value:"Examples",id:"examples",level:2}],s={toc:d},u="wrapper";function c(e){let{components:n,...r}=e;return(0,a.yg)(u,(0,t.A)({},s,r,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"filterrowkind"},"FilterRowKind"),(0,a.yg)("blockquote",null,(0,a.yg)("p",{parentName:"blockquote"},"FilterRowKind transform plugin")),(0,a.yg)("h2",{id:"description"},"Description"),(0,a.yg)("p",null,"Filter the data by RowKind"),(0,a.yg)("h2",{id:"options"},"Options"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"name"),(0,a.yg)("th",{parentName:"tr",align:null},"type"),(0,a.yg)("th",{parentName:"tr",align:null},"required"),(0,a.yg)("th",{parentName:"tr",align:null},"default value"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"include_kinds"),(0,a.yg)("td",{parentName:"tr",align:null},"array"),(0,a.yg)("td",{parentName:"tr",align:null},"yes"),(0,a.yg)("td",{parentName:"tr",align:null})),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"exclude_kinds"),(0,a.yg)("td",{parentName:"tr",align:null},"array"),(0,a.yg)("td",{parentName:"tr",align:null},"yes"),(0,a.yg)("td",{parentName:"tr",align:null})))),(0,a.yg)("h3",{id:"include_kinds-array"},"include_kinds ","[array]"),(0,a.yg)("p",null,"The row kinds to include"),(0,a.yg)("h3",{id:"exclude_kinds-array"},"exclude_kinds ","[array]"),(0,a.yg)("p",null,"The row kinds to exclude."),(0,a.yg)("p",null,"You can only config one of ",(0,a.yg)("inlineCode",{parentName:"p"},"include_kinds")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"exclude_kinds"),"."),(0,a.yg)("h3",{id:"common-options-string"},"common options ","[string]"),(0,a.yg)("p",null,"Transform plugin common parameters, please refer to ",(0,a.yg)("a",{parentName:"p",href:"/docs/transform-v2/common-options"},"Transform Plugin")," for details"),(0,a.yg)("h2",{id:"examples"},"Examples"),(0,a.yg)("p",null,"The RowKink of the data generate by FakeSource is ",(0,a.yg)("inlineCode",{parentName:"p"},"INSERT"),", If we use ",(0,a.yg)("inlineCode",{parentName:"p"},"FilterRowKink")," transform and exclude the ",(0,a.yg)("inlineCode",{parentName:"p"},"INSERT")," data, we will write zero rows into sink."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yaml"},'\nenv {\n  job.mode = "BATCH"\n}\n\nsource {\n  FakeSource {\n    plugin_output = "fake"\n    row.num = 100\n    schema = {\n      fields {\n        id = "int"\n        name = "string"\n        age = "int"\n      }\n    }\n  }\n}\n\ntransform {\n  FilterRowKind {\n    plugin_input = "fake"\n    plugin_output = "fake1"\n    exclude_kinds = ["INSERT"]\n  }\n}\n\nsink {\n  Console {\n    plugin_input = "fake1"\n  }\n}\n')))}c.isMDXComponent=!0}}]);