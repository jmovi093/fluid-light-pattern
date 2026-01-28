// ============================================
// WEBGL FLUID BACKGROUND
// ============================================
const fluidCanvas = document.getElementById('fluid-canvas');
const gl = fluidCanvas.getContext('webgl');

const resizeFluid = () => {
  fluidCanvas.width = window.innerWidth;
  fluidCanvas.height = window.innerHeight;
  gl.viewport(0, 0, fluidCanvas.width, fluidCanvas.height);
};
resizeFluid();

// Vertex shader
const vs = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Fragment shader
const fs = `
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
    
    float d = -iTime * 0.15, a = 0.0;
    for (float i = 0.0; i < 4.0; ++i) {
      a += cos(i - d - a * uv.x * 0.5);
      d += sin(uv.y * i + a * 0.5);
    }
    d += iTime * 0.15;
    float linearWave = sin(d * 0.5 + a * 0.6) * 0.5 + 0.5;
    
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
    
    float fv = mix(linearWave, radialWaves, 0.5);
    float p1 = pattern1(fc, p1_scale);
    float p2 = pattern2(fc, p2_scale);
    float p3 = pattern3(fc, p3_scale);
    float p4 = pattern4(fc, p4_scale);
    
    float pm; vec3 pc; float op;
    
    if (fv < 0.25) {
      pm = p1; pc = p1_color; op = p1_opacity;
    } else if (fv < 0.5) {
      pm = p2; pc = p2_color; op = p2_opacity;
    } else if (fv < 0.75) {
      pm = p3; pc = p3_color; op = p3_opacity;
    } else {
      pm = p4; pc = p4_color; op = p4_opacity;
    }
    
    gl_FragColor = vec4(mix(bg_color, pc, pm * op), 1.0);
  }
`;

const compile = (src, type) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
};

const prog = gl.createProgram();
gl.attachShader(prog, compile(vs, gl.VERTEX_SHADER));
gl.attachShader(prog, compile(fs, gl.FRAGMENT_SHADER));
gl.linkProgram(prog);
gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

const pos = gl.getAttribLocation(prog, 'position');
gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

const u = {
  res: gl.getUniformLocation(prog, 'iResolution'),
  time: gl.getUniformLocation(prog, 'iTime'),
  bg: gl.getUniformLocation(prog, 'bg_color'),
  p1c: gl.getUniformLocation(prog, 'p1_color'),
  p1o: gl.getUniformLocation(prog, 'p1_opacity'),
  p1s: gl.getUniformLocation(prog, 'p1_scale'),
  p2c: gl.getUniformLocation(prog, 'p2_color'),
  p2o: gl.getUniformLocation(prog, 'p2_opacity'),
  p2s: gl.getUniformLocation(prog, 'p2_scale'),
  p3c: gl.getUniformLocation(prog, 'p3_color'),
  p3o: gl.getUniformLocation(prog, 'p3_opacity'),
  p3s: gl.getUniformLocation(prog, 'p3_scale'),
  p4c: gl.getUniformLocation(prog, 'p4_color'),
  p4o: gl.getUniformLocation(prog, 'p4_opacity'),
  p4s: gl.getUniformLocation(prog, 'p4_scale'),
};

const hex = (h) => [
  parseInt(h.slice(1, 3), 16) / 255,
  parseInt(h.slice(3, 5), 16) / 255,
  parseInt(h.slice(5, 7), 16) / 255,
];

const fluidConfig = {
  bg: hex('#000000'),
  p1: { color: hex('#0d00ff'), opacity: 1, scale: 1.5 },
  p2: { color: hex('#0d00ff'), opacity: 1, scale: 0.5 },
  p3: { color: hex('#0d00ff'), opacity: 1, scale: 0.3 },
  p4: { color: hex('#0d00ff'), opacity: 1, scale: 0.3 },
  speed: 1.0,
};

// ============================================
// MASK CANVAS (LIGHT BLOBS)
// ============================================
const maskCanvas = document.getElementById('mask-canvas');
const ctx = maskCanvas.getContext('2d');
const debug = document.getElementById('debug');

const resizeMask = () => {
  maskCanvas.width = window.innerWidth;
  maskCanvas.height = window.innerHeight;
};
resizeMask();

let config = {
  baseRadius: 190,
  blurAmount: 30,
  currentOpacity: 0.9,
  trailMultiplier: 0.4,
  fadeSpeed: 0.007,
  trailTaper: 2.0,
  ageFadeType: 'exponential',
  ageFadeStrength: 0.7,
  closeDelay: 300,
  mainCloseSpeed: 0.01,
  mainCloseTaper: 1.0,
};

