(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{455:function(e,t,n){"use strict";n.r(t);var r=n(26),o=n(27),c=n(8),l=(n(38),n(57),n(76),n(349),n(225),n(300)),d=n(2);n(72);var f="".concat("/personal-site/","images"),m="basecolor.jpg",h="ambientOcclusion.jpg",v="roughness.jpg",y="height.png",w="normal.jpg",j="crystal_metal",O="damascus_steel",x="green_crystal",k="lava",A="lapis_lazuli",S={profile:"".concat(f,"/profile.jpg"),earth:{basecolor:"".concat(f,"/earth/").concat(m),bump:"".concat(f,"/earth/").concat("bump.jpg"),specular:"".concat(f,"/earth/specular.jpg"),clouds:{basecolor:"".concat(f,"/earth/clouds/").concat(m),transparency:"".concat(f,"/earth/clouds/transparency.jpg")}},sun:"".concat(f,"/8k_sun.jpg"),neptune:"".concat(f,"/2k_neptune.jpg"),jupiter:"".concat(f,"/8k_jupiter.jpg"),mars:{basecolor:"".concat(f,"/8k_mars.jpg"),normal:"".concat(f,"/12k_mars_normal.jpg")},interstellarSpace:"".concat(f,"/large_space.jpg"),nebulaSpace:"".concat(f,"/equirectangular_space.jpeg"),crystalMetal:{basecolor:"".concat(f,"/").concat(j,"/").concat(m),ao:"".concat(f,"/").concat(j,"/").concat(h),roughness:"".concat(f,"/").concat(j,"/").concat(v),displacement:"".concat(f,"/").concat(j,"/").concat(y),normal:"".concat(f,"/").concat(j,"/").concat(w)},damascusSteel:{basecolor:"".concat(f,"/").concat(O,"/").concat(m),ao:"".concat(f,"/").concat(O,"/").concat(h),roughness:"".concat(f,"/").concat(O,"/").concat(v),displacement:"".concat(f,"/").concat(O,"/").concat(y),normal:"".concat(f,"/").concat(O,"/").concat(w),metal:"".concat(f,"/").concat(O,"/").concat("metallic.jpg")},greenCrystal:{basecolor:"".concat(f,"/").concat(x,"/").concat(m),ao:"".concat(f,"/").concat(x,"/").concat(h),roughness:"".concat(f,"/").concat(x,"/").concat(v),displacement:"".concat(f,"/").concat(x,"/").concat(y),normal:"".concat(f,"/").concat(x,"/").concat(w)},lava:{basecolor:"".concat(f,"/").concat(k,"/").concat(m),ao:"".concat(f,"/").concat(k,"/").concat(h),roughness:"".concat(f,"/").concat(k,"/").concat(v),displacement:"".concat(f,"/").concat(k,"/").concat(y),normal:"".concat(f,"/").concat(k,"/").concat(w)},lapisLazuli:{basecolor:"".concat(f,"/").concat(A,"/").concat(m),ao:"".concat(f,"/").concat(A,"/").concat(h),roughness:"".concat(f,"/").concat(A,"/").concat(v),displacement:"".concat(f,"/").concat(A,"/").concat(y),normal:"".concat(f,"/").concat(A,"/").concat(w)}};function M(e){return function(t){if("undefined"==typeof window)throw new TypeError("Must execute code client side only");return e.call(this,t)}}M(function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(new l.qb).loadAsync(S.interstellarSpace);case 2:return n=e.sent,t.background=n,e.abrupt("return",[t]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var L=M(function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(t){var n,r,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new l.kb(500,60,40)).scale(-1,1,1),e.next=4,(new l.qb).loadAsync(S.nebulaSpace);case 4:return r=e.sent,o=new l.K({map:r}),c=new l.J(n,o),t.add(c),e.abrupt("return",[t]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),R=n(93),_=M(function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(t){var n,r,o,c,d,f,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.scene,o=t.largeBody,c=t.options.position,f=new l.qb,e.t0=o,e.next="mars"===e.t0?5:"sun"===e.t0?18:"jupiter"===e.t0?28:"neptune"===e.t0?38:"earth"===e.t0?48:77;break;case 5:return e.t1=l.J,e.t2=new l.kb(10,64,64),e.t3=l.N,e.next=10,f.loadAsync(S.mars.basecolor);case 10:return e.t4=e.sent,e.next=13,f.loadAsync(S.mars.normal);case 13:return e.t5=e.sent,e.t6={map:e.t4,normalMap:e.t5,roughness:2},e.t7=new e.t3(e.t6),d=new e.t1(e.t2,e.t7),e.abrupt("break",78);case 18:return e.t8=l.J,e.t9=new l.kb(40,64,64),e.t10=l.N,e.next=23,f.loadAsync(S.sun);case 23:return e.t11=e.sent,e.t12={map:e.t11},e.t13=new e.t10(e.t12),d=new e.t8(e.t9,e.t13),e.abrupt("break",78);case 28:return e.t14=l.J,e.t15=new l.kb(25,64,64),e.t16=l.N,e.next=33,f.loadAsync(S.jupiter);case 33:return e.t17=e.sent,e.t18={map:e.t17},e.t19=new e.t16(e.t18),d=new e.t14(e.t15,e.t19),e.abrupt("break",78);case 38:return e.t20=l.J,e.t21=new l.kb(15,64,64),e.t22=l.N,e.next=43,f.loadAsync(S.neptune);case 43:return e.t23=e.sent,e.t24={map:e.t23},e.t25=new e.t22(e.t24),d=new e.t20(e.t21,e.t25),e.abrupt("break",78);case 48:return e.t26=l.J,e.t27=new l.kb(10,64,64),e.t28=l.L,e.next=53,f.loadAsync(S.earth.basecolor);case 53:return e.t29=e.sent,e.next=56,f.loadAsync(S.earth.bump);case 56:return e.t30=e.sent,e.next=59,f.loadAsync(S.earth.specular);case 59:return e.t31=e.sent,e.t32={map:e.t29,bumpMap:e.t30,specularMap:e.t31},e.t33=new e.t28(e.t32),d=new e.t26(e.t27,e.t33),e.t34=l.J,e.t35=new l.kb(10.2,64,64),e.t36=l.L,e.next=68,f.loadAsync(S.earth.clouds.basecolor);case 68:return e.t37=e.sent,e.next=71,f.loadAsync(S.earth.clouds.transparency);case 71:return e.t38=e.sent,e.t39={map:e.t37,alphaMap:e.t38,transparent:!0},e.t40=new e.t36(e.t39),m=new e.t34(e.t35,e.t40),d.add(m),e.abrupt("break",78);case 77:throw new Error("No large body with name, ".concat(o));case 78:return(n=d.position).set.apply(n,Object(R.a)(c)),r.add(d),e.abrupt("return",[d,r]);case 81:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),P=M(function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=l.J,e.t1=new l.e(5,5,5),e.t2=l.N,e.next=5,(new l.qb).loadAsync(S.profile);case 5:return e.t3=e.sent,e.t4={map:e.t3},e.t5=new e.t2(e.t4),n=new e.t0(e.t1,e.t5),t.add(n),e.abrupt("return",t);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());n(52),n(341);function T(){return z.apply(this,arguments)}function z(){return(z=Object(c.a)(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=new l.qb,n=Math.random(),r={},!(n<.25)){e.next=22;break}return e.next=6,t.loadAsync(S.crystalMetal.basecolor);case 6:return e.t0=e.sent,e.next=9,t.loadAsync(S.crystalMetal.ao);case 9:return e.t1=e.sent,e.next=12,t.loadAsync(S.crystalMetal.roughness);case 12:return e.t2=e.sent,e.next=15,t.loadAsync(S.crystalMetal.displacement);case 15:return e.t3=e.sent,e.next=18,t.loadAsync(S.crystalMetal.normal);case 18:e.t4=e.sent,r={map:e.t0,aoMap:e.t1,roughnessMap:e.t2,displacementMap:e.t3,normalMap:e.t4},e.next=76;break;case 22:if(!(n<.5)){e.next=41;break}return e.next=25,t.loadAsync(S.lava.basecolor);case 25:return e.t5=e.sent,e.next=28,t.loadAsync(S.lava.ao);case 28:return e.t6=e.sent,e.next=31,t.loadAsync(S.lava.roughness);case 31:return e.t7=e.sent,e.next=34,t.loadAsync(S.lava.displacement);case 34:return e.t8=e.sent,e.next=37,t.loadAsync(S.lava.normal);case 37:e.t9=e.sent,r={map:e.t5,aoMap:e.t6,roughnessMap:e.t7,displacementMap:e.t8,normalMap:e.t9},e.next=76;break;case 41:if(!(n<.75)){e.next=60;break}return e.next=44,t.loadAsync(S.greenCrystal.basecolor);case 44:return e.t10=e.sent,e.next=47,t.loadAsync(S.greenCrystal.ao);case 47:return e.t11=e.sent,e.next=50,t.loadAsync(S.greenCrystal.roughness);case 50:return e.t12=e.sent,e.next=53,t.loadAsync(S.greenCrystal.displacement);case 53:return e.t13=e.sent,e.next=56,t.loadAsync(S.greenCrystal.normal);case 56:e.t14=e.sent,r={map:e.t10,aoMap:e.t11,roughnessMap:e.t12,displacementMap:e.t13,normalMap:e.t14},e.next=76;break;case 60:return e.next=62,t.loadAsync(S.lapisLazuli.basecolor);case 62:return e.t15=e.sent,e.next=65,t.loadAsync(S.lapisLazuli.ao);case 65:return e.t16=e.sent,e.next=68,t.loadAsync(S.lapisLazuli.roughness);case 68:return e.t17=e.sent,e.next=71,t.loadAsync(S.lapisLazuli.displacement);case 71:return e.t18=e.sent,e.next=74,t.loadAsync(S.lapisLazuli.normal);case 74:e.t19=e.sent,r={map:e.t15,aoMap:e.t16,roughnessMap:e.t17,displacementMap:e.t18,normalMap:e.t19};case 76:return e.abrupt("return",new l.N(r));case 77:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E,J,Q=[-1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1],D=[2,1,0,0,3,2,0,4,7,7,3,0,0,1,5,5,4,0,1,2,6,6,5,1,2,3,7,7,6,2,4,5,6,6,7,4],U=M((function(){var e,t,n=(e=.9,t=1,Math.random()*(t-e)+e),r=Q.map((function(e){return n*e})).map((function(e){return e*(2*Math.random()-1+1)}));return new l.ab(r,D,1,2)})),W=M(function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(t){var n,r,c,d,f,m,h,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=U(),e.next=3,T();case 3:return r=e.sent,c=new l.J(n,r),d=Array(3).fill(0).map((function(){return l.H.randFloatSpread(100)})),f=Object(o.a)(d,3),m=f[0],h=f[1],v=f[2],c.position.set(m,h,v),t.add(c),e.abrupt("return",[c,t]);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C=n(443),F="".concat("/personal-site/","gltf");!function(e){e.StarDestroyer="starDestroyer",e.ApolloModule="apolloModule",e.ISS="internationalSpaceStation",e.JamesWebbTelescope="jamesWebbTelescope"}(J||(J={}));var I=(E={},Object(r.a)(E,J.StarDestroyer,{sceneURL:"".concat(F,"/").concat(J.StarDestroyer,"/scene.gltf")}),Object(r.a)(E,J.ApolloModule,{sceneURL:"".concat(F,"/").concat(J.ApolloModule,"/scene.gltf")}),Object(r.a)(E,J.ISS,{sceneURL:"".concat(F,"/").concat(J.ISS,"/scene.gltf")}),Object(r.a)(E,J.JamesWebbTelescope,{sceneURL:"".concat(F,"/").concat(J.JamesWebbTelescope,"/scene.gltf")}),E),N=function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(option){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new l.E,n=I[option].sceneURL,t.setURLModifier((function(e){return e})),e.next=5,new C.a(t).loadAsync(n);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=M(function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(t){var n,r,o,c,l,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.scene,c=t.model,l=t.options,e.next=3,N(c);case 3:return d=e.sent,(null==l?void 0:l.scale)&&(n=d.scene.scale).set.apply(n,Object(R.a)(l.scale)),(null==l?void 0:l.position)&&(r=d.scene.position).set.apply(r,Object(R.a)(l.position)),o.add(d.scene),e.abrupt("return",[d,o]);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),H=M((function(e){var t,n=e.scene,r=e.options,o=r.position,c=r.color,d=void 0===c?16248773:c,f=new l.W(d);(t=f.position).set.apply(t,Object(R.a)(o));var m=new l.X(f);return n.add(f),n.add(m),[n,f,m]})),X=M((function(e){var t=e.scene,n=e.options,r=(n=void 0===n?{}:n).color,o=void 0===r?16248773:r,c=new l.a(o,.25);return t.add(c),[t,c]})),$=n(143),Z=n(144);n(446);var K=function(){function e(t){var n=this,r=t.camera,o=t.position,c=t.quaternion,d=t.defaultLookat,f=t.defaultOffset,m=t.lerpAlpha,h=void 0===m?.1:m;Object($.a)(this,e),this.targetQuaternion=new l.cb,this.onTargetUpdate=function(e){n.targetPosition.equals(e.position)||(n.targetPosition=e.position.clone()),n.targetQuaternion.equals(e.quaternion)||(n.targetQuaternion=(new l.cb).setFromEuler(e.rotation))},this.camera=r,this.defaultLookat=d,this.defaultOffset=f,this.lerpAlpha=h,this.targetPosition=o.clone(),this.targetPosition.add(f),this.targetQuaternion=c.clone()}return Object(Z.a)(e,[{key:"calculateIdealOffset",value:function(){var e=this.defaultOffset.clone();return e.applyQuaternion(this.targetQuaternion),e.add(this.targetPosition),e}},{key:"calculateIdealLookat",value:function(){var e=this.defaultLookat.clone();return e.applyQuaternion(this.targetQuaternion),e.add(this.targetPosition),e}},{key:"update",value:function(){var e=this,t=this.calculateIdealOffset(),n=this.calculateIdealLookat();this.camera.position.lerp(t,this.lerpAlpha);var r,o=((r=e.camera.clone()).lookAt(n),r.quaternion);this.camera.quaternion.slerp(o,.1)}},{key:"changeDefaults",value:function(e){var t=e.defaultLookat,n=e.defaultOffset;t&&(this.defaultLookat=t),n&&(this.defaultOffset=n)}}]),e}();n(43),n(32),n(61),n(62),n(322),n(10),n(20),n(323),n(324),n(325),n(326),n(327),n(328),n(329),n(330),n(331),n(332),n(333),n(334),n(335),n(23),n(35),n(44),n(45);function V(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function Y(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?V(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):V(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var G,ee,te,ne=function(){function e(object,t,n){var r=this;Object($.a)(this,e),this.observerActions=[],this.object=object,this.controlStates=new Map,Array.from(t).forEach((function(e){r.controlStates.set(e[0],{isToggled:!1,action:e[1]})})),n&&Array.prototype.push.apply(this.observerActions,n)}return Object(Z.a)(e,[{key:"toggleControl",value:function(e,t){var n=this.controlStates.get(e);void 0!==n&&this.controlStates.set(e,Y(Y({},n),{},{isToggled:null!=t?t:!n.isToggled}))}},{key:"addObserver",value:function(e){this.observerActions.push(e)}},{key:"removeObserver",value:function(e){this.observerActions&&(this.observerActions=this.observerActions.filter((function(t){return t.id!==e})))}},{key:"update",value:function(){var e=this;this.controlStates.forEach((function(t){t.isToggled&&t.action(e.object)})),this.observerActions.forEach((function(t){(0,t.action)(e.object)}))}}]),e}(),ae=new Map([["ArrowDown",function(e){var t=new l.cb(.01,0,0,1).normalize();e.quaternion.multiply(t),e.rotation.setFromQuaternion(e.quaternion,e.rotation.order)}],["ArrowUp",function(e){var t=new l.cb(-.01,0,0,1).normalize();e.quaternion.multiply(t),e.rotation.setFromQuaternion(e.quaternion,e.rotation.order)}],["ArrowLeft",function(e){var t=new l.cb(0,0,-.01,1).normalize();e.quaternion.multiply(t),e.rotation.setFromQuaternion(e.quaternion,e.rotation.order)}],["ArrowRight",function(e){var t=new l.cb(0,0,.01,1).normalize();e.quaternion.multiply(t),e.rotation.setFromQuaternion(e.quaternion,e.rotation.order)}],["q",function(e){var t=new l.cb(0,.01,0,1).normalize();e.quaternion.multiply(t),e.rotation.setFromQuaternion(e.quaternion,e.rotation.order)}],["e",function(e){var t=new l.cb(0,-.01,0,1).normalize();e.quaternion.multiply(t),e.rotation.setFromQuaternion(e.quaternion,e.rotation.order)}],["w",function(e){e.translateZ(.25)}],["s",function(e){e.translateZ(-.25)}],["a",function(e){e.translateX(.25)}],["d",function(e){e.translateX(-.25)}]]),re=function(){function e(t,n,r){Object($.a)(this,e),this.observers=[],this.scene=t,this.handleUpdate=n,r&&(this.observers=r)}return Object(Z.a)(e,[{key:"addObserver",value:function(e){this.observers.push(e)}},{key:"removeObserver",value:function(e){this.observers&&(this.observers=this.observers.filter((function(t){return t.id!==e})))}},{key:"update",value:function(){var e=this;this.handleUpdate(this.scene),this.observers.forEach((function(t){(0,t.action)(e.scene)}))}}]),e}();!function(e){e.travel="travel",e.reading="reading"}(G||(G={})),function(e){e.click="click"}(ee||(ee={})),function(e){e.commandModule="commandModule",e.internationalSpaceStation="internationalSpaceStation",e.jamesWebbTelescope="jamesWebbTelescope"}(te||(te={}));var oe=d.a.extend({name:"SpacePage",data:function(){var data={page:null,focusedObject:null,playState:G.travel};return data},watch:{focusedObject:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!Object.values(te).includes(e.focusedObject)){t.next=6;break}return t.next=3,e.$content(e.focusedObject).fetch();case 3:e.page=t.sent,t.next=7;break;case 6:e.page=null;case 7:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var n,c,d,f,m,i,h,v,y,w,j,O,x,k,A,S,M,R,T,z,E,Q,D,U,C,F,I,N,$,Z,V,Y,oe,ce,se,ie,ue,le,pe,animate;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return animate=function(){requestAnimationFrame(animate),ue.update(),ie.update();for(var e=0,t=Object.values(ce);e<t.length;e++){t[e].update()}y.rotation.y+=.001,A.rotation.y-=.001,O.rotation.y-=5e-4,R.rotation.y+=1e-4,E.rotation.y+=.005;for(var n=0;n<f.length;n++){var r=f[n];r.rotation.x+=.005,r.rotation.y+=.005,r.rotation.z+=.005}d.render(c,se)},c=new l.gb,(d=new l.wb({canvas:document.querySelector("#space-bg"),antialias:!0})).setPixelRatio(window.devicePixelRatio),d.setSize(window.innerWidth,window.innerHeight),H({scene:c,options:{position:[10,10,10]}}),H({scene:c,options:{position:[-10,-10,-10]}}),X({scene:c}),t.next=10,L(c);case 10:f=[],m=10,i=0;case 13:if(!(i<m)){t.next=22;break}return t.t0=f,t.next=17,W(c);case 17:t.t1=t.sent[0],t.t0.push.call(t.t0,t.t1);case 19:i++,t.next=13;break;case 22:return t.next=24,P(c);case 24:return t.next=26,_({scene:c,largeBody:"mars",options:{position:[-20,0,50]}});case 26:return h=t.sent,v=Object(o.a)(h,1),y=v[0],t.next=31,_({scene:c,largeBody:"jupiter",options:{position:[100,0,100]}});case 31:return w=t.sent,j=Object(o.a)(w,1),O=j[0],t.next=36,_({scene:c,largeBody:"neptune",options:{position:[30,0,-40]}});case 36:return x=t.sent,k=Object(o.a)(x,1),A=k[0],t.next=41,_({scene:c,largeBody:"sun",options:{position:[-60,0,-70]}});case 41:return S=t.sent,M=Object(o.a)(S,1),R=M[0],t.next=46,_({scene:c,largeBody:"earth",options:{position:[25,0,25]}});case 46:return T=t.sent,z=Object(o.a)(T,1),E=z[0],t.next=51,B({scene:c,model:J.StarDestroyer,options:{position:[5,5,0]}});case 51:return Q=t.sent,D=Object(o.a)(Q,1),U=D[0],t.next=56,B({scene:c,model:J.ApolloModule,options:{position:[-50,50,50],scale:[.01,.01,.01]}});case 56:return C=t.sent,F=Object(o.a)(C,1),I=F[0],t.next=61,B({scene:c,model:J.ISS,options:{position:[100,100,100]}});case 61:return N=t.sent,$=Object(o.a)(N,1),Z=$[0],t.next=66,B({scene:c,model:J.JamesWebbTelescope,options:{position:[-10,-20,-20]}});case 66:V=t.sent,Y=Object(o.a)(V,1),oe=Y[0],n={},Object(r.a)(n,te.commandModule,new re(I.scene,(function(e){e.rotation.y+=.005}))),Object(r.a)(n,te.internationalSpaceStation,new re(Z.scene,(function(e){e.rotation.y+=5e-4}))),Object(r.a)(n,te.jamesWebbTelescope,new re(oe.scene,(function(e){e.rotation.y+=.001}))),ce=n,se=new l.V(75,window.innerWidth/window.innerHeight,.01,1e3),ie=new K({camera:se,position:new l.ub(0,0,0),quaternion:new l.cb,defaultOffset:new l.ub(0,3,-7.5),defaultLookat:new l.ub(0,0,10)}),ue=new ne(U.scene,ae,[{id:"camera",action:ie.onTargetUpdate}]),d.render(c,ie.camera),le=new l.tb,pe=new l.eb,window.addEventListener("pointermove",(function(e){le.x=e.clientX/window.innerWidth*2-1,le.y=-e.clientY/window.innerHeight*2+1,pe.setFromCamera(le,ie.camera)})),window.addEventListener("keydown",(function(e){ue.toggleControl(e.key,!0)})),window.addEventListener("keyup",(function(e){ue.toggleControl(e.key,!1)})),window.addEventListener("click",(function(){for(var t=0,n=Object.entries(ce);t<n.length;t++){var r=Object(o.a)(n[t],2),c=r[0],d=r[1],f=pe.intersectObjects(d.scene.children);if(f.length>0&&e.playState===G.travel){ue.removeObserver("camera"),d.addObserver({id:"camera",action:ie.onTargetUpdate}),ie.changeDefaults({defaultLookat:new l.ub(-5,0,0),defaultOffset:new l.ub(0,0,10)}),e.$data.focusedObject=c,e.transitionState(ee.click);break}if(0===f.length&&e.playState===G.reading){d.removeObserver("camera"),ue.addObserver({id:"camera",action:ie.onTargetUpdate}),ie.changeDefaults({defaultLookat:new l.ub(0,0,10),defaultOffset:new l.ub(0,3,-7.5)}),e.$data.focusedObject=null,e.transitionState(ee.click);break}}})),animate();case 81:case"end":return t.stop()}}),t)})))()},methods:{transitionState:function(e){var t,n=(t={},Object(r.a)(t,G.travel,Object(r.a)({},ee.click,G.reading)),Object(r.a)(t,G.reading,Object(r.a)({},ee.click,G.travel)),t);this.playState=n[this.playState][e]}}}),ce=n(30),component=Object(ce.a)(oe,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"fixed w-full h-full"},[n("canvas",{attrs:{id:"space-bg"}}),e._v(" "),n("div",{class:"absolute w-1/3 h-1/2 z-10 left-[20%] top-1/4 bg-red-500 rounded-sm transition-opacity duration-700 ease-linear "+(e.page?"opacity-100":"opacity-0")+" overflow-y-auto x-invisible-scrollbar",attrs:{id:"space-info"}},[e.page?n("h1",[e._v(e._s(e.page.title))]):e._e(),e._v(" "),e.page?n("body",[e._v("\n      "+e._s(e.page.description)+"\n    ")]):e._e()])])}),[],!1,null,null,null);t.default=component.exports}}]);