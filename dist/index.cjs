(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".fluidLightPattern__container{position:relative;width:100%;height:100%}.fluidLightPattern__containerFullscreen{position:fixed;top:0;left:0;width:100vw;height:100vh;overflow:hidden}.fluidLightPattern__fluidCanvas{position:absolute;top:0;left:0;width:100%;height:100%;visibility:hidden}.fluidLightPattern__maskCanvas{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.fluidLightPattern__debug{position:fixed;top:10px;left:10px;background:#000000b3;color:#fff;padding:10px;font-family:monospace;font-size:12px;z-index:9999;border-radius:4px}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const A=require("react/jsx-runtime"),u=require("react"),N=`
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`,Y=`
  precision mediump float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec3 bg_color;
  uniform vec3 p1_color;
  uniform vec3 p2_color;
  uniform vec3 p3_color;
  uniform vec3 p4_color;
  uniform float p1_opacity;
  uniform float p2_opacity;
  uniform float p3_opacity;
  uniform float p4_opacity;
  uniform float p1_scale;
  uniform float p2_scale;
  uniform float p3_scale;
  uniform float p4_scale;

  float pattern1(vec2 c, float s) {
    c /= s;
    vec2 g = mod(floor(c * 0.5), 2.0);
    return mod(g.x + g.y, 2.0);
  }

  float pattern2(vec2 c, float s) {
    c /= s;
    vec2 p = mod(c, 10.0) / 10.0;
    float g1 = step(p.x + p.y, 0.5);
    float g2 = step((1.0 - p.x) + p.y, 0.5);
    float g3 = step(p.x + (1.0 - p.y), 0.5);
    float g4 = step((1.0 - p.x) + (1.0 - p.y), 0.5);
    return max(max(g1, g2), max(g3, g4));
  }

  float pattern3(vec2 c, float s) {
    c /= s;
    vec2 p = mod(c, 20.0);
    return step(p.y, p.x);
  }

  float pattern4(vec2 c, float s) {
    c /= s;
    vec2 p = mod(c, 20.0);
    return step(p.x, p.y);
  }

  void main() {
    vec2 fc = gl_FragCoord.xy;
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = (fc * 2.0 - iResolution.xy) / mr;
    
    // Linear waves
    float d = -iTime * 0.15, a = 0.0;
    for (float i = 0.0; i < 4.0; ++i) {
      a += cos(i - d - a * uv.x * 0.5);
      d += sin(uv.y * i + a * 0.5);
    }
    d += iTime * 0.15;
    float linearWave = sin(d * 0.5 + a * 0.6) * 0.5 + 0.5;
    
    // Radial waves
    float radialWaves = 0.0;
    
    vec2 center1 = vec2(-0.6, 0.4);
    float dist1 = length(uv - center1);
    radialWaves += sin(dist1 * 8.0 - iTime * 0.5) * 0.5 + 0.5;
    
    vec2 center2 = vec2(0.5, -0.3);
    float dist2 = length(uv - center2);
    radialWaves += sin(dist2 * 6.0 - iTime * 0.375) * 0.5 + 0.5;
    
    vec2 center3 = vec2(0.0, 0.0);
    float dist3 = length(uv - center3);
    radialWaves += sin(dist3 * 10.0 - iTime * 0.625) * 0.5 + 0.5;
    
    radialWaves /= 3.0;
    
    // Combine waves
    float fv = mix(linearWave, radialWaves, 0.5);
    
    // Calculate patterns
    float p1 = pattern1(fc, p1_scale);
    float p2 = pattern2(fc, p2_scale);
    float p3 = pattern3(fc, p3_scale);
    float p4 = pattern4(fc, p4_scale);
    
    float pm; vec3 pc; float op;
    
    if (fv < 0.25) {
      pm = p1;
      pc = p1_color;
      op = p1_opacity;
    } else if (fv < 0.5) {
      pm = p2;
      pc = p2_color;
      op = p2_opacity;
    } else if (fv < 0.75) {
      pm = p3;
      pc = p3_color;
      op = p3_opacity;
    } else {
      pm = p4;
      pc = p4_color;
      op = p4_opacity;
    }
    
    gl_FragColor = vec4(mix(bg_color, pc, pm * op), 1.0);
  }
`;function I(d){const o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(d);return o?[parseInt(o[1],16)/255,parseInt(o[2],16)/255,parseInt(o[3],16)/255]:[0,0,0]}function j(d,o){const r=u.useRef(null),m=u.useRef(null),y=u.useRef(null),b=u.useRef(Date.now()),l=u.useRef(null);return u.useEffect(()=>{const c=d.current;if(!c)return;const e=c.getContext("webgl");if(!e){console.error("WebGL not supported");return}r.current=e;const g=()=>{c.width=window.innerWidth,c.height=window.innerHeight,e.viewport(0,0,c.width,c.height)};g();const x=(s,F)=>{const v=e.createShader(F);return v?(e.shaderSource(v,s),e.compileShader(v),v):null},a=e.createProgram();if(!a)return;const f=x(N,e.VERTEX_SHADER),C=x(Y,e.FRAGMENT_SHADER);if(!f||!C)return;e.attachShader(a,f),e.attachShader(a,C),e.linkProgram(a),e.useProgram(a),m.current=a;const p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const S=e.getAttribLocation(a,"position");e.enableVertexAttribArray(S),e.vertexAttribPointer(S,2,e.FLOAT,!1,0,0),y.current={res:e.getUniformLocation(a,"iResolution"),time:e.getUniformLocation(a,"iTime"),bg:e.getUniformLocation(a,"bg_color"),p1c:e.getUniformLocation(a,"p1_color"),p1o:e.getUniformLocation(a,"p1_opacity"),p1s:e.getUniformLocation(a,"p1_scale"),p2c:e.getUniformLocation(a,"p2_color"),p2o:e.getUniformLocation(a,"p2_opacity"),p2s:e.getUniformLocation(a,"p2_scale"),p3c:e.getUniformLocation(a,"p3_color"),p3o:e.getUniformLocation(a,"p3_opacity"),p3s:e.getUniformLocation(a,"p3_scale"),p4c:e.getUniformLocation(a,"p4_color"),p4o:e.getUniformLocation(a,"p4_opacity"),p4s:e.getUniformLocation(a,"p4_scale")};const w=()=>{if(!e||!y.current)return;const s=y.current,F=I(o.backgroundColor),v=I(o.patternColor);e.uniform2f(s.res,c.width,c.height),e.uniform1f(s.time,(Date.now()-b.current)/1e3*o.animationSpeed),e.uniform3fv(s.bg,F),e.uniform3fv(s.p1c,v),e.uniform1f(s.p1o,o.patternOpacity),e.uniform1f(s.p1s,o.pattern1Scale),e.uniform3fv(s.p2c,v),e.uniform1f(s.p2o,o.patternOpacity),e.uniform1f(s.p2s,o.pattern2Scale),e.uniform3fv(s.p3c,v),e.uniform1f(s.p3o,o.patternOpacity),e.uniform1f(s.p3s,o.pattern3Scale),e.uniform3fv(s.p4c,v),e.uniform1f(s.p4o,o.patternOpacity),e.uniform1f(s.p4s,o.pattern4Scale),e.drawArrays(e.TRIANGLE_STRIP,0,4),l.current=requestAnimationFrame(w)};return w(),window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g),l.current&&cancelAnimationFrame(l.current)}},[d,o]),r}function z(d,o,r){if(o==="none"||r===0)return 1;let m=1;switch(o){case"linear":m=1-d;break;case"exponential":m=Math.pow(1-d,2);break;case"logarithmic":m=1-Math.pow(d,.5);break}return 1-(1-m)*r}function X(d,o,r,m){const[y,b]=u.useState({spots:0,fps:0}),l=u.useRef([]),c=u.useRef({x:0,y:0,prevX:0,prevY:0}),e=u.useRef({x:0,y:0}),g=u.useRef({currentRadius:0,currentOpacity:0,lastMoveTime:Date.now()}),x=u.useRef({frameCount:0,lastFpsTime:Date.now(),fps:0}),a=u.useRef(null);return u.useEffect(()=>{const f=d.current,C=o.current;if(!f||!C)return;const p=f.getContext("2d");if(!p)return;const S=()=>{if(!f)return;const t=f.getBoundingClientRect();f.width=t.width,f.height=t.height};S();const w=t=>{if(!f)return;const i=f.getBoundingClientRect();c.current.x=t.clientX-i.left,c.current.y=t.clientY-i.top},s=(t,i,n,L,h)=>{l.current.push({x:t,y:i,opacity:n,baseOpacity:n,radius:r.baseRadius,velX:L,velY:h,age:0,createdAt:Date.now()}),l.current.length>150&&l.current.shift()},F=()=>{for(let t=l.current.length-1;t>=0;t--){const i=l.current[t];i.age++;const n=Math.min(i.age*r.fadeSpeed,1);i.opacity-=r.fadeSpeed,i.radius-=r.fadeSpeed*100*r.trailTaper;const L=z(n,r.ageFadeType,r.ageFadeStrength),h=i.opacity*L;if(h<=.01||i.radius<=10){l.current.splice(t,1);continue}i.renderOpacity=h}},v=t=>{p.save();const i=t.renderOpacity!==void 0?t.renderOpacity:t.opacity,n=p.createRadialGradient(t.x,t.y,0,t.x,t.y,t.radius+r.blurAmount);n.addColorStop(0,`rgba(255, 255, 255, ${i})`),n.addColorStop(.6,`rgba(255, 255, 255, ${i*.5})`),n.addColorStop(1,"rgba(255, 255, 255, 0)"),p.beginPath(),p.arc(t.x,t.y,t.radius+r.blurAmount,0,Math.PI*2),p.fillStyle=n,p.filter=`blur(${r.blurAmount}px)`,p.fill(),p.restore()},E=()=>{p.clearRect(0,0,f.width,f.height);const t=c.current,i=e.current,n=g.current,L=t.x-t.prevX,h=t.y-t.prevY,U=L!==0||h!==0;i.x=i.x*.8+L*.2,i.y=i.y*.8+h*.2;const M=Date.now()-n.lastMoveTime<=r.closeDelay;let O=!1;if(U?(n.lastMoveTime=Date.now(),O=!0):O=M,O){const _=r.mainCloseSpeed*100;n.currentRadius+=_,n.currentRadius>r.baseRadius&&(n.currentRadius=r.baseRadius);const W=n.currentRadius/r.baseRadius;n.currentOpacity=r.currentOpacity*W}else{n.currentRadius-=r.mainCloseSpeed*100*r.mainCloseTaper,n.currentRadius<0&&(n.currentRadius=0);const _=n.currentRadius/r.baseRadius;n.currentOpacity=r.currentOpacity*_}if(O&&(U||M)){const _=r.currentOpacity*r.trailMultiplier;s(t.x,t.y,_,i.x,i.y)}F(),p.globalCompositeOperation="source-over",l.current.forEach(_=>{v(_)}),n.currentRadius>0&&v({x:t.x,y:t.y,opacity:n.currentOpacity,baseOpacity:n.currentOpacity,radius:n.currentRadius,velX:i.x,velY:i.y}),p.globalCompositeOperation="source-in",p.drawImage(C,0,0),p.globalCompositeOperation="source-over";const R=x.current;R.frameCount++;const D=Date.now();D-R.lastFpsTime>=1e3&&(R.fps=R.frameCount,R.frameCount=0,R.lastFpsTime=D,m&&b({spots:l.current.length+1,fps:R.fps})),t.prevX=t.x,t.prevY=t.y,a.current=requestAnimationFrame(E)},P=f.getBoundingClientRect();return c.current.x=P.width/2,c.current.y=P.height/2,c.current.prevX=c.current.x,c.current.prevY=c.current.y,E(),document.addEventListener("mousemove",w),window.addEventListener("resize",S),()=>{document.removeEventListener("mousemove",w),window.removeEventListener("resize",S),a.current&&cancelAnimationFrame(a.current)}},[d,o,r,m]),y}const k={baseRadius:190,blurAmount:30,currentOpacity:.9,trailMultiplier:.4,fadeSpeed:.007,trailTaper:2,ageFadeType:"exponential",ageFadeStrength:.7,closeDelay:300,mainCloseSpeed:.01,mainCloseTaper:1,backgroundColor:"#000000",patternColor:"#0d00ff",patternOpacity:1,pattern1Scale:1.5,pattern2Scale:.5,pattern3Scale:.3,pattern4Scale:.3,animationSpeed:1},T={container:"fluidLightPattern__container",containerFullscreen:"fluidLightPattern__containerFullscreen",fluidCanvas:"fluidLightPattern__fluidCanvas",maskCanvas:"fluidLightPattern__maskCanvas",debug:"fluidLightPattern__debug"},B=({fullscreen:d=!1,className:o,style:r,config:m,showDebug:y=!1,zIndex:b={fluid:1,mask:2}})=>{const l=u.useRef(null),c=u.useRef(null),e=u.useMemo(()=>({...k,...m}),[m]);j(l,e);const g=X(c,l,e,y),x=`${T.container} ${d?T.containerFullscreen:""} ${o||""}`.trim();return A.jsxs("div",{className:x,style:r,children:[A.jsx("canvas",{ref:l,className:T.fluidCanvas,style:{zIndex:b.fluid}}),A.jsx("canvas",{ref:c,className:T.maskCanvas,style:{zIndex:b.mask}}),y&&A.jsxs("div",{className:T.debug,children:["Light spots: ",g.spots,A.jsx("br",{}),"FPS: ",g.fps]})]})};B.displayName="FluidLightPattern";exports.DEFAULT_CONFIG=k;exports.FluidLightPattern=B;
