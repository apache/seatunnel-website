"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[35312],{15680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>f});var r=t(96540);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},s="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,l=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),s=p(t),m=i,f=s["".concat(c,".").concat(m)]||s[m]||g[m]||l;return t?r.createElement(f,a(a({ref:n},u),{},{components:t})):r.createElement(f,a({ref:n},u))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=t.length,a=new Array(l);a[0]=m;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=e,o[s]="string"==typeof e?e:i,a[1]=o;for(var p=2;p<l;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},30001:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>g,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var r=t(58168),i=(t(96540),t(15680));const l={},a="Flink\u5f15\u64ce\u65b9\u5f0f\u8fd0\u884cSeaTunnel",o={unversionedId:"other-engine/flink",id:"other-engine/flink",title:"Flink\u5f15\u64ce\u65b9\u5f0f\u8fd0\u884cSeaTunnel",description:"Flink\u662f\u4e00\u4e2a\u5f3a\u5927\u7684\u9ad8\u6027\u80fd\u5206\u5e03\u5f0f\u6d41\u5904\u7406\u5f15\u64ce\u3002\u4f60\u53ef\u4ee5\u641c\u7d22 Apache Flink\u83b7\u53d6\u66f4\u591a\u5173\u4e8e\u5b83\u7684\u4fe1\u606f\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/other-engine/flink.md",sourceDirName:"other-engine",slug:"/other-engine/flink",permalink:"/zh-CN/docs/other-engine/flink",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/i18n/zh-CN/docusaurus-plugin-content-docs/current/other-engine/flink.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Web UI",permalink:"/zh-CN/docs/seatunnel-engine/web-ui"},next:{title:"SeaTunnel Runs On Spark",permalink:"/zh-CN/docs/other-engine/spark"}},c={},p=[{value:"\u5728Job\u4e2d\u8bbe\u7f6eFlink\u7684\u914d\u7f6e\u4fe1\u606f",id:"\u5728job\u4e2d\u8bbe\u7f6eflink\u7684\u914d\u7f6e\u4fe1\u606f",level:3},{value:"\u5982\u4f55\u8bbe\u7f6e\u4e00\u4e2a\u7b80\u5355\u7684Flink Job",id:"\u5982\u4f55\u8bbe\u7f6e\u4e00\u4e2a\u7b80\u5355\u7684flink-job",level:3},{value:"\u5982\u4f55\u5728\u9879\u76ee\u4e2d\u8fd0\u884cJob",id:"\u5982\u4f55\u5728\u9879\u76ee\u4e2d\u8fd0\u884cjob",level:3}],u={toc:p},s="wrapper";function g(e){let{components:n,...t}=e;return(0,i.yg)(s,(0,r.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"flink\u5f15\u64ce\u65b9\u5f0f\u8fd0\u884cseatunnel"},"Flink\u5f15\u64ce\u65b9\u5f0f\u8fd0\u884cSeaTunnel"),(0,i.yg)("p",null,"Flink\u662f\u4e00\u4e2a\u5f3a\u5927\u7684\u9ad8\u6027\u80fd\u5206\u5e03\u5f0f\u6d41\u5904\u7406\u5f15\u64ce\u3002\u4f60\u53ef\u4ee5\u641c\u7d22 ",(0,i.yg)("inlineCode",{parentName:"p"},"Apache Flink"),"\u83b7\u53d6\u66f4\u591a\u5173\u4e8e\u5b83\u7684\u4fe1\u606f\u3002"),(0,i.yg)("h3",{id:"\u5728job\u4e2d\u8bbe\u7f6eflink\u7684\u914d\u7f6e\u4fe1\u606f"},"\u5728Job\u4e2d\u8bbe\u7f6eFlink\u7684\u914d\u7f6e\u4fe1\u606f"),(0,i.yg)("p",null,"\u4ee5 ",(0,i.yg)("inlineCode",{parentName:"p"},"flink.")," \u5f00\u59cb\uff1a"),(0,i.yg)("p",null,"\u4f8b\u5b50: \u6211\u5bf9\u8fd9\u4e2a\u9879\u76ee\u8bbe\u7f6e\u4e00\u4e2a\u7cbe\u786e\u7684\u68c0\u67e5\u70b9"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre"},"env {\n  parallelism = 1  \n  flink.execution.checkpointing.unaligned.enabled=true\n}\n")),(0,i.yg)("p",null,"\u679a\u4e3e\u7c7b\u578b\u5f53\u524d\u8fd8\u4e0d\u652f\u6301\uff0c\u4f60\u9700\u8981\u5728Flink\u7684\u914d\u7f6e\u6587\u4ef6\u4e2d\u6307\u5b9a\u5b83\u4eec\u3002\u6682\u65f6\u53ea\u6709\u8fd9\u4e9b\u7c7b\u578b\u7684\u8bbe\u7f6e\u53d7\u652f\u6301\uff1a",(0,i.yg)("br",null),"\nInteger/Boolean/String/Duration"),(0,i.yg)("h3",{id:"\u5982\u4f55\u8bbe\u7f6e\u4e00\u4e2a\u7b80\u5355\u7684flink-job"},"\u5982\u4f55\u8bbe\u7f6e\u4e00\u4e2a\u7b80\u5355\u7684Flink Job"),(0,i.yg)("p",null,"\u8fd9\u662f\u4e00\u4e2a\u8fd0\u884c\u5728Flink\u4e2d\u968f\u673a\u751f\u6210\u6570\u636e\u6253\u5370\u5230\u63a7\u5236\u53f0\u7684\u7b80\u5355job"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre"},'env {\n  # \u516c\u5171\u53c2\u6570\n  parallelism = 1\n  checkpoint.interval = 5000\n\n  # flink\u7279\u6b8a\u53c2\u6570\n  flink.execution.checkpointing.mode = "EXACTLY_ONCE"\n  flink.execution.checkpointing.timeout = 600000\n}\n\nsource {\n  FakeSource {\n    row.num = 16\n    plugin_output = "fake_table"\n    schema = {\n      fields {\n        c_map = "map<string, string>"\n        c_array = "array<int>"\n        c_string = string\n        c_boolean = boolean\n        c_int = int\n        c_bigint = bigint\n        c_double = double\n        c_bytes = bytes\n        c_date = date\n        c_decimal = "decimal(33, 18)"\n        c_timestamp = timestamp\n        c_row = {\n          c_map = "map<string, string>"\n          c_array = "array<int>"\n          c_string = string\n          c_boolean = boolean\n          c_int = int\n          c_bigint = bigint\n          c_double = double\n          c_bytes = bytes\n          c_date = date\n          c_decimal = "decimal(33, 18)"\n          c_timestamp = timestamp\n        }\n      }\n    }\n  }\n}\n\ntransform {\n  # \u5982\u679c\u4f60\u60f3\u77e5\u9053\u66f4\u591a\u5173\u4e8e\u5982\u4f55\u914d\u7f6eseatunnel\u7684\u4fe1\u606f\u548c\u67e5\u770b\u5b8c\u6574\u7684transform\u63d2\u4ef6\uff0c\n  # \u8bf7\u8bbf\u95ee\uff1ahttps://seatunnel.apache.org/docs/transform-v2/sql\n}\n\nsink{\n   Console{}   \n}\n')),(0,i.yg)("h3",{id:"\u5982\u4f55\u5728\u9879\u76ee\u4e2d\u8fd0\u884cjob"},"\u5982\u4f55\u5728\u9879\u76ee\u4e2d\u8fd0\u884cJob"),(0,i.yg)("p",null,"\u5f53\u4f60\u5c06\u4ee3\u7801\u62c9\u5230\u672c\u5730\u540e\uff0c\u8f6c\u5230 ",(0,i.yg)("inlineCode",{parentName:"p"},"seatunnel-examples/seatunnel-flink-connector-v2-example")," \u6a21\u5757\uff0c\u67e5\u627e ",(0,i.yg)("inlineCode",{parentName:"p"},"org.apache.seatunnel.example.flink.v2.SeaTunnelApiExample")," \u5373\u53ef\u5b8c\u6210job\u7684\u64cd\u4f5c\u3002"))}g.isMDXComponent=!0}}]);