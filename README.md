# Fluid Light Pattern

An interactive fluid light pattern effect combining WebGL shaders and Canvas 2D for creating dynamic, mouse-responsive visual backgrounds.

## Features

- **WebGL Fluid Animations**: Four distinct geometric patterns animated with linear and radial waves
- **Interactive Light Blobs**: Mouse-responsive light spots with trailing effects
- **Masking System**: Canvas 2D masks reveal the fluid pattern underneath
- **Age Fade System**: Configurable fade algorithms (linear, exponential, logarithmic)
- **High Performance**: Optimized rendering with requestAnimationFrame
- **TypeScript Support**: Fully typed React component
- **Zero Dependencies**: No external libraries required (except React for component version)

## Interactive Demo

Check out the [live demo](demo/index.html) with full interactive controls to customize all parameters in real-time.

## Installation

### From GitHub (Recommended for personal use)

```bash
# Using npm
npm install github:yourusername/fluid-light-pattern

# Using pnpm
pnpm install github:yourusername/fluid-light-pattern

# Using yarn
yarn add github:yourusername/fluid-light-pattern
```

### From specific version/branch

```bash
# Install from specific tag
pnpm install github:yourusername/fluid-light-pattern#v1.0.0

# Install from specific branch
pnpm install github:yourusername/fluid-light-pattern#dev
```

## Quick Start

### Basic Usage

```tsx
import { FluidLightPattern } from "fluid-light-pattern";

function App() {
  return (
    <div>
      <FluidLightPattern fullscreen />
      <h1>Your content here</h1>
    </div>
  );
}
```

### As Section Background

```tsx
import { FluidLightPattern } from "fluid-light-pattern";

function HeroSection() {
  return (
    <section style={{ position: "relative", height: "100vh" }}>
      <FluidLightPattern style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "relative", zIndex: 10 }}>
        <h1>Hero Title</h1>
      </div>
    </section>
  );
}
```

### Custom Configuration

```tsx
import { FluidLightPattern } from "fluid-light-pattern";

function CustomBackground() {
  return (
    <FluidLightPattern
      fullscreen
      config={{
        baseRadius: 150,
        patternColor: "#ff00ff",
        animationSpeed: 0.5,
        ageFadeType: "exponential",
      }}
    />
  );
}
```

## Configuration

### FluidLightPatternProps

| Prop         | Type                                | Default                 | Description                        |
| ------------ | ----------------------------------- | ----------------------- | ---------------------------------- |
| `fullscreen` | `boolean`                           | `false`                 | Render as fullscreen fixed overlay |
| `className`  | `string`                            | -                       | Custom CSS class                   |
| `style`      | `CSSProperties`                     | -                       | Custom inline styles               |
| `config`     | `Partial<FluidLightConfig>`         | -                       | Configuration overrides            |
| `showDebug`  | `boolean`                           | `false`                 | Show FPS and spot count            |
| `zIndex`     | `{ fluid?: number, mask?: number }` | `{ fluid: 1, mask: 2 }` | Z-index values                     |

### FluidLightConfig

#### Light Blob Settings

```ts
{
  baseRadius: 190,           // Base radius of light spots (px)
  blurAmount: 30,            // Blur intensity (px)
  currentOpacity: 0.9,       // Main blob opacity (0-1)
  trailMultiplier: 0.4,      // Trail brightness relative to main (0-1)
  fadeSpeed: 0.007,          // How fast trails fade
  trailTaper: 2.0,           // How pointy the trail is
}
```

#### Age Fade Settings

```ts
{
  ageFadeType: 'exponential',  // 'none' | 'linear' | 'exponential' | 'logarithmic'
  ageFadeStrength: 0.7,        // Intensity of age fade (0-1)
}
```

#### Main Blob Animation

```ts
{
  closeDelay: 300,           // Delay before closing after movement stops (ms)
  mainCloseSpeed: 0.01,      // Open/close animation speed
  mainCloseTaper: 1.0,       // Taper for main blob closing
}
```

#### Fluid Pattern Settings

```ts
{
  backgroundColor: '#000000',  // Background color (hex)
  patternColor: '#0d00ff',     // Pattern color (hex)
  patternOpacity: 1,           // Pattern opacity (0-1)
  pattern1Scale: 1.5,          // Scale for pattern 1
  pattern2Scale: 0.5,          // Scale for pattern 2
  pattern3Scale: 0.3,          // Scale for pattern 3
  pattern4Scale: 0.3,          // Scale for pattern 4
  animationSpeed: 1.0,         // Global animation speed multiplier
}
```

## Usage Examples

### Subtle Hero Background

```tsx
<FluidLightPattern
  fullscreen
  config={{
    baseRadius: 250,
    currentOpacity: 0.3,
    trailMultiplier: 0.2,
    fadeSpeed: 0.01,
    patternColor: "#1a1a2e",
    animationSpeed: 0.5,
  }}
/>
```

### Intense Interactive Effect

```tsx
<FluidLightPattern
  fullscreen
  config={{
    baseRadius: 150,
    currentOpacity: 1,
    trailMultiplier: 0.6,
    fadeSpeed: 0.005,
    ageFadeType: "linear",
    patternColor: "#ff006e",
    animationSpeed: 1.5,
  }}
/>
```

### Section Background with Custom Colors

```tsx
<div style={{ position: "relative", minHeight: "500px" }}>
  <FluidLightPattern
    config={{
      backgroundColor: "#0a0e27",
      patternColor: "#00d9ff",
      baseRadius: 180,
    }}
  />
  <div style={{ position: "relative", zIndex: 10, padding: "2rem" }}>
    <h2>Section Content</h2>
  </div>
</div>
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/jmovi093/fluid-light-pattern.git
cd fluid-light-pattern

# Install dependencies
pnpm install

# Run dev server with demo
pnpm dev

# Build the component
pnpm build
```

### Project Structure

```
fluid-light-pattern/
├── src/                          # Component source
│   ├── FluidLightPattern.tsx     # Main component
│   ├── FluidLightPattern.module.css
│   ├── useFluidAnimation.ts      # WebGL hook
│   ├── useLightBlobs.ts          # Light blobs hook
│   ├── config.ts                 # Default configuration
│   ├── types.ts                  # TypeScript types
│   └── index.ts                  # Main export
├── demo/                         # Interactive demo
│   ├── index.html                # Demo with full controls
│   └── demo.js                   # Demo JavaScript
├── dist/                         # Build output
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

The effect combines two rendering contexts:

1. **WebGL Layer (Background)**:
   - Renders geometric patterns using fragment shaders
   - Animates using linear and radial waves
   - Four distinct patterns blend based on wave values

2. **Canvas 2D Layer (Mask)**:
   - Draws white light blobs following the mouse
   - Applies blur and gradient effects
   - Uses `source-in` composite operation to mask the WebGL layer

The result is a fluid pattern that's only visible where you move your mouse, creating an interactive "paint" effect.

## Acknowledgments

- Inspired by fluid dynamics and interactive visual effects
- Built with modern WebGL and Canvas 2D APIs
- Optimized for performance and smooth animations
