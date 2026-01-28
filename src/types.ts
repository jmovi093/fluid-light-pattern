export interface FluidLightConfig {
  // Light blob settings
  baseRadius: number;
  blurAmount: number;
  currentOpacity: number;
  trailMultiplier: number;
  fadeSpeed: number;
  trailTaper: number;
  
  // Age fade settings
  ageFadeType: 'none' | 'linear' | 'exponential' | 'logarithmic';
  ageFadeStrength: number;
  
  // Main blob animation
  closeDelay: number;
  mainCloseSpeed: number;
  mainCloseTaper: number;
  
  // Fluid pattern settings
  backgroundColor: string;
  patternColor: string;
  patternOpacity: number;
  
  // Pattern scales
  pattern1Scale: number;
  pattern2Scale: number;
  pattern3Scale: number;
  pattern4Scale: number;
  
  // Animation
  animationSpeed: number;
}

export interface FluidLightPatternProps {
  /**
   * Whether to render fullscreen (fixed position covering viewport)
   * @default false
   */
  fullscreen?: boolean;
  
  /**
   * Custom className for the container
   */
  className?: string;
  
  /**
   * Custom styles for the container
   */
  style?: React.CSSProperties;
  
  /**
   * Configuration object for customizing the effect
   */
  config?: Partial<FluidLightConfig>;
  
  /**
   * Whether to show debug information
   * @default false
   */
  showDebug?: boolean;
  
  /**
   * Z-index for the effect layers
   * @default { fluid: 1, mask: 2 }
   */
  zIndex?: {
    fluid?: number;
    mask?: number;
  };
}

export interface LightSpot {
  x: number;
  y: number;
  opacity: number;
  baseOpacity: number;
  radius: number;
  velX: number;
  velY: number;
  age: number;
  createdAt: number;
  renderOpacity?: number;
}

export interface FluidUniforms {
  res: WebGLUniformLocation | null;
  time: WebGLUniformLocation | null;
  bg: WebGLUniformLocation | null;
  p1c: WebGLUniformLocation | null;
  p1o: WebGLUniformLocation | null;
  p1s: WebGLUniformLocation | null;
  p2c: WebGLUniformLocation | null;
  p2o: WebGLUniformLocation | null;
  p2s: WebGLUniformLocation | null;
  p3c: WebGLUniformLocation | null;
  p3o: WebGLUniformLocation | null;
  p3s: WebGLUniformLocation | null;
  p4c: WebGLUniformLocation | null;
  p4o: WebGLUniformLocation | null;
  p4s: WebGLUniformLocation | null;
}