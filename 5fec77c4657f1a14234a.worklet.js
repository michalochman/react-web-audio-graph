!function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="/react-web-audio-graph/",r(r.s=0)}([function(t,n,r){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function o(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function u(t,n,r){return n&&o(t.prototype,n),r&&o(t,r),t}function i(t,n){return(i=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function c(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&i(t,n)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function a(t){return(a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,n){return!n||"object"!==a(n)&&"function"!==typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function s(t){var n=l();return function(){var r,e=f(t);if(n){var o=f(this).constructor;r=Reflect.construct(e,arguments,o)}else r=e.apply(this,arguments);return p(this,r)}}function y(t,n,r){return(y=l()?Reflect.construct:function(t,n,r){var e=[null];e.push.apply(e,n);var o=new(Function.bind.apply(t,e));return r&&i(o,r.prototype),o}).apply(null,arguments)}function v(t){var n="function"===typeof Map?new Map:void 0;return(v=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return y(t,arguments,f(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),i(e,t)})(t)}r.r(n);var d=function(t){c(r,t);var n=s(r);function r(t){var o;return e(this,r),(o=n.call(this,t)).running=!0,o.port.onmessage=function(t){"stop"===t.data&&o.stop()},o}return u(r,[{key:"stop",value:function(){this.running=!1}}]),r}(v(AudioWorkletProcessor));function b(t,n,r,e,o){return r+(o-t)*(e-r)/(n-t)}registerProcessor("transformer-processor",function(t){c(r,t);var n=s(r);function r(t){var o,u,i,c,f;e(this,r),(f=n.call(this,t)).transform=void 0;var l=null!==(o=null===t||void 0===t?void 0:t.processorOptions.inputMax)&&void 0!==o?o:1,a=null!==(u=null===t||void 0===t?void 0:t.processorOptions.inputMin)&&void 0!==u?u:-1,p=null!==(i=null===t||void 0===t?void 0:t.processorOptions.outputMax)&&void 0!==i?i:1,s=null!==(c=null===t||void 0===t?void 0:t.processorOptions.outputMin)&&void 0!==c?c:0;return f.transform=b.bind(void 0,a,l,s,p),f}return u(r,[{key:"process",value:function(t,n){for(var r=t[0],e=n[0],o=0;o<e.length;++o)for(var u=e[o].length,i=0;i<u;i++){var c,f;e[o][i]=this.transform(null!==(c=null===r||void 0===r||null===(f=r[o])||void 0===f?void 0:f[i])&&void 0!==c?c:0)}return this.running}}]),r}(d))}]);
//# sourceMappingURL=5fec77c4657f1a14234a.worklet.js.map