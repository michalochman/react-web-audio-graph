(this["webpackJsonpreact-web-audio-graph"]=this["webpackJsonpreact-web-audio-graph"]||[]).push([[0],{25:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n(0),i=n.n(a),o=n(7),r=n.n(o),u=(n(25),n(5)),s=n(2),l=Object(a.createContext)(null);var d=function(e){var t=e.children,n=Object(a.useMemo)((function(){try{return window.AudioContext||(window.AudioContext=window.webkitAudioContext),new window.AudioContext}catch(e){}}),[]),i=Object(a.useCallback)((function(){"suspended"===(null===n||void 0===n?void 0:n.state)&&n.resume()}),[n]);return n?Object(c.jsx)("div",{onClick:i,children:Object(c.jsx)(l.Provider,{value:n,children:t})}):Object(c.jsx)("div",{children:"Sorry, but the Web Audio API is not supported by your browser."})},j=n(3),f=n(15),b=n(4),O=n.n(b),v=n(12),m=n(34),h=n(35),p=n(10),x=Object(a.createContext)(null);function g(){return Object(a.useContext)(x)}var y=n(16);var N=function(e){var t=e.dataGetter,n=e.node,i=e.paused,o=Object(y.a)(e,["dataGetter","node","paused"]),r=Object(a.useRef)(new Uint8Array(n.frequencyBinCount)),u=Object(a.useRef)(null),s=Object(a.useCallback)((function(){var e=u.current,n=null===e||void 0===e?void 0:e.getContext("2d");e&&n&&("getByteTimeDomainData"===t?function(e,t){var n=0,c=e.canvas.height,a=e.canvas.width,i=t.length,o=a/i;e.fillStyle="#001400",e.fillRect(0,0,a,256),e.lineWidth=2,e.strokeStyle="#00c800",e.beginPath(),e.moveTo(n,c-t[0]/128*c/2);for(var r=1;r<i;r++){var u=t[r]/128*c/2;e.lineTo(n,c-u),n+=o}e.stroke()}(n,r.current):"getByteFrequencyData"===t&&function(e,t){var n=0,c=e.canvas.height,a=e.canvas.width,i=t.length,o=a/i;e.fillStyle="#001400",e.fillRect(0,0,a,256),e.fillStyle="#00c800";for(var r=0;r<i;r++){var u=c*(t[r]/255),s=c-u;e.fillRect(n,s,o,u),n+=o}}(n,r.current))}),[t]),l=Object(a.useCallback)((function(){var e=n.frequencyBinCount,c=new Uint8Array(e);n[t].call(n,c),r.current=c}),[n,t]);return function(e,t){var n=Object(a.useRef)(),c=Object(a.useRef)(),i=null===t||void 0===t?void 0:t.maxFPS,o=Object(a.useCallback)((function(t){if(null!=n.current){var a=t-n.current;(!i||a>1e3/i)&&(e(a),n.current=t)}else e(0),n.current=t;c.current=requestAnimationFrame(o)}),[e]);Object(a.useEffect)((function(){return c.current=requestAnimationFrame(o),function(){null!=c.current&&cancelAnimationFrame(c.current)}}),[o])}(Object(a.useCallback)((function(){i||(l(),s())}),[s,l,i])),Object(c.jsx)("canvas",Object(j.a)({ref:u,style:{display:"block"}},o))};function C(e){var t=e.children,n=e.id,a=e.inputs,i=e.outputs,o=e.type;return Object(c.jsxs)("div",{className:"customNode",title:n,children:[Object(c.jsx)("div",{className:"customNode_header",children:o}),Object(c.jsxs)("div",{className:"customNode_body",children:[a&&Object(c.jsx)("div",{className:"customNode_inputs",children:a.map((function(e){return Object(c.jsxs)("div",{className:"customNode_item",children:[Object(c.jsx)(s.c,{id:e,position:s.d.Left,type:"target"}),e]},e)}))}),i&&Object(c.jsx)("div",{className:"customNode_outputs",children:i.map((function(e){return Object(c.jsxs)("div",{className:"customNode_item",children:[Object(c.jsx)(s.c,{id:e,position:s.d.Right,type:"source"}),e]},e)}))})]}),t]})}var w=i.a.memo(C),k=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("Analyser render",t,n,i);var r=t.dataGetter,u=void 0===r?"getByteTimeDomainData":r,s=t.fftSizeExp,d=void 0===s?11:s,j=t.onChange,f=t.paused,b=void 0!==f&&f,O=Object(a.useContext)(l),v=Object(a.useMemo)((function(){return O.createAnalyser()}),[O]),m=g().addNode;return Object(a.useEffect)((function(){m(n,v)}),[m,v,n]),Object(a.useEffect)((function(){v.fftSize=Math.pow(2,d)}),[v,d]),Object(c.jsxs)(w,{id:n,inputs:["input","fftSize"],outputs:["output"],type:o,children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)(N,{dataGetter:u,node:v,paused:b,height:64,width:256})}),i&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsxs)("div",{className:"customNode_item",children:[Object(c.jsx)("input",{className:"nodrag",type:"range",max:"11",min:"5",onChange:function(e){return j({fftSizeExp:+e.target.value})},step:1,value:d}),Math.pow(2,d)]}),Object(c.jsxs)("div",{className:"customNode_item",style:{justifyContent:"space-between"},children:[Object(c.jsxs)("select",{onChange:function(e){return j({dataGetter:e.target.value})},value:u,children:[Object(c.jsx)("option",{value:"getByteFrequencyData",children:"Frequency"}),Object(c.jsx)("option",{value:"getByteTimeDomainData",children:"Time Domain"})]}),Object(c.jsxs)("label",{style:{alignItems:"center",display:"flex"},children:[Object(c.jsx)("input",{className:"nodrag",type:"checkbox",checked:b,onChange:function(e){return j({paused:!b})}}),"Paused"]})]})]})]})},E=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("BiquadFilter render",t,n,i);var r=t.detune,u=void 0===r?0:r,s=t.gain,d=void 0===s?0:s,j=t.frequency,f=void 0===j?350:j,b=t.Q,O=void 0===b?1:b,v=t.onChange,m=t.type,h=void 0===m?"lowpass":m,p=Object(a.useContext)(l),x=Object(a.useMemo)((function(){return p.createBiquadFilter()}),[p]),y=g().addNode;return Object(a.useEffect)((function(){y(n,x)}),[y,x,n]),Object(a.useEffect)((function(){x.detune.value=u}),[x,u]),Object(a.useEffect)((function(){x.frequency.value=f}),[x,f]),Object(a.useEffect)((function(){x.gain.value=d}),[x,d]),Object(a.useEffect)((function(){x.Q.value=O}),[x,O]),Object(a.useEffect)((function(){x.type=h}),[x,h]),Object(c.jsx)(w,{id:n,inputs:["input","detune","frequency","gain","Q"],outputs:["output"],type:o,children:i&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return v({detune:+e.target.value})},step:1,type:"range",value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:0,max:22050,onChange:function(e){return v({frequency:+e.target.value})},type:"number",value:f})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-40,max:40,onChange:function(e){return v({gain:+e.target.value})},step:.1,type:"range",value:d})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:1e-4,max:1e3,onChange:function(e){return v({Q:+e.target.value})},type:"number",value:O})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return v({type:e.target.value})},value:h,children:[Object(c.jsx)("option",{value:"lowpass",children:"lowpass"}),Object(c.jsx)("option",{value:"highpass",children:"highpass"}),Object(c.jsx)("option",{value:"bandpass",children:"bandpass"}),Object(c.jsx)("option",{value:"lowshelf",children:"lowshelf"}),Object(c.jsx)("option",{value:"highshelf",children:"highshelf"}),Object(c.jsx)("option",{value:"peaking",children:"peaking"}),Object(c.jsx)("option",{value:"notch",children:"notch"}),Object(c.jsx)("option",{value:"allpass",children:"allpass"})]})})]})})},_=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("ConstantSource render",t,n,i);var r=t.offset,u=void 0===r?1:r,s=t.onChange,d=Object(a.useContext)(l),j=Object(a.useMemo)((function(){return d.createConstantSource()}),[d]);Object(a.useEffect)((function(){return j.start(),function(){return j.stop()}}),[j]);var f=g().addNode;return Object(a.useEffect)((function(){f(n,j)}),[f,j,n]),Object(a.useEffect)((function(){return j.offset.value=u}),[j,u]),Object(c.jsx)(w,{id:n,outputs:["output"],type:o,children:i&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"number",onChange:function(e){return s({offset:+e.target.value})},style:{width:"100%"},value:u})})})})},S=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("Delay render",t,n,i);var r=t.delayTime,u=void 0===r?1:r,s=t.onChange,d=Object(a.useContext)(l),j=Object(a.useMemo)((function(){return d.createDelay()}),[d]),f=g().addNode;return Object(a.useEffect)((function(){f(n,j)}),[f,j,n]),Object(a.useEffect)((function(){j.delayTime.value=u}),[j,u]),Object(c.jsx)(w,{id:n,inputs:["input","delayTime"],outputs:["output"],type:o,children:i&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"number",onChange:function(e){return s({delayTime:+e.target.value})},value:u})})})})},A=function(e){var t=e.id,n=e.type,i=Object(a.useContext)(l).destination,o=g().addNode;return Object(a.useEffect)((function(){o(t,i)}),[o,i,t]),Object(c.jsx)(w,{id:t,inputs:["input"],type:n})},D=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("DynamicsCompressor render",t,n,i);var r=t.attack,u=void 0===r?.003:r,s=t.knee,d=void 0===s?30:s,j=t.onChange,f=t.ratio,b=void 0===f?12:f,O=t.release,v=void 0===O?.25:O,m=t.threshold,h=void 0===m?-24:m,p=Object(a.useContext)(l),x=Object(a.useMemo)((function(){return p.createDynamicsCompressor()}),[p]),y=g().addNode;return Object(a.useEffect)((function(){y(n,x)}),[y,x,n]),Object(a.useEffect)((function(){x.threshold.value=h}),[x,h]),Object(a.useEffect)((function(){x.knee.value=d}),[x,d]),Object(a.useEffect)((function(){x.ratio.value=b}),[x,b]),Object(a.useEffect)((function(){x.attack.value=u}),[x,u]),Object(a.useEffect)((function(){x.release.value=v}),[x,v]),Object(c.jsx)(w,{id:n,inputs:["input","threshold","knee","ratio","attack","release"],outputs:["output"],type:o,children:i&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"0",min:"-100",step:"1",onChange:function(e){return j({threshold:+e.target.value})},value:h})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"40",min:"0",step:"1",onChange:function(e){return j({knee:+e.target.value})},value:d})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"20",min:"1",step:"1",onChange:function(e){return j({ratio:+e.target.value})},value:b})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.001",onChange:function(e){return j({attack:+e.target.value})},value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.001",onChange:function(e){return j({release:+e.target.value})},value:v})})]})})},q=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("Gain render",t,n,i);var r=t.gain,u=void 0===r?1:r,s=t.onChange,d=Object(a.useContext)(l),j=Object(a.useMemo)((function(){return d.createGain()}),[d]),f=g().addNode;return Object(a.useEffect)((function(){f(n,j)}),[f,j,n]),Object(a.useEffect)((function(){j.gain.value=u}),[j,u]),Object(c.jsx)(w,{id:n,inputs:["input","gain"],outputs:["output"],type:o,children:i&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"-1",step:"0.01",onChange:function(e){return s({gain:+e.target.value})},value:u})})})})},F=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("Oscillator render",t,n,i);var r=t.detune,u=void 0===r?0:r,s=t.frequency,d=void 0===s?440:s,j=t.onChange,f=t.type,b=void 0===f?"sine":f,O=Object(a.useContext)(l),v=Object(a.useMemo)((function(){return O.createOscillator()}),[O]);Object(a.useEffect)((function(){return v.start(),function(){return v.stop()}}),[v]);var m=g().addNode;return Object(a.useEffect)((function(){m(n,v)}),[m,v,n]),Object(a.useEffect)((function(){v.detune.value=null!==u&&void 0!==u?u:0}),[v,u]),Object(a.useEffect)((function(){v.frequency.value=null!==d&&void 0!==d?d:440}),[v,d]),Object(a.useEffect)((function(){v.type=null!==b&&void 0!==b?b:"sine"}),[v,b]),Object(c.jsx)(w,{id:n,inputs:["detune","frequency"],outputs:["output"],type:o,children:i&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return j({detune:+e.target.value})},step:1,type:"number",value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:0,max:2e4,onChange:function(e){return j({frequency:+e.target.value})},type:"number",value:d})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return j({type:e.target.value})},value:b,children:[Object(c.jsx)("option",{value:"sawtooth",children:"sawtooth"}),Object(c.jsx)("option",{value:"square",children:"square"}),Object(c.jsx)("option",{value:"sine",children:"sine"}),Object(c.jsx)("option",{value:"triangle",children:"triangle"})]})})]})})},B=["C","C^#","D","D^#","E","F","F^#","G","G^#","A","A^#","B"];function M(e){if(e<0||e>10)throw new RangeError("Octave must be between 0 and 10, is ".concat(e))}function R(e){if(e<0||e>11)throw new RangeError("Octave must be between 0 and 11, is ".concat(e))}var T=function(e){var t=e.data,n=e.id,i=e.selected,o=e.type;console.log("OscillatorNote render",t,n,i);var r=t.detune,u=void 0===r?0:r,s=t.octave,d=void 0===s?4:s,j=t.onChange,f=t.twelfth,b=void 0===f?0:f,O=t.type,v=void 0===O?"sine":O,m=function(e,t){return M(e),R(t),16.35*Math.pow(2,e+t/12)}(d,b),h=function(e,t){return M(e),R(t),"".concat(B[t%12],"_").concat(e)}(d,b),p=Object(a.useContext)(l),x=Object(a.useMemo)((function(){return p.createOscillator()}),[p]);Object(a.useEffect)((function(){return x.start(),function(){return x.stop()}}),[x]);var y=g().addNode;return Object(a.useEffect)((function(){y(n,x)}),[y,x,n]),Object(a.useEffect)((function(){x.detune.value=null!==u&&void 0!==u?u:0}),[x,u]),Object(a.useEffect)((function(){x.frequency.value=m}),[x,m]),Object(a.useEffect)((function(){x.type=null!==v&&void 0!==v?v:"sine"}),[x,v]),Object(c.jsx)(w,{id:n,inputs:["detune"],outputs:["output"],type:o,children:i&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return j({detune:+e.target.value})},step:1,type:"number",value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("div",{children:[Object(c.jsx)("button",{onClick:function(){return j({octave:(11+d-1)%11})},children:"-"}),Object(c.jsx)("button",{onClick:function(){return j({octave:(d+1)%11})},children:"+"}),"octave: ",d,Object(c.jsx)("br",{}),Object(c.jsx)("button",{onClick:function(){return j({twelfth:(12+b-1)%12})},children:"-"}),Object(c.jsx)("button",{onClick:function(){return j({twelfth:(b+1)%12})},children:"+"}),"twelfth:",b,Object(c.jsx)("br",{}),h," @ ",m.toFixed(2)," Hz"]})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return j({type:e.target.value})},value:v,children:[Object(c.jsx)("option",{value:"sawtooth",children:"sawtooth"}),Object(c.jsx)("option",{value:"square",children:"square"}),Object(c.jsx)("option",{value:"sine",children:"sine"}),Object(c.jsx)("option",{value:"triangle",children:"triangle"})]})})]})})};var G={Analyser:i.a.memo(k),BiquadFilter:i.a.memo(E),ConstantSource:i.a.memo(_),Delay:i.a.memo(S),Destination:i.a.memo(A),DynamicsCompressor:i.a.memo(D),Gain:i.a.memo(q),Oscillator:i.a.memo(F),OscillatorNote:i.a.memo(T)};function P(e,t){return z.apply(this,arguments)}function z(){return(z=Object(v.a)(O.a.mark((function e(t,n){var c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=t.filter(s.h).reduce((function(e,t){return e[t.source]=!0,e[t.target]=!0,e}),{});case 1:if(!Object.keys(c).length){e.next=7;break}return Object.keys(n).forEach((function(e){delete c[e]})),e.next=5,new Promise((function(e){return setTimeout(e,0)}));case 5:e.next=1;break;case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(e){var t=e.elements,n=i.a.useState(!1),o=Object(u.a)(n,2),r=o[0],l=o[1],d=i.a.useState(),b=Object(u.a)(d,2),x=b[0],y=b[1],N=i.a.useState(null),C=Object(u.a)(N,2),w=C[0],k=C[1],E=Object(m.a)(w,x,{placement:"bottom-start"}),_=E.styles,S=E.attributes,A=Object(s.k)((function(e){return e.transform})),D=Object(a.useState)(t),q=Object(u.a)(D,2),F=q[0],B=q[1],M=g().nodes,R=function(){var e=g().nodes;return Object(a.useCallback)((function(t){if(console.log("Connection created",t),t.source&&t.target&&t.targetHandle){var n=e[t.source],c=e[t.target],a=t.targetHandle;"input"===a?n.connect(c):(n.connect(c[a]),c[a].value=0)}}),[e])}(),T=function(){var e=g().nodes;return Object(a.useCallback)((function(t){if(console.log("Connection removed",t),t.source&&t.target&&t.targetHandle){var n=e[t.source],c=e[t.target],a=t.targetHandle;"input"===a?n.disconnect(c):(n.disconnect(c[a]),c[a].value=c[a].defaultValue)}}),[e])}(),z=function(){var e=g().nodes;return Object(a.useCallback)((function(t){console.log("Node removed",t,e);var n=e[t];n&&n.disconnect()}),[e])}(),I=function(e){return function(t){B(Object(p.a)((function(n){var c=n.filter(s.i).find((function(t){return t.id===e}));c&&Object.keys(t).forEach((function(e){return c.data[e]=t[e]}))})))}},J=function(){var e=Object(v.a)(O.a.mark((function e(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return B(Object(p.a)((function(e){e.filter(s.i).forEach((function(e){e.data.onChange=I(e.id)}))}))),e.next=3,P(t,M);case 3:t.filter(s.h).forEach((function(e){return R(e)}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=Object(a.useCallback)((function(e){e.filter(s.h).forEach((function(e){return T(e)})),e.filter(s.i).forEach((function(e){return z(e.id)})),B((function(t){return Object(s.j)(e,t)}))}),[T,z]),L=Object(a.useCallback)((function(e){var t="".concat(e,"-").concat(Object(h.a)()),n={id:t,data:{onChange:I(t)},type:e,position:{x:(w.getBoundingClientRect().left-A[0])/A[2],y:(w.getBoundingClientRect().top-A[1])/A[2]}};B((function(e){return[].concat(Object(f.a)(e),[n])})),l(!1)}),[A,w]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(s.g,{elements:F,nodeTypes:G,onConnect:function(e){B((function(t){return Object(s.f)(e,t)})),R(e)},onEdgeUpdate:function(e,t){T(e),B((function(t){return Object(s.j)([e],t)})),B((function(e){return Object(s.f)(t,e)})),R(t)},onElementsRemove:H,onLoad:J,onNodeDragStop:function(e,t){B(Object(p.a)((function(e){var n=e.filter(s.i).find((function(e){return e.id===t.id}));n&&(n.position=t.position)})))},onPaneClick:function(e){l(!!(null===x||void 0===x?void 0:x.contains(e.target)))},onPaneContextMenu:function(e){e.preventDefault(),l(!0),k({getBoundingClientRect:function(){return{top:10*Math.floor(e.clientY/10),left:10*Math.floor(e.clientX/10),height:0,width:0}}})},onlyRenderVisibleElements:!1,snapToGrid:!0,snapGrid:[10,10],style:{zIndex:0},children:[Object(c.jsx)(s.a,{gap:10}),Object(c.jsx)(s.b,{})]}),r&&Object(c.jsx)("div",Object(j.a)(Object(j.a)({ref:function(e){return e&&y(e)},style:_.popper},S.popper),{},{children:Object(c.jsxs)("ul",{className:"contextMenu",children:[Object(c.jsx)("li",{onClick:function(){return L("Analyser")},children:"Add Analyser"}),Object(c.jsx)("li",{onClick:function(){return L("BiquadFilter")},children:"Add Biquad Filter"}),Object(c.jsx)("li",{onClick:function(){return L("ConstantSource")},children:"Add Constant Source"}),Object(c.jsx)("li",{onClick:function(){return L("Delay")},children:"Add Delay"}),Object(c.jsx)("li",{onClick:function(){return L("Destination")},children:"Add Destination"}),Object(c.jsx)("li",{onClick:function(){return L("DynamicsCompressor")},children:"Add Dynamics Compressor"}),Object(c.jsx)("li",{onClick:function(){return L("Gain")},children:"Add Gain"}),Object(c.jsx)("li",{onClick:function(){return L("Oscillator")},children:"Add Oscillator"}),Object(c.jsx)("li",{onClick:function(){return L("OscillatorNote")},children:"Add Oscillator Note"})]})}))]})}var J=i.a.memo(I);var H=function(e){var t=e.setProject,n=Object(s.k)((function(e){return e.elements})).map((function(e){return Object(j.a)(Object(j.a)({},e),{},{__rf:void 0})})),i=JSON.stringify(n);Object(a.useEffect)((function(){var e=atob(window.location.hash.substr(1));try{var n=JSON.parse(e);t({id:Object(h.a)(),elements:n})}catch(c){}}),[t]),Object(a.useEffect)((function(){window.location.hash=btoa(i)}),[i]);var o=Object(a.useCallback)((function(e){try{var n=JSON.parse(e.target.value);t({elements:n,id:Object(h.a)()})}catch(e){console.error(e)}}),[t]);return Object(c.jsx)("div",{style:{padding:10,width:400},children:Object(c.jsx)("textarea",{onChange:o,style:{fontSize:12,height:"100%",resize:"none",width:"100%"},value:JSON.stringify(n,null,2)})})};var L=function(e){var t=e.children,n=Object(a.useRef)({}),i=Object(a.useMemo)((function(){return{addNode:function(e,t){n.current[e]=t},nodes:n.current}}),[]);return Object(c.jsx)("div",{children:Object(c.jsx)(x.Provider,{value:i,children:t})})};var Q=function(){var e=Object(a.useState)({id:"",elements:[]}),t=Object(u.a)(e,2),n=t[0],i=t[1];return Object(c.jsx)(d,{children:Object(c.jsx)(L,{children:Object(c.jsx)(s.e,{children:Object(c.jsxs)("div",{style:{alignItems:"stretch",display:"flex",height:"100vh"},children:[Object(c.jsx)(J,{elements:n.elements},n.id),Object(c.jsx)(H,{setProject:i})]})})})})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),i(e),o(e)}))};r.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(Q,{})}),document.getElementById("root")),U()}},[[29,1,2]]]);
//# sourceMappingURL=main.c3c6294c.chunk.js.map