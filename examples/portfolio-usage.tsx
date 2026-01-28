/**
 * Example: Using FluidLightPattern in Next.js Portfolio
 * 
 * This shows how to integrate the effect into your existing portfolio structure.
 */

import { FluidLightPattern } from 'fluid-light-pattern';
import styles from './Header.module.css';

// Example 1: Fullscreen Background
export function HeaderWithFullscreenEffect() {
  return (
    <>
      <FluidLightPattern fullscreen />
      <header className={styles.header}>
        <h1>Your Name</h1>
        <p>Full Stack Developer</p>
      </header>
    </>
  );
}

// Example 2: Section Background
export function HeroWithEffect() {
  return (
    <section className={styles.hero}>
      <FluidLightPattern 
        style={{ position: 'absolute', inset: 0 }}
        config={{
          baseRadius: 200,
          patternColor: '#0d00ff',
        }}
      />
      <div className={styles.heroContent}>
        <h1>Welcome</h1>
      </div>
    </section>
  );
}

// Example 3: Custom Configuration
export function CustomEffect() {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <FluidLightPattern
        config={{
          // Light blob settings
          baseRadius: 180,
          blurAmount: 40,
          currentOpacity: 0.8,
          trailMultiplier: 0.5,
          fadeSpeed: 0.008,
          
          // Age fade
          ageFadeType: 'exponential',
          ageFadeStrength: 0.6,
          
          // Colors
          backgroundColor: '#0a0e27',
          patternColor: '#4361ee',
          
          // Animation
          animationSpeed: 0.8,
        }}
      />
      <div style={{ position: 'relative', zIndex: 10 }}>
        Content here
      </div>
    </div>
  );
}

// Example 4: Multiple Sections with Different Configs
export function Portfolio() {
  return (
    <>
      {/* Hero Section - Intense */}
      <section className={styles.hero}>
        <FluidLightPattern
          config={{
            baseRadius: 200,
            currentOpacity: 1,
            patternColor: '#0d00ff',
          }}
        />
        <div className={styles.content}>Hero Content</div>
      </section>

      {/* About Section - Subtle */}
      <section className={styles.about}>
        <FluidLightPattern
          config={{
            baseRadius: 250,
            currentOpacity: 0.3,
            fadeSpeed: 0.01,
            patternColor: '#1a1a2e',
          }}
        />
        <div className={styles.content}>About Content</div>
      </section>

      {/* Projects Section - Dynamic */}
      <section className={styles.projects}>
        <FluidLightPattern
          config={{
            baseRadius: 150,
            animationSpeed: 1.5,
            patternColor: '#ff006e',
          }}
        />
        <div className={styles.content}>Projects</div>
      </section>
    </>
  );
}

// Example 5: With Debug (for development)
export function DebugMode() {
  return (
    <FluidLightPattern
      fullscreen
      showDebug={true}
      config={{
        baseRadius: 190,
      }}
    />
  );
}

// CSS Module Example (Header.module.css)
/*
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.heroContent {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
}

.about {
  position: relative;
  min-height: 500px;
  background: #000;
}

.content {
  position: relative;
  z-index: 10;
  padding: 2rem;
}
*/