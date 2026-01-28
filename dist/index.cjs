"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const A=require("react/jsx-runtime"),u=require("react"),j=`
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`,N=`
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
`;function I(f){const o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);return o?[parseInt(o[1],16)/255,parseInt(o[2],16)/255,parseInt(o[3],16)/255]:[0,0,0]}function B(f,o){const r=u.useRef(null),d=u.useRef(null),y=u.useRef(null),x=u.useRef(Date.now()),l=u.useRef(null);return u.useEffect(()=>{const i=f.current;if(!i)return;const e=i.getContext("webgl");if(!e){console.error("WebGL not supported");return}r.current=e;const g=()=>{i.width=window.innerWidth,i.height=window.innerHeight,e.viewport(0,0,i.width,i.height)};g();const b=(s,F)=>{const m=e.createShader(F);return m?(e.shaderSource(m,s),e.compileShader(m),m):null},a=e.createProgram();if(!a)return;const v=b(j,e.VERTEX_SHADER),C=b(N,e.FRAGMENT_SHADER);if(!v||!C)return;e.attachShader(a,v),e.attachShader(a,C),e.linkProgram(a),e.useProgram(a),d.current=a;const p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const w=e.getAttribLocation(a,"position");e.enableVertexAttribArray(w),e.vertexAttribPointer(w,2,e.FLOAT,!1,0,0),y.current={res:e.getUniformLocation(a,"iResolution"),time:e.getUniformLocation(a,"iTime"),bg:e.getUniformLocation(a,"bg_color"),p1c:e.getUniformLocation(a,"p1_color"),p1o:e.getUniformLocation(a,"p1_opacity"),p1s:e.getUniformLocation(a,"p1_scale"),p2c:e.getUniformLocation(a,"p2_color"),p2o:e.getUniformLocation(a,"p2_opacity"),p2s:e.getUniformLocation(a,"p2_scale"),p3c:e.getUniformLocation(a,"p3_color"),p3o:e.getUniformLocation(a,"p3_opacity"),p3s:e.getUniformLocation(a,"p3_scale"),p4c:e.getUniformLocation(a,"p4_color"),p4o:e.getUniformLocation(a,"p4_opacity"),p4s:e.getUniformLocation(a,"p4_scale")};const L=()=>{if(!e||!y.current)return;const s=y.current,F=I(o.backgroundColor),m=I(o.patternColor);e.uniform2f(s.res,i.width,i.height),e.uniform1f(s.time,(Date.now()-x.current)/1e3*o.animationSpeed),e.uniform3fv(s.bg,F),e.uniform3fv(s.p1c,m),e.uniform1f(s.p1o,o.patternOpacity),e.uniform1f(s.p1s,o.pattern1Scale),e.uniform3fv(s.p2c,m),e.uniform1f(s.p2o,o.patternOpacity),e.uniform1f(s.p2s,o.pattern2Scale),e.uniform3fv(s.p3c,m),e.uniform1f(s.p3o,o.patternOpacity),e.uniform1f(s.p3s,o.pattern3Scale),e.uniform3fv(s.p4c,m),e.uniform1f(s.p4o,o.patternOpacity),e.uniform1f(s.p4s,o.pattern4Scale),e.drawArrays(e.TRIANGLE_STRIP,0,4),l.current=requestAnimationFrame(L)};return L(),window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g),l.current&&cancelAnimationFrame(l.current)}},[f,o]),r}function Y(f,o,r){if(o==="none"||r===0)return 1;let d=1;switch(o){case"linear":d=1-f;break;case"exponential":d=Math.pow(1-f,2);break;case"logarithmic":d=1-Math.pow(f,.5);break}return 1-(1-d)*r}function z(f,o,r,d){const[y,x]=u.useState({spots:0,fps:0}),l=u.useRef([]),i=u.useRef({x:0,y:0,prevX:0,prevY:0}),e=u.useRef({x:0,y:0}),g=u.useRef({currentRadius:0,currentOpacity:0,lastMoveTime:Date.now()}),b=u.useRef({frameCount:0,lastFpsTime:Date.now(),fps:0}),a=u.useRef(null);return u.useEffect(()=>{const v=f.current,C=o.current;if(!v||!C)return;const p=v.getContext("2d");if(!p)return;const w=()=>{v.width=window.innerWidth,v.height=window.innerHeight};w();const L=t=>{i.current.x=t.clientX,i.current.y=t.clientY},s=(t,c,n,S,R)=>{l.current.push({x:t,y:c,opacity:n,baseOpacity:n,radius:r.baseRadius,velX:S,velY:R,age:0,createdAt:Date.now()}),l.current.length>150&&l.current.shift()},F=()=>{for(let t=l.current.length-1;t>=0;t--){const c=l.current[t];c.age++;const n=Math.min(c.age*r.fadeSpeed,1);c.opacity-=r.fadeSpeed,c.radius-=r.fadeSpeed*100*r.trailTaper;const S=Y(n,r.ageFadeType,r.ageFadeStrength),R=c.opacity*S;if(R<=.01||c.radius<=10){l.current.splice(t,1);continue}c.renderOpacity=R}},m=t=>{p.save();const c=t.renderOpacity!==void 0?t.renderOpacity:t.opacity,n=p.createRadialGradient(t.x,t.y,0,t.x,t.y,t.radius+r.blurAmount);n.addColorStop(0,`rgba(255, 255, 255, ${c})`),n.addColorStop(.6,`rgba(255, 255, 255, ${c*.5})`),n.addColorStop(1,"rgba(255, 255, 255, 0)"),p.beginPath(),p.arc(t.x,t.y,t.radius+r.blurAmount,0,Math.PI*2),p.fillStyle=n,p.filter=`blur(${r.blurAmount}px)`,p.fill(),p.restore()},E=()=>{p.clearRect(0,0,v.width,v.height);const t=i.current,c=e.current,n=g.current,S=t.x-t.prevX,R=t.y-t.prevY,U=S!==0||R!==0;c.x=c.x*.8+S*.2,c.y=c.y*.8+R*.2;const M=Date.now()-n.lastMoveTime<=r.closeDelay;let O=!1;if(U?(n.lastMoveTime=Date.now(),O=!0):O=M,O){const h=r.mainCloseSpeed*100;n.currentRadius+=h,n.currentRadius>r.baseRadius&&(n.currentRadius=r.baseRadius);const W=n.currentRadius/r.baseRadius;n.currentOpacity=r.currentOpacity*W}else{n.currentRadius-=r.mainCloseSpeed*100*r.mainCloseTaper,n.currentRadius<0&&(n.currentRadius=0);const h=n.currentRadius/r.baseRadius;n.currentOpacity=r.currentOpacity*h}if(O&&(U||M)){const h=r.currentOpacity*r.trailMultiplier;s(t.x,t.y,h,c.x,c.y)}F(),p.globalCompositeOperation="source-over",l.current.forEach(h=>{m(h)}),n.currentRadius>0&&m({x:t.x,y:t.y,opacity:n.currentOpacity,baseOpacity:n.currentOpacity,radius:n.currentRadius,velX:c.x,velY:c.y}),p.globalCompositeOperation="source-in",p.drawImage(C,0,0),p.globalCompositeOperation="source-over";const _=b.current;_.frameCount++;const D=Date.now();D-_.lastFpsTime>=1e3&&(_.fps=_.frameCount,_.frameCount=0,_.lastFpsTime=D,d&&x({spots:l.current.length+1,fps:_.fps})),t.prevX=t.x,t.prevY=t.y,a.current=requestAnimationFrame(E)};return i.current.x=window.innerWidth/2,i.current.y=window.innerHeight/2,i.current.prevX=i.current.x,i.current.prevY=i.current.y,E(),document.addEventListener("mousemove",L),window.addEventListener("resize",w),()=>{document.removeEventListener("mousemove",L),window.removeEventListener("resize",w),a.current&&cancelAnimationFrame(a.current)}},[f,o,r,d]),y}const P={baseRadius:190,blurAmount:30,currentOpacity:.9,trailMultiplier:.4,fadeSpeed:.007,trailTaper:2,ageFadeType:"exponential",ageFadeStrength:.7,closeDelay:300,mainCloseSpeed:.01,mainCloseTaper:1,backgroundColor:"#000000",patternColor:"#0d00ff",patternOpacity:1,pattern1Scale:1.5,pattern2Scale:.5,pattern3Scale:.3,pattern4Scale:.3,animationSpeed:1},X="_container_wjdnx_1",$="_containerFullscreen_wjdnx_13",G="_fluidCanvas_wjdnx_31",H="_maskCanvas_wjdnx_49",q="_debug_wjdnx_67",T={container:X,containerFullscreen:$,fluidCanvas:G,maskCanvas:H,debug:q},k=({fullscreen:f=!1,className:o,style:r,config:d,showDebug:y=!1,zIndex:x={fluid:1,mask:2}})=>{const l=u.useRef(null),i=u.useRef(null),e=u.useMemo(()=>({...P,...d}),[d]);B(l,e);const g=z(i,l,e,y),b=`${T.container} ${f?T.containerFullscreen:""} ${o||""}`.trim();return A.jsxs("div",{className:b,style:r,children:[A.jsx("canvas",{ref:l,className:T.fluidCanvas,style:{zIndex:x.fluid}}),A.jsx("canvas",{ref:i,className:T.maskCanvas,style:{zIndex:x.mask}}),y&&A.jsxs("div",{className:T.debug,children:["Light spots: ",g.spots,A.jsx("br",{}),"FPS: ",g.fps]})]})};k.displayName="FluidLightPattern";exports.DEFAULT_CONFIG=P;exports.FluidLightPattern=k;
//# sourceMappingURL=index.cjs.map
