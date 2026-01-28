import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useMemo } from 'react';
import { useFluidAnimation } from './useFluidAnimation';
import { useLightBlobs } from './useLightBlobs';
import { DEFAULT_CONFIG } from './config';
import styles from './FluidLightPattern.module.css';
export const FluidLightPattern = ({ fullscreen = false, className, style, config: configOverrides, showDebug = false, zIndex = { fluid: 1, mask: 2 }, }) => {
    const fluidCanvasRef = useRef(null);
    const maskCanvasRef = useRef(null);
    // Merge default config with overrides
    const config = useMemo(() => ({
        ...DEFAULT_CONFIG,
        ...configOverrides,
    }), [configOverrides]);
    // Initialize WebGL fluid animation
    useFluidAnimation(fluidCanvasRef, config);
    // Initialize light blobs animation
    const debugInfo = useLightBlobs(maskCanvasRef, fluidCanvasRef, config, showDebug);
    const containerClassName = `${styles.container} ${fullscreen ? styles.containerFullscreen : ''} ${className || ''}`.trim();
    return (_jsxs("div", { className: containerClassName, style: style, children: [_jsx("canvas", { ref: fluidCanvasRef, className: styles.fluidCanvas, style: { zIndex: zIndex.fluid } }), _jsx("canvas", { ref: maskCanvasRef, className: styles.maskCanvas, style: { zIndex: zIndex.mask } }), showDebug && (_jsxs("div", { className: styles.debug, children: ["Light spots: ", debugInfo.spots, _jsx("br", {}), "FPS: ", debugInfo.fps] }))] }));
};
FluidLightPattern.displayName = 'FluidLightPattern';
