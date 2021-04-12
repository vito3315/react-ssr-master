!function(){"use strict";var t={90:function(t,e,n){var r=n(7294),o=n(3935),c=n(3727),i=n(4575),a=n.n(i),s=n(3913),u=n.n(s),l=n(2205),f=n.n(l),p=n(8585),d=n.n(p),m=n(9754),h=n.n(m),_=n(5977),v=n(1506),y=n.n(v);var g=function(t){f()(c,t);var e,n,o=(e=c,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,r=h()(e);if(n){var o=h()(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return d()(this,t)});function c(){var t;return a()(this,c),console.log("Counter.constructor()"),(t=o.call(this)).increment=t.increment.bind(y()(t)),t.state={count:0},t}return u()(c,[{key:"increment",value:function(){console.log("Counter.increment()"),this.setState({count:this.state.count+1})}},{key:"render",value:function(){var t=this;return console.log("Counter.render()"),r.createElement("div",{className:"ui-counter"},r.createElement("p",{className:"ui-counter__title"},"Counter Widget"),r.createElement("div",{className:"ui-counter__body"},r.createElement("p",{className:"ui-counter__body__name"},this.props.name),r.createElement("p",{className:"ui-counter__body__count"},this.state.count),r.createElement("button",{className:"ui-counter__body__button",onClick:function(){return t.increment()},disabled:3===this.state.count},"Increment")))}}]),c}(r.Component),b=n(9669),E=n.n(b);var x=function(t){f()(c,t);var e,n,o=(e=c,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,r=h()(e);if(n){var o=h()(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return d()(this,t)});function c(t){var e;return a()(this,c),console.log("Post.constructor()"),e=o.call(this),t.staticContext?e.state={isLoading:!1,title:t.staticContext.title,description:t.staticContext.body}:window.initial_state?e.state={isLoading:!1,title:window.initial_state.title,description:window.initial_state.body}:e.state={isLoading:!0,title:"",description:""},e}return u()(c,[{key:"componentDidMount",value:function(){var t=this;this.state.isLoading&&(console.log("Post.componentDidMount()"),c.fetchData().then((function(e){t.setState({isLoading:!1,title:e.title,description:e.body})})))}},{key:"render",value:function(){return console.log("Post.render()"),r.createElement("div",{className:"ui-post"},r.createElement("p",{className:"ui-post__title"},"Post Widget"),this.state.isLoading?"loading...":r.createElement("div",{className:"ui-post__body"},r.createElement("p",{className:"ui-post__body__title"},this.state.title),r.createElement("p",{className:"ui-post__body__description"},this.state.description)))}}],[{key:"fetchData",value:function(){return console.log("Post.fetchData()"),E().get("https://jsonplaceholder.typicode.com/posts/3").then((function(t){return{title:t.data.title,body:t.data.body}}))}}]),c}(r.Component);var N=function(t){f()(i,t);var e,n,o=(e=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,r=h()(e);if(n){var o=h()(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return d()(this,t)});function i(){return a()(this,i),console.log("App.constructor()"),o.call(this)}return u()(i,[{key:"render",value:function(){return console.log("App.render()"),r.createElement("div",{className:"ui-app"},r.createElement("div",{className:"ui-app__navigation"},r.createElement(c.OL,{className:"ui-app__navigation__link",activeClassName:"ui-app__navigation__link--active",to:"/",exact:!0},"Counter"),r.createElement(c.OL,{className:"ui-app__navigation__link",activeClassName:"ui-app__navigation__link--active",to:"/post",exact:!0},"Post")),r.createElement(_.rs,null,r.createElement(_.AW,{path:"/",exact:!0,render:function(){return r.createElement(g,{name:"Monica Geller"})}}),r.createElement(_.AW,{path:"/post",exact:!0,component:x})))}}]),i}(r.Component);o.hydrate(r.createElement(c.VK,null,r.createElement(N,null)),document.getElementById("app"))}},e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}n.m=t,n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={179:0},e=[[90,736]],r=function(){};function o(){for(var r,o=0;o<e.length;o++){for(var c=e[o],i=!0,a=1;a<c.length;a++){var s=c[a];0!==t[s]&&(i=!1)}i&&(e.splice(o--,1),r=n(n.s=c[0]))}return 0===e.length&&(n.x(),n.x=function(){}),r}n.x=function(){n.x=function(){},i=i.slice();for(var t=0;t<i.length;t++)c(i[t]);return(r=o)()};var c=function(o){for(var c,i,s=o[0],u=o[1],l=o[2],f=o[3],p=0,d=[];p<s.length;p++)i=s[p],n.o(t,i)&&t[i]&&d.push(t[i][0]),t[i]=0;for(c in u)n.o(u,c)&&(n.m[c]=u[c]);for(l&&l(n),a(o);d.length;)d.shift()();return f&&e.push.apply(e,f),r()},i=self.webpackChunkreact_ssr=self.webpackChunkreact_ssr||[],a=i.push.bind(i);i.push=c}(),n.x()}();
//# sourceMappingURL=main.js.map