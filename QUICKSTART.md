# 🚀 Quick Start Guide

## Step-by-Step: From Zero to Working Component

### 1️⃣ Setup the Repository (5 minutes)

```bash
# Navigate to the project
cd fluid-light-pattern

# Install dependencies
pnpm install

# Build the component
pnpm build
```

### 2️⃣ Test the Demo (Optional)

```bash
# Start development server
pnpm dev
```

Your browser opens with the interactive demo at `http://localhost:3000`

### 3️⃣ Push to GitHub (5 minutes)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Fluid Light Pattern"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/fluid-light-pattern.git
git branch -M main
git push -u origin main
```

### 4️⃣ Install in Your Portfolio (2 minutes)

```bash
# Navigate to your portfolio
cd /path/to/renato-bohler.github.io

# Install from GitHub
pnpm install github:YOUR_USERNAME/fluid-light-pattern
```

### 5️⃣ Use in Your Code (2 minutes)

**Option A: Fullscreen Background**

```tsx
// pages/index.tsx
import { FluidLightPattern } from 'fluid-light-pattern';

export default function Home() {
  return (
    <>
      <FluidLightPattern fullscreen />
      <main>Your content</main>
    </>
  );
}
```

**Option B: In Existing Header Component**

```tsx
// src/components/sections/Header/Header.tsx
import { FluidLightPattern } from 'fluid-light-pattern';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      {/* Add the effect */}
      <FluidLightPattern 
        style={{ position: 'absolute', inset: 0 }}
      />
      
      {/* Your existing content */}
      <div className={styles.existingContent}>
        {/* ... */}
      </div>
    </header>
  );
}
```

**Update CSS:**
```css
/* Header.module.css */
.header {
  position: relative; /* Important! */
}

.existingContent {
  position: relative;
  z-index: 10; /* Above the effect */
}
```

### 6️⃣ Customize (Optional)

```tsx
<FluidLightPattern 
  config={{
    baseRadius: 200,
    patternColor: '#0d00ff',
    currentOpacity: 0.8,
    animationSpeed: 0.8,
  }}
/>
```

---

## ✅ That's It!

You now have:
- ✅ A standalone GitHub repository
- ✅ An npm-installable component
- ✅ Full TypeScript support
- ✅ Interactive demo for testing
- ✅ Integrated in your portfolio

---

## 🎯 Common First Use Cases

### Use Case 1: Hero Section Background
```tsx
<section className={styles.hero}>
  <FluidLightPattern />
  <h1>Welcome to My Portfolio</h1>
</section>
```

### Use Case 2: About Section Subtle Effect
```tsx
<section className={styles.about}>
  <FluidLightPattern 
    config={{
      currentOpacity: 0.3,
      fadeSpeed: 0.01,
    }}
  />
  <div className={styles.content}>About me...</div>
</section>
```

### Use Case 3: Full Page Background
```tsx
export default function Home() {
  return (
    <>
      <FluidLightPattern fullscreen />
      {/* All your sections */}
    </>
  );
}
```

---

## 🔧 Troubleshooting

**Not showing?**
- Check that parent has `position: relative`
- Verify z-index values
- Ensure canvas has width/height

**Performance issues?**
- Lower `baseRadius`
- Increase `fadeSpeed`
- Reduce `blurAmount`

**Want to customize?**
- Use the demo (`pnpm dev`) to test settings
- Copy values to your `config` prop

---

## 📚 Next Steps

- Read [INSTALLATION.md](./INSTALLATION.md) for detailed setup
- Check [examples/](./examples/) for more use cases
- See [README.md](./README.md) for full API documentation
- Open [demo/index.html](./demo/index.html) to experiment

---

## 💡 Pro Tip

Start with the demo, find settings you like, then copy them to your portfolio:

```bash
# In fluid-light-pattern repo
pnpm dev

# Adjust sliders in browser
# Copy the values you like
# Use them in your portfolio config
```

Happy coding! 🎉