import { useEffect, useRef } from 'react';
import type { FluidLightConfig, FluidUniforms } from './types';

const vertexShader = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = `
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

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
}

export function useFluidAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  config: FluidLightConfig
) {
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<FluidUniforms | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;

    const vs = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShader, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    programRef.current = program;

    // Create vertex buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    uniformsRef.current = {
      res: gl.getUniformLocation(program, 'iResolution'),
      time: gl.getUniformLocation(program, 'iTime'),
      bg: gl.getUniformLocation(program, 'bg_color'),
      p1c: gl.getUniformLocation(program, 'p1_color'),
      p1o: gl.getUniformLocation(program, 'p1_opacity'),
      p1s: gl.getUniformLocation(program, 'p1_scale'),
      p2c: gl.getUniformLocation(program, 'p2_color'),
      p2o: gl.getUniformLocation(program, 'p2_opacity'),
      p2s: gl.getUniformLocation(program, 'p2_scale'),
      p3c: gl.getUniformLocation(program, 'p3_color'),
      p3o: gl.getUniformLocation(program, 'p3_opacity'),
      p3s: gl.getUniformLocation(program, 'p3_scale'),
      p4c: gl.getUniformLocation(program, 'p4_color'),
      p4o: gl.getUniformLocation(program, 'p4_opacity'),
      p4s: gl.getUniformLocation(program, 'p4_scale'),
    };

    // Animation loop
    const animate = () => {
      if (!gl || !uniformsRef.current) return;

      const u = uniformsRef.current;
      const bgColor = hexToRgb(config.backgroundColor);
      const patternColor = hexToRgb(config.patternColor);

      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(
        u.time,
        ((Date.now() - startTimeRef.current) / 1000) * config.animationSpeed
      );
      gl.uniform3fv(u.bg, bgColor);
      gl.uniform3fv(u.p1c, patternColor);
      gl.uniform1f(u.p1o, config.patternOpacity);
      gl.uniform1f(u.p1s, config.pattern1Scale);
      gl.uniform3fv(u.p2c, patternColor);
      gl.uniform1f(u.p2o, config.patternOpacity);
      gl.uniform1f(u.p2s, config.pattern2Scale);
      gl.uniform3fv(u.p3c, patternColor);
      gl.uniform1f(u.p3o, config.patternOpacity);
      gl.uniform1f(u.p3s, config.pattern3Scale);
      gl.uniform3fv(u.p4c, patternColor);
      gl.uniform1f(u.p4o, config.patternOpacity);
      gl.uniform1f(u.p4s, config.pattern4Scale);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', resize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef, config]);

  return glRef;
}