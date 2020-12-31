(this["webpackJsonpreact-web-audio-graph"]=this["webpackJsonpreact-web-audio-graph"]||[]).push([[0],{25:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(0),i=n.n(c),r=n(7),o=n.n(r),u=(n(25),n(4)),s=n(2),l=Object(c.createContext)(null);var d=function(e){var t=e.children,n=Object(c.useMemo)((function(){try{return window.AudioContext||(window.AudioContext=window.webkitAudioContext),new window.AudioContext}catch(e){}}),[]),i=Object(c.useCallback)((function(){"suspended"===(null===n||void 0===n?void 0:n.state)&&n.resume()}),[n]);return n?Object(a.jsx)("div",{onClick:i,children:Object(a.jsx)(l.Provider,{value:n,children:t})}):Object(a.jsx)("div",{children:"Sorry, but the Web Audio API is not supported by your browser."})},j=n(3),f=n(15),m=n(5),h=n.n(m),v=n(13),b=n(35),p=n(36),O=n(11);function g(e){var t,n,a,c,i,r,o,u;w(e)?(null===(t=e.input)||void 0===t||null===(n=t.stop)||void 0===n||n.call(t),null===(a=e.output)||void 0===a||null===(c=a.stop)||void 0===c||c.call(a),null===(i=e.input)||void 0===i||i.disconnect(),null===(r=e.output)||void 0===r||r.disconnect()):(null===(o=(u=e).stop)||void 0===o||o.call(u),e.disconnect())}var x=function(e){var t=e.children,n=Object(c.useRef)({}),i=Object(c.useMemo)((function(){return{addNode:function(e,t){n.current[e]=t},getNode:function(e){return n.current[e]},nodes:n.current,removeNode:function(e){g(n.current[e]),delete n.current[e]}}}),[]);return Object(a.jsx)("div",{children:Object(a.jsx)(T.Provider,{value:i,children:t})})};function y(e){var t,n;return+(null!==(t=null===(n=e.match(/-(\d+)$/))||void 0===n?void 0:n[1])&&void 0!==t?t:0)}function N(e,t){if(!e.source||!e.target||!e.sourceHandle||!e.targetHandle)throw new Error("Invalid connection");var n=e.targetHandle.startsWith("input"),a=t(e.source),c=t(e.target);if(w(a)&&(a=a.output),w(c)&&(c=c.input),!a||!c)throw new Error("Invalid connection");return{inputIndex:n?y(e.targetHandle):void 0,outputIndex:y(e.sourceHandle),source:a,target:n?c:c[e.targetHandle]}}function C(e,t){try{var n=N(e,t),a=n.inputIndex,c=n.outputIndex,i=n.source,r=n.target;null!=a?i.connect(r,c,a):i.connect(r,c)}catch(o){console.error(o)}}function k(){var e=E().getNode;return Object(c.useCallback)((function(t){return function(e,t){try{var n=N(e,t),a=n.inputIndex,c=n.outputIndex,i=n.source,r=n.target;null!=a?i.disconnect(r,c,a):i.disconnect(r,c)}catch(o){console.error(o)}}(t,e)}),[e])}function w(e){return e&&"input"in e&&"output"in e}var T=Object(c.createContext)(null);function E(){return Object(c.useContext)(T)}function _(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=Object(c.useContext)(l),i=E(),r=i.addNode,o=i.getNode,u=i.removeNode,d=Object(s.k)((function(e){return e.edges})),j=Object(c.useMemo)((function(){return t(a)}),n);return Object(c.useEffect)((function(){return r(e,j),d.filter((function(t){return t.source===e||t.target===e})).forEach((function(e){return C(e,o)})),function(){u(e)}}),[r,o,j,e,u]),j}var A=n(16);function S(e,t){var n=Object(c.useRef)(),a=Object(c.useRef)(),i=null===t||void 0===t?void 0:t.maxFPS,r=Object(c.useCallback)((function(t){if(null!=n.current){var c=t-n.current;(!i||c>1e3/i)&&(e(c),n.current=t)}else e(0),n.current=t;a.current=requestAnimationFrame(r)}),[e]);Object(c.useEffect)((function(){return a.current=requestAnimationFrame(r),function(){null!=a.current&&cancelAnimationFrame(a.current)}}),[r])}function M(e){var t=e.node,n=e.paused,i=e.type,r=Object(A.a)(e,["node","paused","type"]),o=Object(c.useRef)(new Uint8Array(t.frequencyBinCount)),u=Object(c.useRef)(null),s=Object(c.useCallback)((function(){var e=u.current,t=null===e||void 0===e?void 0:e.getContext("2d");e&&t&&(i===F.TimeDomain?function(e,t){var n=0,a=e.canvas.height,c=e.canvas.width,i=t.length,r=c/i;e.fillStyle="#001400",e.fillRect(0,0,c,256),e.lineWidth=2,e.strokeStyle="#00c800",e.beginPath(),e.moveTo(n,a-t[0]/128*a/2);for(var o=1;o<i;o++){var u=t[o]/128*a/2;e.lineTo(n,a-u),n+=r}e.stroke()}(t,o.current):i===F.Frequency&&function(e,t){var n=0,a=e.canvas.height,c=e.canvas.width,i=t.length,r=c/i;e.fillStyle="#001400",e.fillRect(0,0,c,a),e.fillStyle="#00c800";for(var o=0;o<i;o++){var u=a*(t[o]/255),s=a-u;e.fillRect(n,s,r,u),n+=r}}(t,o.current))}),[i]),l=Object(c.useCallback)((function(){var e=t.frequencyBinCount,n=new Uint8Array(e);i===F.TimeDomain?t.getByteTimeDomainData(n):i===F.Frequency&&t.getByteFrequencyData(n),o.current=n}),[t,i]);return S(Object(c.useCallback)((function(){n||(l(),s())}),[s,l,n])),Object(a.jsx)("canvas",Object(j.a)({ref:u,style:{display:"block"}},r))}var R=i.a.memo(M);function D(e){var t=e.children,n=e.id,i=e.inputs,r=e.outputs,o=e.title,u=e.type,l=Object(c.useMemo)((function(){return{background:"#".concat(n.substr(-6))}}),[n]);return Object(a.jsxs)("div",{className:"customNode",title:n,children:[Object(a.jsx)("div",{className:"customNode_header",children:null!==o&&void 0!==o?o:u}),Object(a.jsxs)("div",{className:"customNode_body",children:[i&&Object(a.jsx)("div",{className:"customNode_inputs",children:i.map((function(e){return Object(a.jsxs)("div",{className:"customNode_item",children:[Object(a.jsx)(s.c,{id:e,position:s.d.Left,style:l,type:"target"}),e]},e)}))}),r&&Object(a.jsx)("div",{className:"customNode_outputs",children:r.map((function(e){return Object(a.jsxs)("div",{className:"customNode_item",children:[Object(a.jsx)(s.c,{id:e,position:s.d.Right,style:l,type:"source"}),e]},e)}))})]}),t]})}var F,P=i.a.memo(D);function q(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.fftSizeExp,u=void 0===o?11:o,s=t.onChange,l=t.paused,d=void 0!==l&&l,j=t.type,f=void 0===j?F.TimeDomain:j,m=_(n,(function(e){return e.createAnalyser()}));return Object(c.useEffect)((function(){m.fftSize=Math.pow(2,u)}),[m,u]),Object(a.jsxs)(P,{id:n,inputs:["input","fftSize"],outputs:["output"],title:"Analyser: ".concat(f),type:r,children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)(R,{type:f,node:m,paused:d,height:64,width:256})}),i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsxs)("div",{className:"customNode_item",children:[Object(a.jsx)("input",{className:"nodrag",type:"range",max:"15",min:"5",onChange:function(e){return s({fftSizeExp:+e.target.value})},step:1,value:u}),Math.pow(2,u)]}),Object(a.jsxs)("div",{className:"customNode_item",style:{justifyContent:"space-between"},children:[Object(a.jsxs)("select",{onChange:function(e){return s({type:e.target.value})},value:f,children:[Object(a.jsx)("option",{value:F.Frequency,children:F.Frequency}),Object(a.jsx)("option",{value:F.TimeDomain,children:F.TimeDomain})]}),Object(a.jsxs)("label",{style:{alignItems:"center",display:"flex"},children:[Object(a.jsx)("input",{className:"nodrag",type:"checkbox",checked:d,onChange:function(e){return s({paused:!d})}}),"Paused"]})]})]})]})}!function(e){e.Frequency="Frequency",e.TimeDomain="Time Domain"}(F||(F={}));var I,B=i.a.memo(q);function L(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.detune,u=void 0===o?0:o,s=t.gain,l=void 0===s?0:s,d=t.frequency,j=void 0===d?350:d,f=t.Q,m=void 0===f?1:f,h=t.onChange,v=t.type,b=void 0===v?I.lowpass:v,p=Object(c.useRef)(null),O=_(n,(function(e){return e.createBiquadFilter()}));Object(c.useEffect)((function(){O.detune.value=u}),[O,u]),Object(c.useEffect)((function(){O.frequency.value=j}),[O,j]),Object(c.useEffect)((function(){O.gain.value=l}),[O,l]),Object(c.useEffect)((function(){O.Q.value=m}),[O,m]),Object(c.useEffect)((function(){O.type=b}),[O,b]),Object(c.useEffect)((function(){var e=p.current,t=null===e||void 0===e?void 0:e.getContext("2d");if(e&&t){var n=new Float32Array(O.context.sampleRate/200).map((function(e,t){return 100*t})),a=new Float32Array(n.length),c=new Float32Array(n.length);O.getFrequencyResponse(n,a,c),function(e,t,n){var a=0,c=e.canvas.height,i=e.canvas.width,r=t.length,o=i/r;e.fillStyle="#001400",e.fillRect(0,0,i,c),e.lineWidth=1,e.strokeStyle="#ffffff77",e.beginPath(),e.moveTo(n.frequency.value/(n.context.sampleRate/2)*i,0),e.lineTo(n.frequency.value/(n.context.sampleRate/2)*i,c),e.stroke(),e.closePath(),e.lineWidth=2,e.strokeStyle="#00c800",e.beginPath();for(var u=0;u<r;u++){var s=t[u]*c/2;e.lineTo(a,c-s),a+=o}e.stroke()}(t,a,O)}}),[O,u,l,j,m,i,b]);var g=[I.lowshelf,I.highshelf,I.peaking].includes(b),x=[I.lowpass,I.highpass,I.bandpass,I.peaking,I.notch,I.allpass].includes(b);return Object(a.jsx)(P,{id:n,inputs:["input","detune","frequency","gain","Q"],outputs:["output"],title:"Filter: ".concat(b),type:r,children:i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return h({detune:+e.target.value})},step:1,type:"range",value:u})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",min:10,max:O.context.sampleRate/2,onChange:function(e){return h({frequency:+e.target.value})},step:1,type:"range",value:j})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",disabled:!g,min:-40,max:40,onChange:function(e){return h({gain:+e.target.value})},step:.1,type:"range",value:l})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",disabled:!x,min:1e-4,max:[I.lowpass,I.highpass].includes(b)?10:1e3,onChange:function(e){return h({Q:+e.target.value})},step:[I.lowpass,I.highpass].includes(b)?.1:10,type:"range",value:m})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("select",{onChange:function(e){return h({type:e.target.value})},value:b,children:Object.values(I).map((function(e){return Object(a.jsx)("option",{value:e,children:e},e)}))})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("canvas",{ref:p,height:64,width:256})})]})})}!function(e){e.lowpass="lowpass",e.highpass="highpass",e.bandpass="bandpass",e.lowshelf="lowshelf",e.highshelf="highshelf",e.peaking="peaking",e.notch="notch",e.allpass="allpass"}(I||(I={}));var G=i.a.memo(L),W={2:"Stereo",4:"Quad",6:"5.1"};function H(e){var t=e.data,n=e.id,c=e.selected,i=e.type,r=t.inputs,o=void 0===r?2:r,u=t.onChange,s=_(n,(function(e){return e.createChannelMerger(o)}),[o]);return Object(a.jsx)(P,{id:n,inputs:Array(s.numberOfInputs).fill(0).map((function(e,t){return"input-".concat(t)})),outputs:["output"],type:i,children:c&&Object(a.jsx)("div",{className:"customNode_editor",children:Object(a.jsx)("div",{className:"customNode_item",style:{alignItems:"flex-start",flexDirection:"column"},children:Object.keys(W).map((function(e){return Object(a.jsxs)("label",{children:[Object(a.jsx)("input",{checked:o===+e,className:"nodrag",onChange:function(e){return u({inputs:+e.target.value})},type:"radio",value:+e})," ",W[e]]},e)}))})})})}var Q=i.a.memo(H);function z(e){var t=e.data,n=e.id,c=e.selected,i=e.type,r=t.onChange,o=t.outputs,u=void 0===o?2:o,s=_(n,(function(e){return e.createChannelSplitter(u)}),[u]);return Object(a.jsx)(P,{id:n,inputs:["input"],outputs:Array(s.numberOfOutputs).fill(0).map((function(e,t){return"output-".concat(t)})),type:i,children:c&&Object(a.jsx)("div",{className:"customNode_editor",children:Object(a.jsx)("div",{className:"customNode_item",style:{alignItems:"flex-start",flexDirection:"column"},children:Object.keys(W).map((function(e){return Object(a.jsxs)("label",{children:[Object(a.jsx)("input",{checked:u===+e,className:"nodrag",onChange:function(e){return r({outputs:+e.target.value})},type:"radio",value:+e})," ",W[e]]},e)}))})})})}var V=i.a.memo(z);function J(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.offset,u=void 0===o?1:o,s=t.onChange,l=_(n,(function(e){return e.createConstantSource()}));return Object(c.useEffect)((function(){return l.start(),function(){return l.stop()}}),[l]),Object(c.useEffect)((function(){return l.offset.value=u}),[l,u]),Object(a.jsx)(P,{id:n,outputs:["output"],title:"Constant: ".concat(u),type:r,children:i&&Object(a.jsx)("div",{className:"customNode_editor",children:Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"number",onChange:function(e){return s({offset:+e.target.value})},style:{width:"100%"},value:u})})})})}var X=i.a.memo(J);function U(e){return Math.max(.001,Math.min(179.999,e))}function K(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.delayTime,u=void 0===o?1:o,s=t.maxDelayTime,l=void 0===s?1:s,d=t.onChange,j=_(n,(function(e){return e.createDelay(U(l))}),[l]);return Object(c.useEffect)((function(){j.delayTime.value=u}),[j,u]),Object(a.jsx)(P,{id:n,inputs:["input","delayTime"],outputs:["output"],title:"Delay: ".concat(u," s"),type:r,children:i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",max:j.delayTime.maxValue,min:j.delayTime.minValue,step:.1,onChange:function(e){return d({delayTime:+e.target.value})},type:"range",value:u})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",onChange:function(e){return d({maxDelayTime:+e.target.value})},max:0,min:180,type:"number",value:U(l)})})]})})}var Y=i.a.memo(K);function Z(e){var t=e.data,n=e.id,c=e.selected,i=e.type,r=t.delayTime,o=void 0===r?.2:r,u=t.feedback,s=void 0===u?.7:u,l=t.mix,d=void 0===l?.5:l,j=t.onChange;return _(n,(function(e){var t=e.createGain(),n=e.createGain(),a=e.createGain(),c=e.createGain(),i=e.createDelay(1);i.delayTime.value=o;var r=e.createGain();return r.gain.setTargetAtTime(s,r.context.currentTime,.015),a.gain.setTargetAtTime(Math.cos(.5*d*Math.PI),a.context.currentTime,.015),c.gain.setTargetAtTime(Math.cos(.5*(1-d)*Math.PI),c.context.currentTime,.015),t.connect(a),a.connect(n),t.connect(i),i.connect(c),c.connect(n),c.connect(r),r.connect(i),{input:t,output:n}}),[o,s,d]),Object(a.jsx)(P,{id:n,inputs:["input"],outputs:["output"],title:"DelayEffect",type:i,children:c&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.01",onChange:function(e){return j({mix:+e.target.value})},value:d})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.01",onChange:function(e){return j({delayTime:+e.target.value})},value:o})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.01",onChange:function(e){return j({feedback:+e.target.value})},value:s})})]})})}var $=i.a.memo(Z);function ee(e){var t=e.id,n=e.type;return _(t,(function(e){return e.destination})),Object(a.jsx)(P,{id:t,inputs:["input"],type:n})}var te=i.a.memo(ee);function ne(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.attack,u=void 0===o?.003:o,s=t.knee,l=void 0===s?30:s,d=t.onChange,j=t.ratio,f=void 0===j?12:j,m=t.release,h=void 0===m?.25:m,v=t.threshold,b=void 0===v?-24:v,p=_(n,(function(e){return e.createDynamicsCompressor()}));return Object(c.useEffect)((function(){p.threshold.value=b}),[p,b]),Object(c.useEffect)((function(){p.knee.value=l}),[p,l]),Object(c.useEffect)((function(){p.ratio.value=f}),[p,f]),Object(c.useEffect)((function(){p.attack.value=u}),[p,u]),Object(c.useEffect)((function(){p.release.value=h}),[p,h]),Object(a.jsx)(P,{id:n,inputs:["input","threshold","knee","ratio","attack","release"],outputs:["output"],type:r,children:i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"0",min:"-100",step:"1",onChange:function(e){return d({threshold:+e.target.value})},value:b})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"40",min:"0",step:"1",onChange:function(e){return d({knee:+e.target.value})},value:l})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"20",min:"1",step:"1",onChange:function(e){return d({ratio:+e.target.value})},value:f})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.001",onChange:function(e){return d({attack:+e.target.value})},value:u})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.001",onChange:function(e){return d({release:+e.target.value})},value:h})})]})})}var ae=i.a.memo(ne);function ce(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.attackTime,u=void 0===o?.2:o,s=t.decayTime,l=void 0===s?.1:s,d=t.onChange,j=t.releaseTime,f=void 0===j?.6:j,m=t.sustainLevel,h=void 0===m?.7:m,v=t.sustainOn,b=void 0===v||v,p=Object(c.useRef)(null),O=Object(c.useRef)(Number.MAX_SAFE_INTEGER),g=Object(c.useRef)(Number.MAX_SAFE_INTEGER),x=_(n,(function(e){return e.createGain()}));Object(c.useEffect)((function(){x.gain.setTargetAtTime(0,x.context.currentTime,.015)}),[x]);var y=Object(c.useCallback)((function(e){if(!("repeat"in e)||!e.repeat){var t=x.context.currentTime;O.current=t,x.gain.cancelScheduledValues(t),x.gain.setValueAtTime(0,t),x.gain.linearRampToValueAtTime(1,t+u),x.gain.linearRampToValueAtTime(h,t+u+l),b||x.gain.linearRampToValueAtTime(0,t+u+l+f)}}),[x,u,l,f,h,b]),N=Object(c.useCallback)((function(){var e=x.context.currentTime;g.current=e,x.gain.cancelScheduledValues(e),x.gain.setValueAtTime(x.gain.value,e);var t=b?0:Math.max(0,g.current-O.current-(u+l));x.gain.linearRampToValueAtTime(0,e+f-t)}),[x,u,l,f,b]);return S(Object(c.useCallback)((function(){var e=p.current,t=null===e||void 0===e?void 0:e.getContext("2d");e&&t&&function(e,t,n){var a=t.attackTime,c=t.decayTime,i=t.sustainLevel,r=t.sustainOn,o=t.releaseTime,u=n.currentTime,s=n.gain,l=n.keyOffEventTime,d=n.keyOnEventTime,j=e.canvas.height,f=e.canvas.width,m=r?(a+c+o)/9:0,h=f/(a+c+o+m);e.fillStyle="#001400",e.fillRect(0,0,f,j),e.lineWidth=2,e.strokeStyle="#00c800",e.beginPath(),e.moveTo(0,j),e.lineTo(a*h,0),e.lineTo((a+c)*h,(1-i)*j),e.lineTo((a+c+m)*h,(1-i)*j),e.lineTo((a+c+m+o)*h,j),e.stroke(),e.closePath();var v=Math.min(u-d,a+c+m+(r?0:o))*h;r&&l>d&&(v=(a+c+m+Math.min(u-l,o))*h),e.beginPath(),e.fillStyle="#ffff00",e.moveTo(v,(1-s)*j),e.arc(v,(1-s)*j,3,0,2*Math.PI),e.fill()}(t,{attackTime:u,decayTime:l,releaseTime:f,sustainLevel:h,sustainOn:b},{currentTime:x.context.currentTime,gain:x.gain.value,keyOffEventTime:g.current,keyOnEventTime:O.current})}),[x,u,l,f,h,b])),Object(a.jsxs)(P,{id:n,inputs:["input"],outputs:["output"],type:r,children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("button",{onMouseDown:y,onMouseUp:N,onKeyDown:y,onKeyUp:N,children:"play"})}),i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("canvas",{ref:p,height:64,width:256})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsxs)("label",{style:{alignItems:"center",display:"flex"},children:[Object(a.jsx)("input",{className:"nodrag",type:"checkbox",checked:b,onChange:function(e){return d({sustainOn:!b})}}),"sustain on"]})}),Object(a.jsxs)("div",{className:"customNode_item",style:{width:276},children:[Object(a.jsx)("input",{className:"nodrag",min:0,onChange:function(e){return d({attackTime:+e.target.value})},step:.05,type:"number",style:{width:"25%"},value:u}),Object(a.jsx)("input",{className:"nodrag",min:0,onChange:function(e){return d({decayTime:+e.target.value})},type:"number",step:.05,style:{width:"25%"},value:l}),Object(a.jsx)("input",{className:"nodrag",max:1,min:0,onChange:function(e){return d({sustainLevel:+e.target.value})},step:.01,type:"number",style:{width:"25%"},value:h}),Object(a.jsx)("input",{className:"nodrag",min:0,onChange:function(e){return d({releaseTime:+e.target.value})},step:.05,type:"number",style:{width:"25%"},value:f})]})]})]})}var ie,re=i.a.memo(ce);!function(e){e.Linear="Linear",e.Log="Log"}(ie||(ie={}));var oe=function(e){var t=e.onChange,n=e.type,i=.001,r=e.value;n===ie.Log&&(i=9/(1/i),r=function(e){return(Math.pow(10,e)-1)/9}(r));var o=Object(c.useCallback)((function(e){var a=+e.target.value;n===ie.Log&&(a=function(e){return Math.log10(1+9*e)}(a)),t(a)}),[t,n]);return Object(a.jsx)("input",{className:"nodrag",type:"range",max:1,min:0,step:i,onChange:o,value:r})};function ue(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.gain,u=void 0===o?1:o,s=t.onChange,l=t.type,d=void 0===l?ie.Log:l,j=_(n,(function(e){return e.createGain()}));return Object(c.useEffect)((function(){j.gain.setTargetAtTime(u,j.context.currentTime,.015)}),[j,u]),Object(a.jsx)(P,{id:n,inputs:["input","gain"],outputs:["output"],title:"Gain: ".concat(u.toFixed(3)),type:r,children:i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)(oe,{onChange:function(e){return s({gain:e})},type:d,value:u})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsxs)("select",{onChange:function(e){return s({type:e.target.value})},value:d,children:[Object(a.jsx)("option",{value:ie.Linear,children:ie.Linear}),Object(a.jsx)("option",{value:ie.Log,children:ie.Log})]})})]})})}var se,le,de=i.a.memo(ue),je=n(10),fe=["C","C\u266f","D","D\u266f","E","F","F\u266f","G","G\u266f","A","A\u266f","B"];function me(e){if(e<0||e>11)throw new RangeError("Octave must be between 0 and 11, is ".concat(e))}function he(e,t){!function(e){if(e<0||e>10)throw new RangeError("Octave must be between 0 and 10, is ".concat(e))}(e),me(t);return 16.3516*Math.pow(2,e+t/12)}function ve(e){return me(e),fe[e]}!function(e){e[e.Whole="\ueca2"]="Whole",e[e.Half="\ueca3"]="Half",e[e.Quarter="\ueca5"]="Quarter",e[e.Sixteenth="\ueca9"]="Sixteenth",e[e.Eight="\ueca7"]="Eight"}(se||(se={})),function(e){e[e.Whole=1]="Whole",e[e.Half=2]="Half",e[e.Quarter=4]="Quarter",e[e.Eight=8]="Eight",e[e.Sixteenth=16]="Sixteenth"}(le||(le={}));n(29);var be={fontFamily:"Bravura",fontSize:20,height:32,lineHeight:2,padding:0,width:32};function pe(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.beatsPerMeasure,u=void 0===o?4:o,s=t.beatsPerMinute,l=void 0===s?120:s,d=t.notes,f=void 0===d?[le.Quarter]:d,m=t.onChange,h=_(n,(function(e){var t,n=60/l,a=n*u,c=e.createBuffer(1,e.sampleRate*a,e.sampleRate),i=c.getChannelData(0),r=Object(je.a)(f);try{for(r.s();!(t=r.n()).done;)for(var o=t.value,s=n*le.Quarter/o,d=e.sampleRate*s,j=880*o/le.Quarter,m=u*o/le.Quarter,h=0,v=1,b=0;b<m;b++)for(var p=0;p<d;p++){var O=0===b?1.33*j:j,g=p+Math.floor(b*d),x=1/f.length,y=Math.min(x,p/(.015*e.sampleRate));i[g]+=Math.sin(h)*v,h+=2*Math.PI*O/e.sampleRate,v=Math.max(y-p/d,0)}}catch(C){r.e(C)}finally{r.f()}var N=e.createBufferSource();return N.buffer=c,N.loop=!0,N.loopEnd=a,N}),[u,f.length,l]);Object(c.useEffect)((function(){return h.start(),function(){return h.stop()}}),[h]);var v=Object(c.useCallback)((function(e){return m({notes:f.includes(e)?f.filter((function(t){return t!==e})):f.concat(e)})}),[f,m]);return Object(a.jsx)(P,{id:n,outputs:["output"],title:"Metronome: ".concat(l," BPM"),type:r,children:i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsxs)("div",{className:"customNode_item",children:[Object(a.jsx)("input",{className:"nodrag",max:208,min:40,onChange:function(e){return m({beatsPerMinute:+e.target.value})},type:"number",value:l}),Object(a.jsx)("input",{className:"nodrag",max:8,min:1,onChange:function(e){return m({beatsPerMeasure:+e.target.value})},type:"number",value:u})]}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("span",{className:"nodrag",style:{alignItems:"center",display:"flex",justifyContent:"space-between"},children:[le.Whole,le.Half,le.Quarter,le.Eight,le.Sixteenth].map((function(e){return Object(a.jsx)("button",{onClick:function(){return v(e)},style:Object(j.a)(Object(j.a)({},be),{},{color:f.includes(e)?"#0d0":"#d00"}),children:se[le[e]]},e)}))})})]})})}var Oe=i.a.memo(pe);function ge(e){for(var t=e.length,n=e.getChannelData(0),a=0;a<t;a++)n[a]=2*Math.random()-1;return e}function xe(e){for(var t=e.length,n=e.getChannelData(0),a=0,c=0,i=0,r=0,o=0,u=0,s=0,l=0;l<t;l++){var d=2*Math.random()-1;a=.99886*a+.0555179*d,c=.99332*c+.0750759*d,i=.969*i+.153852*d,r=.8665*r+.3104856*d,o=.55*o+.5329522*d,u=-.7616*u-.016898*d,n[l]=a+c+i+r+o+u+s+.5362*d,n[l]*=.11,s=.115926*d}return e}function ye(e){for(var t=e.length,n=e.getChannelData(0),a=0,c=0;c<t;c++){var i=2*Math.random()-1;n[c]=(a+.02*i)/1.02,a=n[c],n[c]*=3.5}return e}function Ne(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.onChange,u=t.type,s=void 0===u?"white":u,l=_(n,(function(e){var t=5*e.sampleRate,n=(0,{brown:ye,pink:xe,white:ge}[s])(e.createBuffer(1,t,e.sampleRate)),a=e.createBufferSource();return a.buffer=n,a.loop=!0,a}),[s]);return Object(c.useEffect)((function(){return l.start(),function(){return l.stop()}}),[l]),Object(a.jsx)(P,{id:n,outputs:["output"],title:"Noise: ".concat(s),type:r,children:i&&Object(a.jsx)("div",{className:"customNode_editor",children:Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsxs)("select",{onChange:function(e){return o({type:e.target.value})},value:s,children:[Object(a.jsx)("option",{value:"white",children:"white"}),Object(a.jsx)("option",{value:"pink",children:"pink"}),Object(a.jsx)("option",{value:"brown",children:"brown"})]})})})})}var Ce=i.a.memo(Ne);function ke(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.detune,u=void 0===o?0:o,s=t.frequency,l=void 0===s?440:s,d=t.onChange,j=t.type,f=void 0===j?"sine":j,m=_(n,(function(e){return e.createOscillator()}));return Object(c.useEffect)((function(){return m.start(),function(){return m.stop()}}),[m]),Object(c.useEffect)((function(){m.detune.value=null!==u&&void 0!==u?u:0}),[m,u]),Object(c.useEffect)((function(){m.frequency.value=null!==l&&void 0!==l?l:440}),[m,l]),Object(c.useEffect)((function(){m.type=null!==f&&void 0!==f?f:"sine"}),[m,f]),Object(a.jsx)(P,{id:n,inputs:["detune","frequency"],outputs:["output"],title:"".concat(l," Hz ").concat(f),type:r,children:i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return d({detune:+e.target.value})},step:1,type:"number",value:u})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",min:0,max:2e4,onChange:function(e){return d({frequency:+e.target.value})},type:"number",value:l})}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsxs)("select",{onChange:function(e){return d({type:e.target.value})},value:f,children:[Object(a.jsx)("option",{value:"sawtooth",children:"sawtooth"}),Object(a.jsx)("option",{value:"square",children:"square"}),Object(a.jsx)("option",{value:"sine",children:"sine"}),Object(a.jsx)("option",{value:"triangle",children:"triangle"})]})})]})})}var we=i.a.memo(ke),Te={display:"inline-block",textAlign:"center",width:7},Ee=Object(j.a)(Object(j.a)({},Te),{},{verticalAlign:"sub"}),_e=Object(j.a)(Object(j.a)({},Te),{},{transform:"translateX(-100%)",verticalAlign:"super"});function Ae(e){var t=e.octave,n=e.twelfth,c=ve(n).split(""),i=Object(u.a)(c,2),r=i[0],o=i[1],s=he(t,n);return Object(a.jsxs)("span",{children:[r,Object(a.jsx)("small",{style:Ee,children:t}),o&&Object(a.jsx)("small",{style:_e,children:o}),Object(a.jsxs)("small",{children:[" (",s.toFixed(2)," Hz)"]})]})}var Se=i.a.memo(Ae);function Me(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.detune,u=void 0===o?0:o,s=t.octave,l=void 0===s?4:s,d=t.onChange,j=t.twelfth,f=void 0===j?0:j,m=t.type,h=void 0===m?"sine":m,v=he(l,f),b=_(n,(function(e){return e.createOscillator()}));return Object(c.useEffect)((function(){return b.start(),function(){return b.stop()}}),[b]),Object(c.useEffect)((function(){b.detune.value=null!==u&&void 0!==u?u:0}),[b,u]),Object(c.useEffect)((function(){b.frequency.value=v}),[b,v]),Object(c.useEffect)((function(){b.type=null!==h&&void 0!==h?h:"sine"}),[b,h]),Object(a.jsx)(P,{id:n,inputs:["detune"],outputs:["output"],title:Object(a.jsx)(Se,{octave:l,twelfth:f}),type:r,children:i&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return d({detune:+e.target.value})},step:1,style:{width:"100%"},type:"range",value:u})}),Object(a.jsxs)("div",{className:"customNode_item",children:[Object(a.jsx)("select",{onChange:function(e){return d({twelfth:+e.target.value})},style:{width:"50%"},value:f,children:Array(12).fill(0).map((function(e,t){return Object(a.jsx)("option",{value:t,children:ve(t)},t)}))}),Object(a.jsx)("select",{onChange:function(e){return d({octave:+e.target.value})},style:{width:"50%"},value:l,children:Array(11).fill(0).map((function(e,t){return Object(a.jsx)("option",{value:t,children:t},t)}))})]}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsxs)("select",{onChange:function(e){return d({type:e.target.value})},style:{width:"100%"},value:h,children:[Object(a.jsx)("option",{value:"sawtooth",children:"sawtooth"}),Object(a.jsx)("option",{value:"square",children:"square"}),Object(a.jsx)("option",{value:"sine",children:"sine"}),Object(a.jsx)("option",{value:"triangle",children:"triangle"})]})})]})})}function Re(e){var t=e.data,n=e.id,i=e.selected,r=e.type,o=t.pan,u=void 0===o?0:o,s=t.onChange,l=_(n,(function(e){return e.createStereoPanner()}));return Object(c.useEffect)((function(){l.pan.value=u}),[l,u]),Object(a.jsx)(P,{id:n,inputs:["input","pan"],outputs:["output"],title:"Stereo: ".concat(Math.abs(100*u).toFixed(0),"% ").concat(u>0?"Right":u<0?"Left":""),type:r,children:i&&Object(a.jsx)("div",{className:"customNode_editor",children:Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"-1",step:"0.01",onChange:function(e){return s({pan:+e.target.value})},value:u})})})})}function De(e){var t,n=e.data,i=e.id,r=e.selected,o=e.type,s=n.onChange,d=n.oversample,j=Object(c.useState)(null!==(t=n.curveFn)&&void 0!==t?t:"const k = 50;\nconst samples = curve.length;\nconst deg = Math.PI / 180;\nfor (let i = 0; i < samples; i++) {\n  const x = (i * 2) / samples - 1;\n  curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));\n}\nreturn curve;"),f=Object(u.a)(j,2),m=f[0],h=f[1],v=Object(c.useState)(m),b=Object(u.a)(v,2),p=b[0],O=b[1],g=Object(c.useContext)(l),x=_(i,(function(){return g.createWaveShaper()})),y=Object(c.useMemo)((function(){var e=new Float32Array(g.sampleRate);return new Function("curve",p)(e)}),[g.sampleRate,p]);Object(c.useEffect)((function(){x.curve=y}),[x,y]),Object(c.useEffect)((function(){x.oversample=d}),[x,d]);var N=Object(c.useCallback)((function(){try{new Function("curve",m)(new Float32Array(g.sampleRate)),O(m),s({curveFn:m})}catch(e){console.error(e)}}),[g.sampleRate,m,s]);return Object(a.jsx)(P,{id:i,inputs:["input"],outputs:["output"],type:o,children:r&&Object(a.jsxs)("div",{className:"customNode_editor",children:[Object(a.jsxs)("div",{className:"customNode_item",style:{flexWrap:"wrap"},children:[Object(a.jsx)("textarea",{className:"nodrag",onChange:function(e){return h(e.target.value)},rows:8,style:{width:"100%"},value:m}),Object(a.jsx)("button",{onClick:N,children:"save"})]}),Object(a.jsx)("div",{className:"customNode_item",children:Object(a.jsxs)("select",{onChange:function(e){return s({oversample:e.target.value})},value:d,children:[Object(a.jsx)("option",{value:"none",children:"none"}),Object(a.jsx)("option",{value:"2x",children:"2x"}),Object(a.jsx)("option",{value:"4x",children:"4x"})]})})]})})}var Fe={Analyser:B,BiquadFilter:G,ChannelMerger:Q,ChannelSplitter:V,ConstantSource:X,Delay:Y,DelayEffect:$,Destination:te,DynamicsCompressor:ae,Envelope:re,Gain:de,Metronome:Oe,Noise:Ce,Oscillator:we,OscillatorNote:i.a.memo(Me),StereoPanner:i.a.memo(Re),WaveShaper:i.a.memo(De)};function Pe(e,t){return qe.apply(this,arguments)}function qe(){return(qe=Object(v.a)(h.a.mark((function e(t,n){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.filter(s.h).reduce((function(e,t){return e[t.source]=!0,e[t.target]=!0,e}),{});case 1:if(!Object.keys(a).length){e.next=7;break}return Object.keys(n).forEach((function(e){delete a[e]})),e.next=5,new Promise((function(e){return setTimeout(e,0)}));case 5:e.next=1;break;case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ie(e){return 10*Math.floor(e/10)}function Be(e){var t=e.elements,n=e.transform,r=i.a.useState(!1),o=Object(u.a)(r,2),l=o[0],d=o[1],m=i.a.useState(),x=Object(u.a)(m,2),y=x[0],N=x[1],w=i.a.useState(null),T=Object(u.a)(w,2),_=T[0],A=T[1],S=Object(b.a)(_,y,{placement:"bottom-start"}),M=S.styles,R=S.attributes,D=Object(s.k)((function(e){return e.transform})),F=Object(c.useState)(t),P=Object(u.a)(F,2),q=P[0],I=P[1],B=E().nodes,L=function(){var e=E().getNode;return Object(c.useCallback)((function(t){return C(t,e)}),[e])}(),G=k(),W=function(){var e=E().getNode;return Object(c.useCallback)((function(t){return g(e(t))}),[e])}(),H=function(e){return function(t){I(Object(O.a)((function(n){var a=n.filter(s.i).find((function(t){return t.id===e}));a&&Object.keys(t).forEach((function(e){return a.data[e]=t[e]}))})))}},Q=function(e){return e.source?Object.assign({},e,{style:{stroke:"#".concat(e.source.substr(-6))}}):e},z=function(){var e=Object(v.a)(h.a.mark((function e(a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.setTransform(n),I(Object(O.a)((function(e){e.filter(s.i).forEach((function(e){e.data.onChange=H(e.id)}))}))),e.next=4,Pe(t,B);case 4:t.filter(s.h).forEach((function(e){return L(e)}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),V=Object(c.useCallback)((function(e){e.filter(s.h).forEach((function(e){return G(e)})),e.filter(s.i).forEach((function(e){return W(e.id)})),I((function(t){return Object(s.j)(e,t)}))}),[G,W]),J=Object(c.useCallback)((function(e){var t="".concat(e,"-").concat(Object(p.a)()),n={id:t,data:{onChange:H(t)},type:e,position:{x:Ie((_.getBoundingClientRect().left-D[0])/D[2]),y:Ie((_.getBoundingClientRect().top-D[1])/D[2])}};I((function(e){return[].concat(Object(f.a)(e),[n])})),d(!1)}),[D,_]);return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(s.g,{defaultPosition:[n.x,n.y],defaultZoom:n.zoom,elements:q,nodeTypes:Fe,onConnect:function(e){I((function(t){return Object(s.f)(Q(e),t)})),L(e)},onEdgeUpdate:function(e,t){G(e),I((function(t){return Object(s.j)([e],t)})),I((function(e){return Object(s.f)(Q(t),e)})),L(t)},onElementsRemove:V,onLoad:z,onNodeDragStop:function(e,t){I(Object(O.a)((function(e){var n=e.filter(s.i).find((function(e){return e.id===t.id}));n&&(n.position={x:Ie(t.position.x),y:Ie(t.position.y)})})))},onPaneClick:function(e){d(!!(null===y||void 0===y?void 0:y.contains(e.target)))},onPaneContextMenu:function(e){e.preventDefault(),d(!0),A({getBoundingClientRect:function(){return{top:e.clientY,left:e.clientX,height:0,width:0}}})},onlyRenderVisibleElements:!1,snapToGrid:!0,snapGrid:[10,10],style:{zIndex:0},children:[Object(a.jsx)(s.a,{gap:10}),Object(a.jsx)(s.b,{})]}),l&&Object(a.jsx)("div",Object(j.a)(Object(j.a)({ref:function(e){return e&&N(e)},style:M.popper},R.popper),{},{children:Object(a.jsxs)("ul",{className:"contextMenu",children:[Object(a.jsx)("li",{onClick:function(){return J("Analyser")},children:"Add Analyser"}),Object(a.jsx)("li",{onClick:function(){return J("BiquadFilter")},children:"Add Biquad Filter"}),Object(a.jsx)("li",{onClick:function(){return J("ChannelMerger")},children:"Add Channel Merger"}),Object(a.jsx)("li",{onClick:function(){return J("ChannelSplitter")},children:"Add Channel Splitter"}),Object(a.jsx)("li",{onClick:function(){return J("ConstantSource")},children:"Add Constant Source"}),Object(a.jsx)("li",{onClick:function(){return J("Delay")},children:"Add Delay"}),Object(a.jsx)("li",{onClick:function(){return J("Destination")},children:"Add Destination"}),Object(a.jsx)("li",{onClick:function(){return J("DynamicsCompressor")},children:"Add Dynamics Compressor"}),Object(a.jsx)("li",{onClick:function(){return J("Envelope")},children:"Add Envelope"}),Object(a.jsx)("li",{onClick:function(){return J("DelayEffect")},children:"Add DelayEffect"}),Object(a.jsx)("li",{onClick:function(){return J("Gain")},children:"Add Gain"}),Object(a.jsx)("li",{onClick:function(){return J("Metronome")},children:"Add Metronome"}),Object(a.jsx)("li",{onClick:function(){return J("Noise")},children:"Add Noise"}),Object(a.jsx)("li",{onClick:function(){return J("Oscillator")},children:"Add Oscillator"}),Object(a.jsx)("li",{onClick:function(){return J("OscillatorNote")},children:"Add Oscillator Note"}),Object(a.jsx)("li",{onClick:function(){return J("StereoPanner")},children:"Add Stereo Panner"}),Object(a.jsx)("li",{onClick:function(){return J("WaveShaper")},children:"Add Wave Shaper"})]})}))]})}var Le=i.a.memo(Be),Ge={fontSize:12,height:"100%",resize:"none",width:"100%"},We={display:"flex",position:"absolute",right:"100%",top:-10,transform:"rotate(-90deg)",transformOrigin:"bottom right"},He=function(){return{id:Object(p.a)(),elements:[],transform:{x:0,y:0,zoom:1}}};var Qe=function(e){var t=e.setProject,n=Object(c.useState)(!1),i=Object(u.a)(n,2),r=i[0],o=i[1],l=Object(s.k)((function(e){return e.elements})),d=Object(s.k)((function(e){return e.transform})),f=l.map((function(e){return Object(j.a)(Object(j.a)({},e),{},{__rf:void 0})})),m={x:d[0],y:d[1],zoom:d[2]},h=JSON.stringify({elements:f,transform:m}),v=Object(c.useMemo)((function(){return function(e){return{height:"100%",padding:10,position:"absolute",right:0,top:0,transform:e?"translateX(0)":"translateX(100%)",transition:"transform 0.4s ease",width:400}}(r)}),[r]);Object(c.useEffect)((function(){var e=atob(window.location.hash.substr(1));try{var n=JSON.parse(e),a=n.elements,c=n.transform;t({elements:a,id:Object(p.a)(),transform:c})}catch(i){console.error(i)}}),[t]),Object(c.useEffect)((function(){window.location.hash=btoa(h)}),[h]);var b=Object(c.useCallback)((function(e){try{var n=JSON.parse(e.target.value),a=n.elements,c=n.transform;t({elements:a,id:Object(p.a)(),transform:c})}catch(e){console.error(e)}}),[t]),O=Object(c.useCallback)((function(){t(He)}),[t]),g=Object(c.useCallback)((function(){return o((function(e){return!e}))}),[]);return Object(a.jsxs)("div",{style:v,children:[Object(a.jsx)("textarea",{onChange:b,style:Ge,value:JSON.stringify({elements:f,transform:m},null,2)}),Object(a.jsxs)("div",{style:We,children:[Object(a.jsx)("button",{onClick:O,style:{marginRight:10},children:"clear"}),Object(a.jsx)("button",{onClick:g,children:r?"hide":"show"})]})]})};var ze=function(){var e=Object(c.useState)(He),t=Object(u.a)(e,2),n=t[0],i=t[1];return Object(a.jsx)(d,{children:Object(a.jsx)(s.e,{children:Object(a.jsx)(x,{children:Object(a.jsxs)("div",{style:{alignItems:"stretch",display:"flex",height:"100vh"},children:[Object(a.jsx)(Le,{elements:n.elements,transform:n.transform},n.id),Object(a.jsx)(Qe,{setProject:i})]})})})})},Ve=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,37)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(ze,{})}),document.getElementById("root")),Ve()}},[[30,1,2]]]);
//# sourceMappingURL=main.9769613f.chunk.js.map