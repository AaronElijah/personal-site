(window.webpackJsonp=window.webpackJsonp||[]).push([[8,6,7],{303:function(t,e,n){var content=n(313);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("04c49c73",content,!0,{sourceMap:!1})},304:function(t,e,n){var content=n(315);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("3088b85e",content,!0,{sourceMap:!1})},306:function(t,e,n){"use strict";var o=n(14),c=n(1),l=n(3),r=n(112),d=n(21),h=n(15),y=n(211),f=n(51),v=n(111),m=n(212),k=n(5),w=n(83).f,x=n(46).f,_=n(19).f,C=n(311),E=n(214).trim,N="Number",P=c.Number,I=P.prototype,j=c.TypeError,S=l("".slice),O=l("".charCodeAt),M=function(t){var e=m(t,"number");return"bigint"==typeof e?e:V(e)},V=function(t){var e,n,o,c,l,r,d,code,h=m(t,"number");if(v(h))throw j("Cannot convert a Symbol value to a number");if("string"==typeof h&&h.length>2)if(h=E(h),43===(e=O(h,0))||45===e){if(88===(n=O(h,2))||120===n)return NaN}else if(48===e){switch(O(h,1)){case 66:case 98:o=2,c=49;break;case 79:case 111:o=8,c=55;break;default:return+h}for(r=(l=S(h,2)).length,d=0;d<r;d++)if((code=O(l,d))<48||code>c)return NaN;return parseInt(l,o)}return+h};if(r(N,!P(" 0o1")||!P("0b1")||P("+0x1"))){for(var A,T=function(t){var e=arguments.length<1?0:P(M(t)),n=this;return f(I,n)&&k((function(){C(n)}))?y(Object(e),n,T):e},F=o?w(P):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),G=0;F.length>G;G++)h(P,A=F[G])&&!h(T,A)&&_(T,A,x(P,A));T.prototype=I,I.constructor=T,d(c,N,T)}},307:function(t,e,n){"use strict";n.r(e);var o=n(2).a.extend({name:"PacmanCharacter"}),c=(n(312),n(30)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"h-full w-full bg-yellow-400 rounded-full"},[n("div",{staticClass:"w-[10%] h-[10%] rounded-full bg-black relative left-[55%] top-1/4"})]),t._v(" "),n("div",{staticClass:"pacman-mouth z-postbox"})])}],!1,null,"0d9859e0",null);e.default=component.exports},308:function(t,e,n){"use strict";n.r(e);var o=n(26),c=(n(57),n(22),n(2).a.component("GhostCharacter",{props:{name:{type:String,required:!0,validator:function(t){return["pinky","blinky","inky","clyde"].includes(t)}},isVulnerable:{type:Boolean,default:!1}},computed:{bodyClass:function(){var t;return this.isVulnerable?{vulnerable:!0,"ghost-base":!0}:(t={},Object(o.a)(t,this.name,!0),Object(o.a)(t,"ghost-base",!0),t)},tailClass:function(){var t;return this.isVulnerable?{vulnerable:!0,tail:!0,"h-[10%]":!0}:(t={},Object(o.a)(t,this.name,!0),Object(o.a)(t,"tail",!0),Object(o.a)(t,"h-[10%]",!0),t)}}})),l=(n(314),n(30)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-40 h-40"},[n("div",{class:t.bodyClass},[n("div",{staticClass:"w-3/4 h-1/2 flex justify-around items-center"},[t.isVulnerable?n("div",{staticClass:"w-1/4 aspect-h-1 aspect-w-4 bg-yellow-500 rounded-full"}):n("div",{staticClass:"w-1/3 h-5/6 rounded-3xl bg-white flex flex-col justify-end items-center"},[n("div",{staticClass:"w-1/2 h-1/3 bg-blue-700 rounded-full"})]),t._v(" "),t.isVulnerable?n("div",{staticClass:"w-1/4 aspect-h-1 aspect-w-4 bg-yellow-500 rounded-full"}):n("div",{staticClass:"w-1/3 h-5/6 rounded-3xl bg-white flex flex-col justify-end items-center"},[n("div",{staticClass:"w-1/2 h-1/3 bg-blue-700 rounded-full"})])]),t._v(" "),t.isVulnerable?n("div",{staticClass:"mouth w-1/2 h-[10%]"}):t._e()]),t._v(" "),n("div",{class:t.tailClass})])}),[],!1,null,"897cc6c6",null);e.default=component.exports},311:function(t,e,n){var o=n(3);t.exports=o(1..valueOf)},312:function(t,e,n){"use strict";n(303)},313:function(t,e,n){var o=n(39)((function(i){return i[1]}));o.push([t.i,".container[data-v-0d9859e0]{width:10rem;height:10rem;background-color:inherit}.pacman-mouth[data-v-0d9859e0]{background-color:inherit;height:100%;width:100%;top:-90%;position:relative;-webkit-clip-path:polygon(110% 10%,50% 40%,110% 70%);clip-path:polygon(110% 10%,50% 40%,110% 70%);-webkit-animation-name:eat-data-v-0d9859e0;animation-name:eat-data-v-0d9859e0;-webkit-animation-duration:.7s;animation-duration:.7s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}@-webkit-keyframes eat-data-v-0d9859e0{0%{-webkit-clip-path:polygon(110% 40%,50% 40%,110% 40%);clip-path:polygon(110% 40%,50% 40%,110% 40%)}50%{-webkit-clip-path:polygon(110% 10%,50% 40%,110% 70%);clip-path:polygon(110% 10%,50% 40%,110% 70%)}to{-webkit-clip-path:polygon(110% 40%,50% 40%,110% 40%);clip-path:polygon(110% 40%,50% 40%,110% 40%)}}@keyframes eat-data-v-0d9859e0{0%{-webkit-clip-path:polygon(110% 40%,50% 40%,110% 40%);clip-path:polygon(110% 40%,50% 40%,110% 40%)}50%{-webkit-clip-path:polygon(110% 10%,50% 40%,110% 70%);clip-path:polygon(110% 10%,50% 40%,110% 70%)}to{-webkit-clip-path:polygon(110% 40%,50% 40%,110% 40%);clip-path:polygon(110% 40%,50% 40%,110% 40%)}}",""]),o.locals={},t.exports=o},314:function(t,e,n){"use strict";n(304)},315:function(t,e,n){var o=n(39)((function(i){return i[1]}));o.push([t.i,".ghost-base[data-v-897cc6c6]{display:flex;height:90%;flex-direction:column;align-items:center;justify-content:center;border-top-left-radius:9999px;border-top-right-radius:9999px}.pinky[data-v-897cc6c6]{background-color:#ff69b4}.blinky[data-v-897cc6c6]{background-color:#dc143c}.inky[data-v-897cc6c6]{background-color:#0ff}.clyde[data-v-897cc6c6]{background-color:#ff8c00}.vulnerable[data-v-897cc6c6]{--tw-bg-opacity:1;background-color:rgba(30, 64, 175, var(--tw-bg-opacity))}.tail[data-v-897cc6c6]{-webkit-clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0);clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0);-webkit-animation:move-tail-data-v-897cc6c6 .7s steps(3,jump-both) 0s infinite normal;animation:move-tail-data-v-897cc6c6 .7s steps(3,jump-both) 0s infinite normal}@-webkit-keyframes move-tail-data-v-897cc6c6{0%{-webkit-clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0);clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0)}50%{-webkit-clip-path:polygon(0 0,10% 100%,20% 0,30% 100%,40% 0,50% 100%,60% 0,70% 100%,80% 0,90% 100%,100% 0);clip-path:polygon(0 0,10% 100%,20% 0,30% 100%,40% 0,50% 100%,60% 0,70% 100%,80% 0,90% 100%,100% 0)}to{-webkit-clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0);clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0)}}@keyframes move-tail-data-v-897cc6c6{0%{-webkit-clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0);clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0)}50%{-webkit-clip-path:polygon(0 0,10% 100%,20% 0,30% 100%,40% 0,50% 100%,60% 0,70% 100%,80% 0,90% 100%,100% 0);clip-path:polygon(0 0,10% 100%,20% 0,30% 100%,40% 0,50% 100%,60% 0,70% 100%,80% 0,90% 100%,100% 0)}to{-webkit-clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0);clip-path:polygon(0 0,0 100%,10% 0,20% 100%,30% 0,40% 100%,50% 0,60% 100%,70% 0,80% 100%,90% 0,100% 100%,100% 0)}}.mouth[data-v-897cc6c6]{--tw-bg-opacity:1;background-color:rgba(245, 158, 11, var(--tw-bg-opacity));-webkit-clip-path:polygon(0 80%,17% 0,34% 80%,51% 0,68% 80%,85% 0,100% 80%,100% 100%,85% 20%,68% 100%,51% 20%,34% 100%,17% 20%,0 100%);clip-path:polygon(0 80%,17% 0,34% 80%,51% 0,68% 80%,85% 0,100% 80%,100% 100%,85% 20%,68% 100%,51% 20%,34% 100%,17% 20%,0 100%)}",""]),o.locals={},t.exports=o},316:function(t,e,n){var content=n(343);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(40).default)("e3f44b50",content,!0,{sourceMap:!1})},342:function(t,e,n){"use strict";n(316)},343:function(t,e,n){var o=n(39)((function(i){return i[1]}));o.push([t.i,"div{background-color:inherit}",""]),o.locals={},t.exports=o},346:function(t,e,n){"use strict";n.r(e);n(306),n(43);var o=n(307),c=n(308),l={pacman:{x:5,y:5},pinky:{x:-30,y:5},blinky:{x:-60,y:5},inky:{x:-90,y:5},clyde:{x:-120,y:5}},r={pacman:{x:203,y:5},pinky:{x:218,y:5},blinky:{x:188,y:5},inky:{x:158,y:5},clyde:{x:128,y:5}},d={pacman:{x:280,y:75},pinky:{x:220,y:75},blinky:{x:190,y:75},inky:{x:160,y:75},clyde:{x:130,y:75}},h={name:"ScrollPacman",components:{PacmanCharacter:o.default,GhostCharacter:c.default},props:{wheelMovement:{type:Number,default:0}},data:function(){return{animationStep:0,characterPositions:l,isEating:!1}},watch:{wheelMovement:function(t){var e=this,n=Object.keys(e.characterPositions),o=t<0,c=-1*(2*+o-1);if(!(o&&e.animationStep<=0)){for(var l=0,r=n;l<r.length;l++){var d=r[l];e.characterPositions[d].x+=e.animationStep<50?"pacman"===d?2*c:2.5*c:"pacman"===d?2.5*-c:2*-c}e.animationStep+=.5*c}},animationStep:function(t,e){var n=this;t>50&&e<=50?(n.characterPositions=d,n.isEating=!0):t<50&&e>=50&&(n.characterPositions=r,n.isEating=!1)}}},y=(n(342),n(30)),component=Object(y.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"h-screen w-full bg-inherit overflow-hidden py-4 pl-4 flex justify-center items-center",on:{wheel:function(t){t.preventDefault()}}},[n("ghost-character",{staticClass:"absolute",style:{left:t.characterPositions.pinky.x+"%",top:t.characterPositions.clyde.y+"%"},attrs:{id:"pinky",name:"pinky","is-vulnerable":t.isEating}}),t._v(" "),n("ghost-character",{staticClass:"absolute",style:{left:t.characterPositions.blinky.x+"%",top:t.characterPositions.clyde.y+"%"},attrs:{id:"blinky",name:"blinky","is-vulnerable":t.isEating}}),t._v(" "),n("ghost-character",{staticClass:"absolute",style:{left:t.characterPositions.inky.x+"%",top:t.characterPositions.clyde.y+"%"},attrs:{id:"inky",name:"inky","is-vulnerable":t.isEating}}),t._v(" "),n("ghost-character",{staticClass:"absolute",style:{left:t.characterPositions.clyde.x+"%",top:t.characterPositions.clyde.y+"%"},attrs:{id:"clyde",name:"clyde","is-vulnerable":t.isEating}}),t._v(" "),n("pacman-character",{class:"absolute "+(t.isEating?"scale-x-[-1]":""),style:{left:t.characterPositions.pacman.x+"%",top:t.characterPositions.clyde.y+"%"},attrs:{id:"pacman"}}),t._v(" "),t._t("default")],2)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{GhostCharacter:n(308).default,PacmanCharacter:n(307).default})}}]);