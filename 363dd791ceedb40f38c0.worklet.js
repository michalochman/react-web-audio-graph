!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function r(t,e){return r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(t,e)}function o(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&r(t,e)}function u(t){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},u(t)}function i(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function f(t,e){if(e&&("object"===c(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function a(t){var e=i();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function p(t,e,n){return p=i()?Reflect.construct:function(t,e,n){var o=[null];o.push.apply(o,e);var u=new(Function.bind.apply(t,o));return n&&r(u,n.prototype),u},p.apply(null,arguments)}function l(t){var e="function"===typeof Map?new Map:void 0;return l=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof e){if(e.has(t))return e.get(t);e.set(t,o)}function o(){return p(t,arguments,u(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),r(o,t)},l(t)}var s=function(e){o(u,e);var r=a(u);function u(){return t(this,u),r.apply(this,arguments)}return n(u,[{key:"process",value:function(t,e){for(var n=t[0],r=e[0],o=0;o<n.length;++o)for(var u=n[o].length,i=0;i<u;i++)r[o][i]=Math.sign(n[o][i]);return this.running}}]),u}(function(e){o(u,e);var r=a(u);function u(){var e;return t(this,u),(e=r.call(this)).running=!0,e.port.onmessage=function(t){"stop"===t.data&&e.stop()},e}return n(u,[{key:"stop",value:function(){this.running=!1}}]),u}(l(AudioWorkletProcessor)));registerProcessor("sign-processor",s)}();
//# sourceMappingURL=363dd791ceedb40f38c0.worklet.js.map