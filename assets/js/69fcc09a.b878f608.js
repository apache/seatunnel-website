"use strict";(self.webpackChunkseatunnel_website=self.webpackChunkseatunnel_website||[]).push([[12314],{15680:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>g});var o=t(96540);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,o,l=function(e,n){if(null==e)return{};var t,o,l={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var s=o.createContext({}),p=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},c=function(e){var n=p(e.components);return o.createElement(s.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,l=e.mdxType,i=e.originalType,s=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),u=p(t),m=l,g=u["".concat(s,".").concat(m)]||u[m]||d[m]||i;return t?o.createElement(g,a(a({ref:n},c),{},{components:t})):o.createElement(g,a({ref:n},c))}));function g(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var i=t.length,a=new Array(i);a[0]=m;var r={};for(var s in n)hasOwnProperty.call(n,s)&&(r[s]=n[s]);r.originalType=e,r[u]="string"==typeof e?e:l,a[1]=r;for(var p=2;p<i;p++)a[p]=t[p];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},99746:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>r,toc:()=>p});var o=t(58168),l=(t(96540),t(15680));const i={sidebar_position:4},a="Run Jobs In Local Mode",r={unversionedId:"seatunnel-engine/local-mode-deployment",id:"seatunnel-engine/local-mode-deployment",title:"Run Jobs In Local Mode",description:"Only for testing.",source:"@site/docs/seatunnel-engine/local-mode-deployment.md",sourceDirName:"seatunnel-engine",slug:"/seatunnel-engine/local-mode-deployment",permalink:"/docs/seatunnel-engine/local-mode-deployment",draft:!1,editUrl:"https://github.com/apache/seatunnel-website/edit/main/docs/seatunnel-engine/local-mode-deployment.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docs",previous:{title:"SeaTunnel Engine(Zeta) Deployment",permalink:"/docs/seatunnel-engine/deployment"},next:{title:"Deploy SeaTunnel Engine Hybrid Mode Cluster",permalink:"/docs/seatunnel-engine/hybrid-cluster-deployment"}},s={},p=[{value:"Deploying SeaTunnel Engine In Local Mode",id:"deploying-seatunnel-engine-in-local-mode",level:2},{value:"Submitting Jobs",id:"submitting-jobs",level:2},{value:"Configure The JVM Options For Local Mode",id:"configure-the-jvm-options-for-local-mode",level:3},{value:"Job Operations",id:"job-operations",level:2}],c={toc:p},u="wrapper";function d(e){let{components:n,...t}=e;return(0,l.yg)(u,(0,o.A)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,l.yg)("h1",{id:"run-jobs-in-local-mode"},"Run Jobs In Local Mode"),(0,l.yg)("p",null,"Only for testing."),(0,l.yg)("p",null,"In local mode, each task will start a separate process, and the process will exit when the task is completed. There are the following limitations in this mode:"),(0,l.yg)("ol",null,(0,l.yg)("li",{parentName:"ol"},"Pausing and resuming tasks are not supported."),(0,l.yg)("li",{parentName:"ol"},"Viewing the task list is not supported."),(0,l.yg)("li",{parentName:"ol"},"Jobs cannot be cancelled via commands, only by killing the process."),(0,l.yg)("li",{parentName:"ol"},"REST API is not supported.")),(0,l.yg)("p",null,"The ",(0,l.yg)("a",{parentName:"p",href:"/docs/seatunnel-engine/separated-cluster-deployment"},"Separated Cluster Mode")," of SeaTunnel Engine is recommended for use in production environments."),(0,l.yg)("h2",{id:"deploying-seatunnel-engine-in-local-mode"},"Deploying SeaTunnel Engine In Local Mode"),(0,l.yg)("p",null,"In local mode, there is no need to deploy a SeaTunnel Engine cluster. You only need to use the following command to submit jobs. The system will start the SeaTunnel Engine (Zeta) service in the process that submitted the job to run the submitted job, and the process will exit after the job is completed."),(0,l.yg)("p",null,"In this mode, you only need to copy the downloaded and created installation package to the server where you need to run it. If you need to adjust the JVM parameters for job execution, you can modify the ",(0,l.yg)("inlineCode",{parentName:"p"},"$SEATUNNEL_HOME/config/jvm_client_options")," file."),(0,l.yg)("h2",{id:"submitting-jobs"},"Submitting Jobs"),(0,l.yg)("pre",null,(0,l.yg)("code",{parentName:"pre",className:"language-shell"},"$SEATUNNEL_HOME/bin/seatunnel.sh --config $SEATUNNEL_HOME/config/v2.batch.config.template -m local\n")),(0,l.yg)("h3",{id:"configure-the-jvm-options-for-local-mode"},"Configure The JVM Options For Local Mode"),(0,l.yg)("p",null,"Local Mode supports two methods for setting JVM options:"),(0,l.yg)("ol",null,(0,l.yg)("li",{parentName:"ol"},(0,l.yg)("p",{parentName:"li"},"Add the JVM options to ",(0,l.yg)("inlineCode",{parentName:"p"},"$SEATUNNEL_HOME/config/jvm_client_options"),"."),(0,l.yg)("p",{parentName:"li"},"Modify the JVM parameters in the ",(0,l.yg)("inlineCode",{parentName:"p"},"$SEATUNNEL_HOME/config/jvm_client_options")," file. Please note that the JVM parameters in this file will be applied to all jobs submitted using ",(0,l.yg)("inlineCode",{parentName:"p"},"seatunnel.sh"),", including Local Mode and Cluster Mode.")),(0,l.yg)("li",{parentName:"ol"},(0,l.yg)("p",{parentName:"li"},"Add JVM options when starting the Local Mode. For example, ",(0,l.yg)("inlineCode",{parentName:"p"},'$SEATUNNEL_HOME/bin/seatunnel.sh --config $SEATUNNEL_HOME/config/v2.batch.config.template -m local -DJvmOption="-Xms2G -Xmx2G"')))),(0,l.yg)("h2",{id:"job-operations"},"Job Operations"),(0,l.yg)("p",null,"Jobs submitted in local mode will run in the process that submitted the job, and the process will exit when the job is completed. If you want to abort the job, you only need to exit the process that submitted the job. The job's runtime logs will be output to the standard output of the process that submitted the job."),(0,l.yg)("p",null,"Other operation and maintenance operations are not supported."))}d.isMDXComponent=!0}}]);