(this["webpackJsonprequest-form"]=this["webpackJsonprequest-form"]||[]).push([[0],{120:function(e,t,a){},121:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),l=a.n(o),c=(a(97),a(77)),s=a(29),i=a(30),u=a(32),p=a(33),h=a(156),m=a(150),d=a(46),f=a.n(d),y=a(154),E=a(152),v=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).continue=function(t){t.preventDefault(),e.props.nextStep()},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props,t=e.values,a=e.handleChange;return r.a.createElement(f.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{open:"true",fullWidth:"true",maxWidth:"sm"},r.a.createElement(m.a,null,"Enter Request Details"),r.a.createElement(y.a,{placeholder:"Enter the type of prototype",label:"Type of Prototype",onChange:a("typeOfPrototype"),defaultValue:t.typeOfPrototype,margin:"normal",fullWidth:"true"}),r.a.createElement("br",null),r.a.createElement(y.a,{placeholder:"Enter the required space for showcase",label:"length x wdith (m)",onChange:a("showcaseSpaceNeeded"),defaultValue:t.showcaseSpaceNeeded,margin:"normal",fullWidth:"true"}),r.a.createElement("br",null),r.a.createElement(y.a,{placeholder:"Enter the physical dimension of prototype",label:"length x width x height (m)",onChange:a("dimensionOfPrototype"),defaultValue:t.dimensionOfPrototype,margin:"normal",fullWidth:"true"}),r.a.createElement("br",null),r.a.createElement(y.a,{placeholder:"Enter the number of power points needed",label:"integer number e.g 3",onChange:a("noOfPowerPoints"),defaultValue:t.noOfPowerPoints,margin:"normal",fullWidth:"true"}),r.a.createElement("br",null),r.a.createElement(y.a,{placeholder:"Enter the type of pedastal needed",label:"tall/short",onChange:a("pedestals"),defaultValue:t.pedestals,margin:"normal",fullWidth:"true"}),r.a.createElement("br",null),r.a.createElement(y.a,{placeholder:"Please specify another other requests",label:"e.g extra tables/chairs",onChange:a("otherRequests"),defaultValue:t.otherRequests,margin:"normal",fullWidth:"true"}),r.a.createElement("br",null),r.a.createElement(E.a,{color:"primary",variant:"contained",onClick:this.continue},"Continue"))))}}]),a}(n.Component),w=a(151),b=a(153),g=a(157),O=a(81),P=a.n(O),C=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).continue=function(t){t.preventDefault(),console.log("submitting to server");var a="";a="localhost:5000"==window.location.host?"http://"+window.location.host:"https://"+window.location.host,P.a.post(a+"/user/request",e.props.values).then((function(e){console.log("submitted to server"),console.log(e.data)})).catch((function(e){throw e})),e.props.nextStep()},e.back=function(t){t.preventDefault(),e.props.prevStep()},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props.values,t=e.typeOfPrototype,a=e.showcaseSpaceNeeded,n=e.dimensionOfPrototype,o=e.noOfPowerPoints,l=e.pedestals,c=e.otherRequests;return r.a.createElement(f.a,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{open:"true",fullWidth:"true",maxWidth:"sm"},r.a.createElement(m.a,null,"Confirm"),r.a.createElement(w.a,null,r.a.createElement(b.a,null,r.a.createElement(g.a,{primary:"Type of prototype",secondary:t})),r.a.createElement(b.a,null,r.a.createElement(g.a,{primary:"Required space for showcase",secondary:a})),r.a.createElement(b.a,null,r.a.createElement(g.a,{primary:"Physical dimension of prototype",secondary:n})),r.a.createElement(b.a,null,r.a.createElement(g.a,{primary:"Required number of power points",secondary:o})),r.a.createElement(b.a,null,r.a.createElement(g.a,{primary:"Required number of pedestals",secondary:l})),r.a.createElement(b.a,null,r.a.createElement(g.a,{primary:"Other requests",secondary:c}))),r.a.createElement("br",null),r.a.createElement(E.a,{color:"primary",variant:"contained",onClick:this.continue},"Continue"),r.a.createElement(E.a,{color:"primary",variant:"contained",onClick:this.back},"Back"))))}}]),a}(n.Component),S=function(e){Object(p.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={step:1,typeOfPrototype:"",showcaseSpaceNeeded:"",dimensionOfPrototype:"",noOfPowerPoints:"",pedestals:"",otherRequests:""},e.nextStep=function(){var t=e.state.step;e.setState({step:t+1})},e.prevStep=function(){var t=e.state.step;e.setState({step:t-1})},e.handleChange=function(t){return function(a){e.setState(Object(c.a)({},t,a.target.value))}},e.buttonClick=function(){var e="";e="localhost:5000"==window.location.host?"http://"+window.location.host+"/user":"https://"+window.location.host+"/user",window.location=e},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state.step,t=this.state,a={typeOfPrototype:t.typeOfPrototype,showcaseSpaceNeeded:t.showcaseSpaceNeeded,dimensionOfPrototype:t.dimensionOfPrototype,noOfPowerPoints:t.noOfPowerPoints,pedestals:t.pedestals,otherRequests:t.otherRequests};switch(e){case 1:return r.a.createElement(v,{nextStep:this.nextStep,handleChange:this.handleChange,values:a});case 2:return r.a.createElement(C,{nextStep:this.nextStep,prevStep:this.prevStep,values:a});case 3:return r.a.createElement("div",null,r.a.createElement("h1",null,"Success"),r.a.createElement(E.a,{onClick:this.buttonClick},"Back To Home Page"))}}}]),a}(n.Component);a(120);var k=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},92:function(e,t,a){e.exports=a(121)},97:function(e,t,a){}},[[92,1,2]]]);
//# sourceMappingURL=main.46f15292.chunk.js.map