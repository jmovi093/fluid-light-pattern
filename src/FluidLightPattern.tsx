import React, { useRef, useMemo } from 'react';
import { useFluidAnimation } from './useFluidAnimation';
import { useLightBlobs } from './useLightBlobs';
import { DEFAULT_CONFIG } from './config';
import type { FluidLightPatternProps, FluidLightConfig } from './types';
import styles from './FluidLightPattern.module.css';

export const FluidLightPattern: React.FC<FluidLightPatternProps> = ({
  fullscreen = false,
  className,
  style,
  config: configOverrides,
  showDebug = false,
  zIndex = { fluid: 1, mask: 2 },
}) => {
  const fluidCanvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);

  // Merge default config with overrides
  const config: FluidLightConfig = useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      ...configOverrides,
    }),
    [configOverrides]
  );

  // Initialize WebGL fluid animation
  useFluidAnimation(fluidCanvasRef, config);

  // Initialize light blobs animation
  const debugInfo = useLightBlobs(
    maskCanvasRef,
    fluidCanvasRef,
    config,
    showDebug
  );

  const containerClassName = `${styles.container} ${
    fullscreen ? styles.containerFullscreen : ''
  } ${className || ''}`.trim();

  return (
    <div className={containerClassName} style={style}>
      <canvas
        ref={fluidCanvasRef}
        className={styles.fluidCanvas}
        style={{ zIndex: zIndex.fluid }}
      />
      <canvas
        ref={maskCanvasRef}
        className={styles.maskCanvas}
        style={{ zIndex: zIndex.mask }}
      />
      {showDebug && (
        <div className={styles.debug}>
          Light spots: {debugInfo.spots}
          <br />
          FPS: {debugInfo.fps}
        </div>
      )}
    </div>
  );
};

FluidLightPattern.displayName = 'FluidLightPattern';