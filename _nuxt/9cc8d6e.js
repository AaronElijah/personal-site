(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{317:function(t,e,o){var content=o(345);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(40).default)("517dc4e3",content,!0,{sourceMap:!1})},344:function(t,e,o){"use strict";o(317)},345:function(t,e,o){var r=o(39)((function(i){return i[1]}));r.push([t.i,".title-box[data-v-1d3705f8]{--box-shadow-top:2rem;--box-shadow-right:-2rem;--box-shadow-bottom:-2rem;--box-shadow-left:2rem;box-shadow:var(--box-shadow-right) var(--box-shadow-bottom) #00ced1,var(--box-shadow-left) var(--box-shadow-top) #f08080}",""]),r.locals={},t.exports=r},347:function(t,e,o){"use strict";o.r(e);var r=o(8),n=(o(38),o(2).a.extend({name:"TitleCard",props:{viewportMousePosition:{type:Object,default:function(){return{x:0,y:0}}}},data:function(){return{heading:"",subheading:""}},fetch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var o,r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$content("home").fetch();case 2:o=e.sent,r=o.heading,n=o.subheading,t.heading=r,t.subheading=n;case 7:case"end":return e.stop()}}),e)})))()},watch:{viewportMousePosition:function(t){var e=document.querySelector("#title-card"),rect=e.getBoundingClientRect(),o=t.x-(rect.x+.5*rect.width),r=t.y-(rect.y+.5*rect.height),n=Math.atan(r/o);e.style.setProperty("--box-shadow-top","".concat(Math.abs(2*Math.sin(n)),"rem")),e.style.setProperty("--box-shadow-bottom","".concat(-Math.abs(2*Math.sin(n)),"rem")),e.style.setProperty("--box-shadow-left","".concat(Math.abs(2*Math.cos(n)),"rem")),e.style.setProperty("--box-shadow-right","".concat(-Math.abs(2*Math.cos(n)),"rem"))}}})),c=(o(344),o(30)),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"text-center border-[1rem] border-double border-blue-800 title-box",attrs:{id:"title-card"}},[o("h1",{staticClass:"text-8xl"},[t._v(t._s(t.heading))]),t._v(" "),o("h3",{staticClass:"text-4xl"},[t._v(t._s(t.subheading))])])}),[],!1,null,"1d3705f8",null);e.default=component.exports}}]);