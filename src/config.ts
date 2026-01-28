import type { FluidLightConfig } from './types';

export const DEFAULT_CONFIG: FluidLightConfig = {
  // Light blob settings (exactly as in your prototype)
  baseRadius: 190,
  blurAmount: 30,
  currentOpacity: 0.9,
  trailMultiplier: 0.4,
  fadeSpeed: 0.007,
  trailTaper: 2.0,

  // Age fade settings
  ageFadeType: 'exponential',
  ageFadeStrength: 0.7,

  // Main blob animation
  closeDelay: 300,
  mainCloseSpeed: 0.01,
  mainCloseTaper: 1.0,

  // Fluid pattern settings
  backgroundColor: '#000000',
  patternColor: '#0d00ff',
  patternOpacity: 1,

  // Pattern scales
  pattern1Scale: 1.5,
  pattern2Scale: 0.5,
  pattern3Scale: 0.3,
  pattern4Scale: 0.3,

  // Animation
  animationSpeed: 1.0,
};