function calculateAgeFade(ageFactor, type, strength) {
  if (type === 'none' || strength === 0) return 1.0;
  let fadeFactor = 1.0;
  switch (type) {
    case 'linear': fadeFactor = 1.0 - ageFactor; break;
    case 'exponential': fadeFactor = Math.pow(1.0 - ageFactor, 2); break;
    case 'logarithmic': fadeFactor = 1.0 - Math.pow(ageFactor, 0.5); break;
  }
  return 1.0 - (1.0 - fadeFactor) * strength;
}

const lightSpots = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let prevMouseX = mouseX;
let prevMouseY = mouseY;
let velocityX = 0;
let velocityY = 0;
let currentMainRadius = 0;
let currentMainOpacity = 0;
let lastMoveTime = Date.now();
let frameCount = 0;
let lastFpsTime = Date.now();
let fps = 0;

function addLightSpot(x, y, opacity, velX, velY) {
  lightSpots.push({ x, y, opacity, baseOpacity: opacity, radius: config.baseRadius, velX, velY, age: 0, createdAt: Date.now() });
  if (lightSpots.length > 150) lightSpots.shift();
}

function updateLightSpots() {
  for (let i = lightSpots.length - 1; i >= 0; i--) {
    const spot = lightSpots[i];
    spot.age++;
    const maxAge = 1.0 / config.fadeSpeed;
    const ageFactor = Math.min(spot.age * config.fadeSpeed, 1.0);
    spot.opacity -= config.fadeSpeed;
    spot.radius -= config.fadeSpeed * 100 * config.trailTaper;
    const ageFadeMultiplier = calculateAgeFade(ageFactor, config.ageFadeType, config.ageFadeStrength);
    const finalOpacity = spot.opacity * ageFadeMultiplier;
    if (finalOpacity <= 0.01 || spot.radius <= 10) {
      lightSpots.splice(i, 1);
      continue;
    }
    spot.renderOpacity = finalOpacity;
  }
}

function drawLightSpot(spot) {
  ctx.save();
  const opacity = spot.renderOpacity !== undefined ? spot.renderOpacity : spot.opacity;
  const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius + config.blurAmount);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
  gradient.addColorStop(0.6, `rgba(255, 255, 255, ${opacity * 0.5})`);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.beginPath();
  ctx.arc(spot.x, spot.y, spot.radius + config.blurAmount, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.filter = `blur(${config.blurAmount}px)`;
  ctx.fill();
  ctx.restore();
}

const startTime = Date.now();

function animate() {
  gl.uniform2f(u.res, fluidCanvas.width, fluidCanvas.height);
  gl.uniform1f(u.time, ((Date.now() - startTime) / 1000) * fluidConfig.speed);
  gl.uniform3fv(u.bg, fluidConfig.bg);
  gl.uniform3fv(u.p1c, fluidConfig.p1.color);
  gl.uniform1f(u.p1o, fluidConfig.p1.opacity);
  gl.uniform1f(u.p1s, fluidConfig.p1.scale);
  gl.uniform3fv(u.p2c, fluidConfig.p2.color);
  gl.uniform1f(u.p2o, fluidConfig.p2.opacity);
  gl.uniform1f(u.p2s, fluidConfig.p2.scale);
  gl.uniform3fv(u.p3c, fluidConfig.p3.color);
  gl.uniform1f(u.p3o, fluidConfig.p3.opacity);
  gl.uniform1f(u.p3s, fluidConfig.p3.scale);
  gl.uniform3fv(u.p4c, fluidConfig.p4.color);
  gl.uniform1f(u.p4o, fluidConfig.p4.opacity);
  gl.uniform1f(u.p4s, fluidConfig.p4.scale);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

  const dx = mouseX - prevMouseX;
  const dy = mouseY - prevMouseY;
  const hasMoved = dx !== 0 || dy !== 0;

  velocityX = velocityX * 0.8 + dx * 0.2;
  velocityY = velocityY * 0.8 + dy * 0.2;

  let shouldBeActive = false;
  const timeSinceLastMove = Date.now() - lastMoveTime;
  const isInDelayPeriod = timeSinceLastMove <= config.closeDelay;

  if (hasMoved) {
    lastMoveTime = Date.now();
    shouldBeActive = true;
  } else {
    shouldBeActive = isInDelayPeriod;
  }

  if (shouldBeActive) {
    const openSpeed = config.mainCloseSpeed * 100;
    currentMainRadius += openSpeed;
    if (currentMainRadius > config.baseRadius) currentMainRadius = config.baseRadius;
    const radiusRatio = currentMainRadius / config.baseRadius;
    currentMainOpacity = config.currentOpacity * radiusRatio;
  } else {
    currentMainRadius -= config.mainCloseSpeed * 100 * config.mainCloseTaper;
    if (currentMainRadius < 0) currentMainRadius = 0;
    const radiusRatio = currentMainRadius / config.baseRadius;
    currentMainOpacity = config.currentOpacity * radiusRatio;
  }

  if (shouldBeActive && (hasMoved || isInDelayPeriod)) {
    const trailOpacity = config.currentOpacity * config.trailMultiplier;
    addLightSpot(mouseX, mouseY, trailOpacity, velocityX, velocityY);
  }

  updateLightSpots();
  ctx.globalCompositeOperation = 'source-over';
  lightSpots.forEach((spot) => drawLightSpot(spot));

  if (currentMainRadius > 0) {
    drawLightSpot({
      x: mouseX, y: mouseY, opacity: currentMainOpacity,
      radius: currentMainRadius, velX: velocityX, velY: velocityY,
    });
  }

  ctx.globalCompositeOperation = 'source-in';
  ctx.drawImage(fluidCanvas, 0, 0);
  ctx.globalCompositeOperation = 'source-over';

  frameCount++;
  const now = Date.now();
  if (now - lastFpsTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastFpsTime = now;
  }

  debug.innerHTML = `Light spots: ${lightSpots.length + 1}<br>FPS: ${fps}`;

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  requestAnimationFrame(animate);
}

