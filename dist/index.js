(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".fluidLightPattern__container{position:relative;width:100%;height:100%}.fluidLightPattern__containerFullscreen{position:fixed;top:0;left:0;width:100vw;height:100vh;overflow:hidden}.fluidLightPattern__fluidCanvas{position:absolute;top:0;left:0;width:100%;height:100%;visibility:hidden}.fluidLightPattern__maskCanvas{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.fluidLightPattern__debug{position:fixed;top:10px;left:10px;background:#000000b3;color:#fff;padding:10px;font-family:monospace;font-size:12px;z-index:9999;border-radius:4px}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { jsxs as W, jsx as P } from "react/jsx-runtime";
import { useRef as u, useEffect as M, useState as Y, useMemo as z } from "react";
const X = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`, $ = `
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
`;
function B(f) {
  const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);
  return c ? [
    parseInt(c[1], 16) / 255,
    parseInt(c[2], 16) / 255,
    parseInt(c[3], 16) / 255
  ] : [0, 0, 0];
}
function G(f, c) {
  const v = u(null), g = u(null), _ = u(null), L = u(Date.now()), s = u(null), y = u(c);
  return M(() => {
    y.current = c;
  }, [c]), M(() => {
    const d = f.current;
    if (!d) return;
    const e = d.getContext("webgl");
    if (!e) {
      console.error("WebGL not supported");
      return;
    }
    v.current = e;
    const R = () => {
      d.width = window.innerWidth, d.height = window.innerHeight, e.viewport(0, 0, d.width, d.height);
    };
    R();
    const C = (i, p) => {
      const h = e.createShader(p);
      return h ? (e.shaderSource(h, i), e.compileShader(h), h) : null;
    }, n = e.createProgram();
    if (!n) return;
    const m = C(X, e.VERTEX_SHADER), A = C($, e.FRAGMENT_SHADER);
    if (!m || !A) return;
    e.attachShader(n, m), e.attachShader(n, A), e.linkProgram(n), e.useProgram(n), g.current = n;
    const l = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, l), e.bufferData(
      e.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      e.STATIC_DRAW
    );
    const w = e.getAttribLocation(n, "position");
    e.enableVertexAttribArray(w), e.vertexAttribPointer(w, 2, e.FLOAT, !1, 0, 0), _.current = {
      res: e.getUniformLocation(n, "iResolution"),
      time: e.getUniformLocation(n, "iTime"),
      bg: e.getUniformLocation(n, "bg_color"),
      p1c: e.getUniformLocation(n, "p1_color"),
      p1o: e.getUniformLocation(n, "p1_opacity"),
      p1s: e.getUniformLocation(n, "p1_scale"),
      p2c: e.getUniformLocation(n, "p2_color"),
      p2o: e.getUniformLocation(n, "p2_opacity"),
      p2s: e.getUniformLocation(n, "p2_scale"),
      p3c: e.getUniformLocation(n, "p3_color"),
      p3o: e.getUniformLocation(n, "p3_opacity"),
      p3s: e.getUniformLocation(n, "p3_scale"),
      p4c: e.getUniformLocation(n, "p4_color"),
      p4o: e.getUniformLocation(n, "p4_opacity"),
      p4s: e.getUniformLocation(n, "p4_scale")
    };
    const T = () => {
      if (!e || !_.current) return;
      const i = _.current, p = y.current, h = B(p.backgroundColor), b = B(p.patternColor);
      e.uniform2f(i.res, d.width, d.height), e.uniform1f(
        i.time,
        (Date.now() - L.current) / 1e3 * p.animationSpeed
      ), e.uniform3fv(i.bg, h), e.uniform3fv(i.p1c, b), e.uniform1f(i.p1o, p.patternOpacity), e.uniform1f(i.p1s, p.pattern1Scale), e.uniform3fv(i.p2c, b), e.uniform1f(i.p2o, p.patternOpacity), e.uniform1f(i.p2s, p.pattern2Scale), e.uniform3fv(i.p3c, b), e.uniform1f(i.p3o, p.patternOpacity), e.uniform1f(i.p3s, p.pattern3Scale), e.uniform3fv(i.p4c, b), e.uniform1f(i.p4o, p.patternOpacity), e.uniform1f(i.p4s, p.pattern4Scale), e.drawArrays(e.TRIANGLE_STRIP, 0, 4), s.current = requestAnimationFrame(T);
    };
    return T(), window.addEventListener("resize", R), () => {
      window.removeEventListener("resize", R), s.current && cancelAnimationFrame(s.current);
    };
  }, [f]), v;
}
function H(f, c, v) {
  if (c === "none" || v === 0)
    return 1;
  let g = 1;
  switch (c) {
    case "linear":
      g = 1 - f;
      break;
    case "exponential":
      g = Math.pow(1 - f, 2);
      break;
    case "logarithmic":
      g = 1 - Math.pow(f, 0.5);
      break;
  }
  return 1 - (1 - g) * v;
}
function j(f, c, v, g) {
  const [_, L] = Y({ spots: 0, fps: 0 }), s = u([]), y = u({ x: -1e3, y: -1e3, prevX: -1e3, prevY: -1e3 }), d = u({ x: 0, y: 0 }), e = u({
    currentRadius: 0,
    currentOpacity: 0,
    lastMoveTime: 0
  }), R = u({ frameCount: 0, lastFpsTime: Date.now(), fps: 0 }), C = u(null), n = u(v);
  return M(() => {
    n.current = v;
  }, [v]), M(() => {
    const m = f.current, A = c.current;
    if (!m || !A) return;
    const l = m.getContext("2d");
    if (!l) return;
    const w = () => {
      if (!m) return;
      const t = m.getBoundingClientRect();
      m.width = t.width, m.height = t.height;
    };
    w();
    const T = (t) => {
      if (!m) return;
      const r = document.elementFromPoint(t.clientX, t.clientY);
      if (r && window.getComputedStyle(r).pointerEvents === "none")
        return;
      const a = m.getBoundingClientRect();
      y.current.x = t.clientX - a.left, y.current.y = t.clientY - a.top;
    }, i = (t, r, a, o, F) => {
      s.current.push({
        x: t,
        y: r,
        opacity: a,
        baseOpacity: a,
        radius: n.current.baseRadius,
        velX: o,
        velY: F,
        age: 0,
        createdAt: Date.now()
      }), s.current.length > 150 && s.current.shift();
    }, p = () => {
      const t = n.current;
      for (let r = s.current.length - 1; r >= 0; r--) {
        const a = s.current[r];
        a.age++;
        const o = Math.min(a.age * t.fadeSpeed, 1);
        a.opacity -= t.fadeSpeed, a.radius -= t.fadeSpeed * 100 * t.trailTaper;
        const F = H(
          o,
          t.ageFadeType,
          t.ageFadeStrength
        ), O = a.opacity * F;
        if (O <= 0.01 || a.radius <= 10) {
          s.current.splice(r, 1);
          continue;
        }
        a.renderOpacity = O;
      }
    }, h = (t) => {
      const r = n.current;
      l.save();
      const a = t.renderOpacity !== void 0 ? t.renderOpacity : t.opacity, o = l.createRadialGradient(
        t.x,
        t.y,
        0,
        t.x,
        t.y,
        t.radius + r.blurAmount
      );
      o.addColorStop(0, `rgba(255, 255, 255, ${a})`), o.addColorStop(0.6, `rgba(255, 255, 255, ${a * 0.5})`), o.addColorStop(1, "rgba(255, 255, 255, 0)"), l.beginPath(), l.arc(
        t.x,
        t.y,
        t.radius + r.blurAmount,
        0,
        Math.PI * 2
      ), l.fillStyle = o, l.filter = `blur(${r.blurAmount}px)`, l.fill(), l.restore();
    }, b = () => {
      l.clearRect(0, 0, m.width, m.height);
      const t = n.current, r = y.current, a = d.current, o = e.current, F = r.x - r.prevX, O = r.y - r.prevY, D = F !== 0 || O !== 0;
      a.x = a.x * 0.8 + F * 0.2, a.y = a.y * 0.8 + O * 0.2;
      const I = Date.now() - o.lastMoveTime <= t.closeDelay;
      let E = !1;
      if (D ? (o.lastMoveTime = Date.now(), E = !0) : E = I, E) {
        const S = t.mainCloseSpeed * 100;
        o.currentRadius += S, o.currentRadius > t.baseRadius && (o.currentRadius = t.baseRadius);
        const N = o.currentRadius / t.baseRadius;
        o.currentOpacity = t.currentOpacity * N;
      } else {
        o.currentRadius -= t.mainCloseSpeed * 100 * t.mainCloseTaper, o.currentRadius < 0 && (o.currentRadius = 0);
        const S = o.currentRadius / t.baseRadius;
        o.currentOpacity = t.currentOpacity * S;
      }
      if (E && (D || I)) {
        const S = t.currentOpacity * t.trailMultiplier;
        i(r.x, r.y, S, a.x, a.y);
      }
      p(), l.globalCompositeOperation = "source-over", s.current.forEach((S) => {
        h(S);
      }), o.currentRadius > 0 && h({
        x: r.x,
        y: r.y,
        opacity: o.currentOpacity,
        baseOpacity: o.currentOpacity,
        radius: o.currentRadius,
        velX: a.x,
        velY: a.y
      }), l.globalCompositeOperation = "source-in", l.drawImage(A, 0, 0), l.globalCompositeOperation = "source-over";
      const x = R.current;
      x.frameCount++;
      const k = Date.now();
      k - x.lastFpsTime >= 1e3 && (x.fps = x.frameCount, x.frameCount = 0, x.lastFpsTime = k, g && L({
        spots: s.current.length + 1,
        fps: x.fps
      })), r.prevX = r.x, r.prevY = r.y, C.current = requestAnimationFrame(b);
    };
    return b(), document.addEventListener("mousemove", T), window.addEventListener("resize", w), () => {
      document.removeEventListener("mousemove", T), window.removeEventListener("resize", w), C.current && cancelAnimationFrame(C.current);
    };
  }, [f, c, g]), _;
}
const q = {
  // Light blob settings (exactly as in your prototype)
  baseRadius: 190,
  blurAmount: 30,
  currentOpacity: 0.9,
  trailMultiplier: 0.4,
  fadeSpeed: 7e-3,
  trailTaper: 2,
  // Age fade settings
  ageFadeType: "exponential",
  ageFadeStrength: 0.7,
  // Main blob animation
  closeDelay: 300,
  mainCloseSpeed: 0.01,
  mainCloseTaper: 1,
  // Fluid pattern settings
  backgroundColor: "#000000",
  patternColor: "#0d00ff",
  patternOpacity: 1,
  // Pattern scales
  pattern1Scale: 1.5,
  pattern2Scale: 0.5,
  pattern3Scale: 0.3,
  pattern4Scale: 0.3,
  // Animation
  animationSpeed: 1
}, U = {
  container: "fluidLightPattern__container",
  containerFullscreen: "fluidLightPattern__containerFullscreen",
  fluidCanvas: "fluidLightPattern__fluidCanvas",
  maskCanvas: "fluidLightPattern__maskCanvas",
  debug: "fluidLightPattern__debug"
}, V = ({
  fullscreen: f = !1,
  className: c,
  style: v,
  config: g,
  showDebug: _ = !1,
  zIndex: L = { fluid: 1, mask: 2 }
}) => {
  const s = u(null), y = u(null), d = z(
    () => ({
      ...q,
      ...g
    }),
    [g]
  );
  G(s, d);
  const e = j(
    y,
    s,
    d,
    _
  ), R = `${U.container} ${f ? U.containerFullscreen : ""} ${c || ""}`.trim();
  return /* @__PURE__ */ W("div", { className: R, style: v, children: [
    /* @__PURE__ */ P(
      "canvas",
      {
        ref: s,
        className: U.fluidCanvas,
        style: { zIndex: L.fluid }
      }
    ),
    /* @__PURE__ */ P(
      "canvas",
      {
        ref: y,
        className: U.maskCanvas,
        style: { zIndex: L.mask }
      }
    ),
    _ && /* @__PURE__ */ W("div", { className: U.debug, children: [
      "Light spots: ",
      e.spots,
      /* @__PURE__ */ P("br", {}),
      "FPS: ",
      e.fps
    ] })
  ] });
};
V.displayName = "FluidLightPattern";
export {
  q as DEFAULT_CONFIG,
  V as FluidLightPattern
};
