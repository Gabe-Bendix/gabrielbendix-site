"use client";


// components/LetterGlitch.tsx
import React, { useRef, useEffect } from "react";

export interface LetterGlitchProps {
    glitchColors?: string[];      // Array of hex strings to pick glitch colors from
    glitchSpeed?: number;         // Milliseconds between each “glitch” update
    centerVignette?: boolean;     // If true, draw a dark circle in the center
    outerVignette?: boolean;      // If true, draw a dark circle at the edges
    smooth?: boolean;             // If true, colors tween; otherwise they snap
}

const LetterGlitch: React.FC<LetterGlitchProps> = ({
    glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
}) => {
    // Refs for canvas, animation frame, and drawing state:
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const letters = useRef<
        { char: string; color: string; targetColor: string; colorProgress: number }[]
    >([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef<number>(Date.now());

    // Fixed font metrics:
    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    // All letters/symbols we’ll randomly pick from:
    const lettersAndSymbols = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "!", "@", "#", "$", "&", "*", "(", "}", ")", "-", "_", "+", "=", "/",
        "[", "]", "{", "}", ";", ":", "<", ">", ",", "0", "1", "2", "3",
        "4", "5", "6", "7", "8", "9",
    ];

    // Pick a random character from that array:
    const getRandomChar = () => {
        return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    };

    // Pick a random color from glitchColors:
    const getRandomColor = () => {
        return glitchColors[Math.floor(Math.random() * glitchColors.length)];
    };

    // Convert "#rrggbb" to {r,g,b}:
    const hexToRgb = (hex: string) => {
        // Expand shorthand forms (e.g. "#abc" → "#aabbcc"):
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    };

    // Linearly interpolate between two RGB colors:
    const interpolateColor = (
        start: { r: number; g: number; b: number },
        end: { r: number; g: number; b: number },
        factor: number
    ) => {
        const result = {
            r: Math.round(start.r + (end.r - start.r) * factor),
            g: Math.round(start.g + (end.g - start.g) * factor),
            b: Math.round(start.b + (end.b - start.b) * factor),
        };
        return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    // Given the container’s size (width, height), calculate how many columns/rows
    // of characters will fit if each char is charWidth×charHeight pixels:
    const calculateGrid = (width: number, height: number) => {
        const columns = Math.ceil(width / charWidth);
        const rows = Math.ceil(height / charHeight);
        return { columns, rows };
    };

    // Initialize the letters array to fill columns×rows cells:
    const initializeLetters = (columns: number, rows: number) => {
        grid.current = { columns, rows };
        const totalLetters = columns * rows;
        letters.current = Array.from({ length: totalLetters }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
            colorProgress: 1, // 1 means “we are already at the target color”
        }));
    };

    // Resize the canvas to fill its parent, recalculate grid, and draw once:
    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // CSS dims:
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        // Scale the 2D context so drawing is crisp:
        if (context.current) {
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Compute how many letters can fit:
        const { columns, rows } = calculateGrid(rect.width, rect.height);
        initializeLetters(columns, rows);

        // Draw the letters immediately:
        drawLetters();
    };

    // Draw each letter at its (x,y) in the grid:
    const drawLetters = () => {
        if (!context.current || letters.current.length === 0) return;
        const ctx = context.current;
        const { width, height } = canvasRef.current!.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = "top";

        letters.current.forEach((letter, index) => {
            const x = (index % grid.current.columns) * charWidth;
            const y = Math.floor(index / grid.current.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    // Randomly update a small subset of letters (5% of all) every glitchSpeed ms:
    const updateLetters = () => {
        if (!letters.current || letters.current.length === 0) return;

        const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));
        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.current.length);
            if (!letters.current[index]) continue;

            letters.current[index].char = getRandomChar();
            letters.current[index].targetColor = getRandomColor();

            if (!smooth) {
                // Immediately switch color if smooth = false
                letters.current[index].color = letters.current[index].targetColor;
                letters.current[index].colorProgress = 1;
            } else {
                // Start a color transition
                letters.current[index].colorProgress = 0;
            }
        }
    };

    // Gradually tween each letter’s color from old→target:
    const handleSmoothTransitions = () => {
        let needsRedraw = false;
        letters.current.forEach((letter) => {
            if (letter.colorProgress < 1) {
                letter.colorProgress += 0.05;
                if (letter.colorProgress > 1) letter.colorProgress = 1;

                const startRgb = hexToRgb(letter.color);
                const endRgb = hexToRgb(letter.targetColor);
                if (startRgb && endRgb) {
                    letter.color = interpolateColor(
                        startRgb,
                        endRgb,
                        letter.colorProgress
                    );
                    needsRedraw = true;
                }
            }
        });

        if (needsRedraw) {
            drawLetters();
        }
    };

    // Core animation loop: if enough time has passed, update a few letters and redraw.
    // Then request the next animation frame.
    const animate = () => {
        const now = Date.now();
        if (now - lastGlitchTime.current >= glitchSpeed) {
            updateLetters();
            drawLetters();
            lastGlitchTime.current = now;
        }

        if (smooth) {
            handleSmoothTransitions();
        }

        animationRef.current = window.requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        context.current = canvas.getContext("2d");
        resizeCanvas();
        animate();

        let resizeTimeout: number;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                if (animationRef.current !== null) {
                    window.cancelAnimationFrame(animationRef.current);
                }
                resizeCanvas();
                animate();
            }, 100);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            if (animationRef.current !== null) {
                window.cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener("resize", handleResize);
        };
        // We only want to re‐run if glitchSpeed or smooth changes:
    }, [glitchSpeed, smooth]);

    // Styles for the container (absolutely fill its parent):
    const containerStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        overflow: "hidden",
        zIndex: 0,
    };

    const canvasStyle: React.CSSProperties = {
        display: "block",
        width: "100%",
        height: "100%",
    };

    const outerVignetteStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
    };

    const centerVignetteStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
    };

    return (
        <div style={containerStyle}>
            <canvas ref={canvasRef} style={canvasStyle} />
            {outerVignette && <div style={outerVignetteStyle}></div>}
            {centerVignette && <div style={centerVignetteStyle}></div>}
        </div>
    );
};

export default LetterGlitch;
