function mr_parallax(){"use strict";function t(){var e,t=0;return h()?(t=jQuery(".viu").find("nav:first").outerHeight(!0),"absolute"!==(e=jQuery(".viu").find("nav:first").css("position"))&&"fixed"!==e||(t=0)):t=jQuery(document).find("nav:first").outerHeight(!0),t}function m(){if(P){for(var e=f.length,t=c();e--;)n=f[e],o=t,l=p,a=v,h()?o+y-x>n.elemTop&&o-x<n.elemBottom&&(n.isFirstSection?n.imageHolder.style[g]=l+o/2+a:n.imageHolder.style[g]=l+(o-n.elemTop-x)/2+a):o+y>n.elemTop&&o<n.elemBottom&&(n.isFirstSection?n.imageHolder.style[g]=l+o/2+a:n.imageHolder.style[g]=l+(o+y-n.elemTop)/2+a);P=!1}var n,o,l,a,r,i,s,d,u;T&&(M+=-H*(u=(r=E)-1,u/=d=D,r/=d,(s=j)*(--r*r*r*r*r+1)+(i=0)-(s*(--u*u*u*u*u+1)+i)),(b<M||M<-b)&&(Q.scrollBy(0,M),M=0),D<++E&&(T=!1,M=H=E=0)),w(m)}function c(){return Q!=window?Q.scrollTop:0===document.documentElement.scrollTop?document.body.scrollTop:document.documentElement.scrollTop}function e(){P=!0}function n(e){!0===a.mr_scrollAssist&&(e.preventDefault&&e.preventDefault(),H=e.notRealWheel?-e.deltaY/4:1==e.deltaMode?-e.deltaY/3:100===Math.abs(e.deltaY)?-e.deltaY/120:-e.deltaY/40,H=o<(H=H<-o?-o:H)?o:H,T=!0,E=l)}function h(){return void 0!==window.mr_variant}var f,w=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,g=function(e){for(var t=0;t<e.length;t++)if(void 0!==document.body.style[e[t]])return e[t];return null}(["transform","msTransform","webkitTransform","mozTransform","oTransform"]),p="translate3d(0,",v="px,0)",y=Math.max(document.documentElement.clientHeight,window.innerHeight||0),x=0,T=!1,E=0,H=0,o=2.2,l=2,j=350,b=1,D=35,M=0,Q=window,P=(h(),!1),a=this;this.mr_scrollAssist=!!$("body").hasClass("scroll-assist"),jQuery(document).ready(function(){a.documentReady()}),jQuery(window).load(function(){a.windowLoad()}),this.getScrollingState=function(){return 0<E},this.documentReady=function(e){return y=Math.max(document.documentElement.clientHeight,window.innerHeight||0),jQuery("body").hasClass("parallax-2d")&&(p="translate(0,",v="px)"),/Android|iPad|iPhone|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent||navigator.vendor||window.opera)?jQuery(".parallax").removeClass("parallax"):w&&(a.profileParallaxElements(),a.setupParallax()),(t=e)&&"[object Function]"==={}.toString.call(t)?void e():void 0;var t},this.windowLoad=function(){y=Math.max(document.documentElement.clientHeight,window.innerHeight||0),x=t(),window.mr_parallax.profileParallaxElements()},this.setupParallax=function(){h()&&(void 0!==(Q=jQuery(".viu").get(0))&&(Q.scrollBy=function(e,t){this.scrollTop+=t,this.scrollLeft+=e})),void 0!==Q&&(Q.addEventListener("scroll",e,!1),window.addWheelListener(Q,n,!1),window.addEventListener("resize",function(){y=Math.max(document.documentElement.clientHeight,window.innerHeight||0),x=t(),a.profileParallaxElements()},!1),m())},this.profileParallaxElements=function(){f=[],x=t();var o=h(),e=".parallax > .background-image-holder, .parallax ul.slides > li > .background-image-holder, .parallax ul.slides .owl-item > li > .background-image-holder";o&&(e=".viu .parallax > .background-image-holder, .viu .parallax ul.slides > li > .background-image-holder, .parallax ul.slides .owl-item > li > .background-image-holder"),jQuery(e).each(function(e){var t=jQuery(this).closest(".parallax"),n=o?t.position().top:t.offset().top;f.push({section:t.get(0),outerHeight:t.outerHeight(),elemTop:n,elemBottom:n+t.outerHeight(),isFirstSection:!!t.is(":nth-of-type(1)"),imageHolder:jQuery(this).get(0)}),o?o&&(t.is(":nth-of-type(1)")?a.mr_setTranslate3DTransform(jQuery(this).get(0),0===c()?0:c()/2):a.mr_setTranslate3DTransform(jQuery(this).get(0),(c()-n-x)/2)):t.is(":nth-of-type(1)")?a.mr_setTranslate3DTransform(jQuery(this).get(0),0===c()?0:c()/2):a.mr_setTranslate3DTransform(jQuery(this).get(0),(c()+y-n)/2)})},this.mr_setTranslate3DTransform=function(e,t){e.style[g]=p+t+v}}window.mr_parallax=new mr_parallax,function(l,e){function o(e,t,n,o){e[a](i+t,"wheel"==r?n:function(e){var t={originalEvent:e=e||l.event,target:e.target||e.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==e.type?0:1,deltaX:0,deltaZ:0,notRealWheel:1,preventDefault:function(){e.preventDefault?e.preventDefault():e.returnValue=!1}};return"mousewheel"==r?(t.deltaY=-.025*e.wheelDelta,e.wheelDeltaX&&(t.deltaX=-.025*e.wheelDeltaX)):t.deltaY=e.detail/3,n(t)},o||!1)}var a,r,i="";l.addEventListener?a="addEventListener":(a="attachEvent",i="on"),r="onwheel"in e.createElement("div")?"wheel":void 0!==e.onmousewheel?"mousewheel":"DOMMouseScroll",l.addWheelListener=function(e,t,n){o(e,r,t,n),"DOMMouseScroll"==r&&o(e,"MozMousePixelScroll",t,n)}}(window,document);