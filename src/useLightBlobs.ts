import { useEffect, useRef, useState } from 'react';
import type { FluidLightConfig, LightSpot } from './types';

function calculateAgeFade(
  ageFactor: number,
  type: FluidLightConfig['ageFadeType'],
  strength: number
): number {
  if (type === 'none' || strength === 0) {
    return 1.0;
  }

  let fadeFactor = 1.0;

  switch (type) {
    case 'linear':
      fadeFactor = 1.0 - ageFactor;
      break;
    case 'exponential':
      fadeFactor = Math.pow(1.0 - ageFactor, 2);
      break;
    case 'logarithmic':
      fadeFactor = 1.0 - Math.pow(ageFactor, 0.5);
      break;
  }

  return 1.0 - (1.0 - fadeFactor) * strength;
}

export function useLightBlobs(
  maskCanvasRef: React.RefObject<HTMLCanvasElement>,
  fluidCanvasRef: React.RefObject<HTMLCanvasElement>,
  config: FluidLightConfig,
  showDebug: boolean
) {
  const [debugInfo, setDebugInfo] = useState({ spots: 0, fps: 0 });
  const lightSpotsRef = useRef<LightSpot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const mainBlobRef = useRef({
    currentRadius: 0,
    currentOpacity: 0,
    lastMoveTime: Date.now(),
  });
  const fpsRef = useRef({ frameCount: 0, lastFpsTime: Date.now(), fps: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const maskCanvas = maskCanvasRef.current;
    const fluidCanvas = fluidCanvasRef.current;
    if (!maskCanvas || !fluidCanvas) return;

    const ctx = maskCanvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      if (!maskCanvas) return;
      const rect = maskCanvas.getBoundingClientRect();
      maskCanvas.width = rect.width;
      maskCanvas.height = rect.height;
    };
    resize();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!maskCanvas) return;

      const rect = maskCanvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Light spot management
    const addLightSpot = (
      x: number,
      y: number,
      opacity: number,
      velX: number,
      velY: number
    ) => {
      lightSpotsRef.current.push({
        x,
        y,
        opacity,
        baseOpacity: opacity,
        radius: config.baseRadius,
        velX,
        velY,
        age: 0,
        createdAt: Date.now(),
      });

      if (lightSpotsRef.current.length > 150) {
        lightSpotsRef.current.shift();
      }
    };

    const updateLightSpots = () => {
      for (let i = lightSpotsRef.current.length - 1; i >= 0; i--) {
        const spot = lightSpotsRef.current[i];
        spot.age++;

        const ageFactor = Math.min(spot.age * config.fadeSpeed, 1.0);
        spot.opacity -= config.fadeSpeed;
        spot.radius -= config.fadeSpeed * 100 * config.trailTaper;

        const ageFadeMultiplier = calculateAgeFade(
          ageFactor,
          config.ageFadeType,
          config.ageFadeStrength
        );

        const finalOpacity = spot.opacity * ageFadeMultiplier;

        if (finalOpacity <= 0.01 || spot.radius <= 10) {
          lightSpotsRef.current.splice(i, 1);
          continue;
        }

        spot.renderOpacity = finalOpacity;
      }
    };

    const drawLightSpot = (spot: LightSpot) => {
      ctx.save();

      const opacity =
        spot.renderOpacity !== undefined ? spot.renderOpacity : spot.opacity;

      const gradient = ctx.createRadialGradient(
        spot.x,
        spot.y,
        0,
        spot.x,
        spot.y,
        spot.radius + config.blurAmount
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(0.6, `rgba(255, 255, 255, ${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(
        spot.x,
        spot.y,
        spot.radius + config.blurAmount,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = gradient;
      ctx.filter = `blur(${config.blurAmount}px)`;
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

      const mouse = mouseRef.current;
      const velocity = velocityRef.current;
      const mainBlob = mainBlobRef.current;

      // Calculate mouse movement
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const hasMoved = dx !== 0 || dy !== 0;

      velocity.x = velocity.x * 0.8 + dx * 0.2;
      velocity.y = velocity.y * 0.8 + dy * 0.2;

      // Determine if blobs should be active
      const timeSinceLastMove = Date.now() - mainBlob.lastMoveTime;
      const isInDelayPeriod = timeSinceLastMove <= config.closeDelay;

      let shouldBeActive = false;
      if (hasMoved) {
        mainBlob.lastMoveTime = Date.now();
        shouldBeActive = true;
      } else {
        shouldBeActive = isInDelayPeriod;
      }

      // Animate main blob
      if (shouldBeActive) {
        const openSpeed = config.mainCloseSpeed * 100;
        mainBlob.currentRadius += openSpeed;
        if (mainBlob.currentRadius > config.baseRadius) {
          mainBlob.currentRadius = config.baseRadius;
        }

        const radiusRatio = mainBlob.currentRadius / config.baseRadius;
        mainBlob.currentOpacity = config.currentOpacity * radiusRatio;
      } else {
        mainBlob.currentRadius -=
          config.mainCloseSpeed * 100 * config.mainCloseTaper;
        if (mainBlob.currentRadius < 0) mainBlob.currentRadius = 0;

        const radiusRatio = mainBlob.currentRadius / config.baseRadius;
        mainBlob.currentOpacity = config.currentOpacity * radiusRatio;
      }

      // Create trail spots
      if (shouldBeActive && (hasMoved || isInDelayPeriod)) {
        const trailOpacity = config.currentOpacity * config.trailMultiplier;
        addLightSpot(mouse.x, mouse.y, trailOpacity, velocity.x, velocity.y);
      }

      updateLightSpots();

      // Draw light spots
      ctx.globalCompositeOperation = 'source-over';
      lightSpotsRef.current.forEach((spot) => {
        drawLightSpot(spot);
      });

      // Draw current position
      if (mainBlob.currentRadius > 0) {
        drawLightSpot({
          x: mouse.x,
          y: mouse.y,
          opacity: mainBlob.currentOpacity,
          baseOpacity: mainBlob.currentOpacity,
          radius: mainBlob.currentRadius,
          velX: velocity.x,
          velY: velocity.y,
          age: 0,
          createdAt: Date.now(),
        });
      }

      // Apply fluid pattern mask
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(fluidCanvas, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      // Update FPS
      const fps = fpsRef.current;
      fps.frameCount++;
      const now = Date.now();
      if (now - fps.lastFpsTime >= 1000) {
        fps.fps = fps.frameCount;
        fps.frameCount = 0;
        fps.lastFpsTime = now;

        if (showDebug) {
          setDebugInfo({
            spots: lightSpotsRef.current.length + 1,
            fps: fps.fps,
          });
        }
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize mouse position OFF-SCREEN or relative to canvas
    const rect = maskCanvas.getBoundingClientRect();
    mouseRef.current.x = rect.width / 2;
    mouseRef.current.y = rect.height / 2;
    mouseRef.current.prevX = mouseRef.current.x;
    mouseRef.current.prevY = mouseRef.current.y;

    // Start animation
    animate();

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [maskCanvasRef, fluidCanvasRef, config, showDebug]);

  return debugInfo;
}