// ============================================
// CONTROLS
// ============================================
function setupControls() {
  const lightControls = {
    'ctrl-radius': { param: 'baseRadius', display: 'val-radius' },
    'ctrl-blur': { param: 'blurAmount', display: 'val-blur' },
    'ctrl-current-opacity': { param: 'currentOpacity', display: 'val-current-opacity' },
    'ctrl-trail-multiplier': { param: 'trailMultiplier', display: 'val-trail-multiplier' },
    'ctrl-fade': { param: 'fadeSpeed', display: 'val-fade' },
    'ctrl-trail-taper': { param: 'trailTaper', display: 'val-trail-taper' },
    'ctrl-age-fade-strength': { param: 'ageFadeStrength', display: 'val-age-fade-strength' },
    'ctrl-close-delay': { param: 'closeDelay', display: 'val-close-delay' },
    'ctrl-main-close-speed': { param: 'mainCloseSpeed', display: 'val-main-close-speed' },
  };

  Object.keys(lightControls).forEach((id) => {
    const input = document.getElementById(id);
    const display = document.getElementById(lightControls[id].display);
    const param = lightControls[id].param;
    input.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      config[param] = value;
      display.textContent = value;
    });
  });

  document.getElementById('ctrl-age-fade-type').addEventListener('change', (e) => {
    config.ageFadeType = e.target.value;
  });

  document.getElementById('ctrl-bg-color').addEventListener('input', (e) => {
    fluidConfig.bg = hex(e.target.value);
    document.body.style.background = e.target.value;
  });

  document.getElementById('ctrl-pattern-color').addEventListener('input', (e) => {
    const color = hex(e.target.value);
    fluidConfig.p1.color = color;
    fluidConfig.p2.color = color;
    fluidConfig.p3.color = color;
    fluidConfig.p4.color = color;
  });

  document.getElementById('ctrl-pattern-opacity').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    fluidConfig.p1.opacity = val;
    fluidConfig.p2.opacity = val;
    fluidConfig.p3.opacity = val;
    fluidConfig.p4.opacity = val;
    document.getElementById('val-pattern-opacity').textContent = val;
  });

  document.getElementById('ctrl-p1-scale').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    fluidConfig.p1.scale = val;
    document.getElementById('val-p1-scale').textContent = val;
  });

  document.getElementById('ctrl-p2-scale').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    fluidConfig.p2.scale = val;
    document.getElementById('val-p2-scale').textContent = val;
  });

  document.getElementById('ctrl-p3-scale').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    fluidConfig.p3.scale = val;
    document.getElementById('val-p3-scale').textContent = val;
  });

  document.getElementById('ctrl-p4-scale').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    fluidConfig.p4.scale = val;
    document.getElementById('val-p4-scale').textContent = val;
  });

  document.getElementById('ctrl-fluid-speed').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    fluidConfig.speed = val;
    document.getElementById('val-fluid-speed').textContent = val;
  });
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener('resize', () => {
  resizeFluid();
  resizeMask();
});

setupControls();
animate();