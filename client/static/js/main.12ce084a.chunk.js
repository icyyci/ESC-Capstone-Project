(this["webpackJsonpadmin-dashboard-page"]=this["webpackJsonpadmin-dashboard-page"]||[]).push([[0],{104:function(e,t,a){e.exports=a(134)},109:function(e,t,a){},110:function(e,t,a){},134:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(8),r=a.n(l),i=(a(109),a(110),a(26)),c=a(46),s=a(47),u=a(55),m=a(57),d=(a(3),a(180)),p=a(192),h=a(170),g=a(178),f=a(187),E=a(184),C=a(185),w=a(186),k=a(181),v=a(182),b=a(36),O=a(183),S=a(54),y=a.n(S),G=a(82),N=a.n(G),P=a(83),x=a.n(P),I=a(84),A=a.n(I),j=a(85),D=a.n(j),q=(a(111),a(4)),B=a(188),M=a(34),W=a.n(M),z=a(86),F=a.n(z),J=a(191),T=a(174),L=a(179),R=a(176),U=a(177),$=a(175),H=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleClickOpen=function(){n.setState({dialogueOpen:!0})},n.handleClose=function(){n.setState({dialogueOpen:!1})},n.handleClickOpenPrivate=function(){n.setState({dialogueOpenPrivate:!0})},n.handleClosePrivate=function(){n.setState({dialogueOpenPrivate:!1})},n.toggleSidebar=function(){n.state.toggleSidebar=!n.state.toggleSidebar,1==n.state.toggleSidebar?n.setState({drawerIsOpen:!0}):n.setState({drawerIsOpen:!1})},n.registerGroup=function(){var e=n.state.groupNo+1;n.setState({listOfGroups:n.state.listOfGroups.concat(["Group "+e]),groupNo:e}),window.location=n.state.url+"/admin/registergroup"},n.unregisterGroup=function(){W.a.post(n.state.url+"/admin",{request:"unregister",group:"group30"}).then((function(e){n.setState({listOfGroups:e.data})}))},n.toggleContent=function(){n.setState({contentShow:!0})},n.displayData=function(e){console.log("sending request"),W.a.post(n.state.url+"/admin",{request:"data",group:e}).then((function(t){console.log(t.data),n.setState({data:JSON.stringify(t.data)}),n.setState({groupNoClicked:e}),n.setState({contentShow:!0})}))},n.allocateMap=function(){window.location=n.state.url+"/map"},n.listOfGroupOnclick=function(e){n.setState({groupIDClicked:e}),e=e.split(" ").join("").toLowerCase(),n.updateGrpNoClicked(e),n.displayData(e)},n.updateGrpNoClicked=function(e){n.setState({groupNoClicked:e})},n.handleAnnouncement=function(e){return function(t){n.setState(Object(i.a)({},e,t.target.value))}},n.post=function(){W.a.post(n.state.url+"/admin",{request:"announcement",message:n.state.announcement,group:"all"}).then((function(e){console.log(n.state.announcement)})),n.state.announcement="",n.handleClose()},n.startChat=function(){var e="";console.log(n.state.groupNoClicked),e="localhost:5000"==window.location.host?"http://"+window.location.host+"/chat/?chat="+n.state.groupNoClicked:"https://"+window.location.host+"/chat/?chat="+n.state.groupNoClicked,window.location=e},n.privateAnnouncement=function(){console.log(n.state.anouncement+" to "+n.state.groupIDClicked),W.a.post(n.state.url+"/admin",{request:"announcement",message:n.state.announcement,group:n.state.groupIDClicked}).then((function(e){})),n.state.announcement="",n.handleClosePrivate()},n.state={groupIDClicked:"",groupNoClicked:"",contentShow:!1,sidebarOpen:!1,listOfGroups:[],groupNo:2,data:[],url:"",dialogueOpen:!1,announcement:"",dialogueOpenPrivate:!1},n}return Object(s.a)(a,[{key:"render",value:function(){var e=this;"localhost:5000"==window.location.host?this.state.url="http://"+window.location.host:this.state.url="https://"+window.location.host,W.a.post(this.state.url+"/admin",{request:"firstload"}).then((function(t){console.log(t.data),e.state.listOfGroups=t.data}));var t=this.props.classes;if(this.state.contentShow)var a=o.a.createElement("div",null,this.state.data,o.a.createElement("div",null,o.a.createElement(h.a,{onClick:this.startChat},"Start Chat")),o.a.createElement("div",null,o.a.createElement(h.a,{onClick:this.handleClickOpenPrivate},"Private Announcement"),o.a.createElement(T.a,{open:this.state.dialogueOpenPrivate,onClose:this.handleClosePrivate,"aria-labelledby":"form-dialog-title"},o.a.createElement($.a,{id:"form-dialog-title"},"Announcement to ",this.state.groupIDClicked),o.a.createElement(R.a,null,o.a.createElement(U.a,null,"This is a private announcement"),o.a.createElement(J.a,{autoFocus:!0,margin:"dense",id:"name",label:"Message",fullWidth:!0,onChange:this.handleAnnouncement("announcement")})),o.a.createElement(L.a,null,o.a.createElement(h.a,{onClick:this.handleClosePrivate,color:"primary"},"Cancel"),o.a.createElement(h.a,{onClick:this.privateAnnouncement,color:"primary"},"Post")))));return o.a.createElement(d.a,null,o.a.createElement(o.a.Fragment,null,o.a.createElement(k.a,{position:"fixed",className:t.appBar},o.a.createElement(v.a,null,o.a.createElement(O.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu",onClick:this.toggleSidebar},o.a.createElement(y.a,null)),o.a.createElement(b.a,{variant:"h6",className:t.title},"AdminPage"))),o.a.createElement(p.a,{className:t.drawer,variant:"persistent",classes:{paper:t.drawerPaper},open:this.state.drawerIsOpen},o.a.createElement("div",{className:t.toolbar}),o.a.createElement(g.a,null,this.state.listOfGroups.map((function(t){return o.a.createElement(E.a,{button:!0,key:t,onClick:function(){e.listOfGroupOnclick(t)}},o.a.createElement(C.a,null,o.a.createElement(N.a,null)),o.a.createElement(w.a,{primary:t}))}))),o.a.createElement(f.a,null),o.a.createElement(g.a,null,["Allocate Map"].map((function(t){return o.a.createElement(E.a,{button:!0,key:t,onClick:e.allocateMap},o.a.createElement(C.a,null,o.a.createElement(x.a,null)),o.a.createElement(w.a,{primary:t}))}))),o.a.createElement(g.a,null,["Register Group"].map((function(t){return o.a.createElement(E.a,{button:!0,key:t,onClick:e.registerGroup},o.a.createElement(C.a,null,o.a.createElement(A.a,null)),o.a.createElement(w.a,{primary:t}))}))),o.a.createElement(g.a,null,["Unregister Group"].map((function(t){return o.a.createElement(E.a,{button:!0,key:t,onClick:e.unregisterGroup},o.a.createElement(C.a,null,o.a.createElement(D.a,null)),o.a.createElement(w.a,{primary:t}))}))),o.a.createElement(g.a,null,["Post Announcement"].map((function(t){return o.a.createElement(E.a,{button:!0,key:t,onClick:e.handleClickOpen},o.a.createElement(C.a,null,o.a.createElement(F.a,null)),o.a.createElement(w.a,{primary:t}))})),o.a.createElement(T.a,{open:this.state.dialogueOpen,onClose:this.handleClose,"aria-labelledby":"form-dialog-title"},o.a.createElement($.a,{id:"form-dialog-title"},"Public Announcement"),o.a.createElement(R.a,null,o.a.createElement(U.a,null,"This announcement will be showed to all students"),o.a.createElement(J.a,{autoFocus:!0,margin:"dense",id:"name",label:"Message",fullWidth:!0,onChange:this.handleAnnouncement("announcement")})),o.a.createElement(L.a,null,o.a.createElement(h.a,{onClick:this.handleClose,color:"primary"},"Cancel"),o.a.createElement(h.a,{onClick:this.post,color:"primary"},"Post"))))),o.a.createElement(B.a,{maxWidth:"sm"},o.a.createElement("div",{className:t.toolbar}),o.a.createElement(b.a,{component:"div",style:{backgroundColor:"#cfe8fc",height:"50vh"}},o.a.createElement(b.a,{paragraph:!0},a)))))}}]),a}(n.Component),K=Object(q.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},content:{flexGrow:1,padding:e.spacing(3)},toolbar:e.mixins.toolbar}}))(H),Q=a(48),V=a(87),X=(n.Component,a(89),a(90),a(189));a(190),a(41),a(42),Object(X.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},content:{flexGrow:1,padding:e.spacing(3)},toolbar:e.mixins.toolbar}}));var Y=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(K,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[104,1,2]]]);
//# sourceMappingURL=main.12ce084a.chunk.js.map