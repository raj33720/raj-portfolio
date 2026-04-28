import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const StarField = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        let animationFrameId;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e) => {
            targetX = (e.clientX - window.innerWidth / 2);
            targetY = (e.clientY - window.innerHeight / 2);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            initParticles();
        };

        const isLight = theme === 'light';

        const layers = {
            far: [],
            mid: [],
            front: []
        };

        const initParticles = () => {
            layers.far = [];
            layers.mid = [];
            layers.front = [];

            const isMobile = window.innerWidth < 768;
            const isSmallMobile = window.innerWidth < 480;

            // Layer 1: Far Background (Tiny stars, static-ish)
            const farCount = isSmallMobile ? 45 : (isMobile ? 90 : 180);
            for (let i = 0; i < farCount; i++) {
                layers.far.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 1.2 + 0.2,
                    opacity: isLight ? Math.random() * 0.08 + 0.02 : Math.random() * 0.22 + 0.05,
                    speed: Math.random() * 0.04 + 0.01
                });
            }

            // Layer 2: Mid Layer (Glowing particles, parallax)
            const midCount = isSmallMobile ? 10 : (isMobile ? 20 : 42);
            for (let i = 0; i < midCount; i++) {
                layers.mid.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 2 + 0.5,
                    opacity: isLight ? Math.random() * 0.08 + 0.02 : Math.random() * 0.18 + 0.05,
                    parallax: Math.random() * 0.03 + 0.01,
                    glow: Math.random() * 3 + 1
                });
            }

            // Layer 3: Front Layer (Large soft glowing orbs) - Minimal on mobile
            const frontCount = isSmallMobile ? 1 : (isMobile ? 1 : 3);
            for (let i = 0; i < frontCount; i++) {
                layers.front.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: isMobile ? Math.random() * 50 + 100 : Math.random() * 100 + 150,
                    opacity: isLight ? Math.random() * 0.008 + 0.003 : Math.random() * 0.012 + 0.006,
                    parallax: 0.06,
                    vx: (Math.random() - 0.5) * 0.1,
                    vy: (Math.random() - 0.5) * 0.1,
                    color: isLight
                        ? (i % 2 === 0 ? '56, 189, 248' : '96, 165, 250')
                        : (i % 2 === 0 ? '168, 85, 247' : '59, 130, 246')
                });
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth mouse movement
            mouseX += (targetX - mouseX) * 0.05;
            mouseY += (targetY - mouseY) * 0.05;

            // Draw Layer 1 (Far) - Only slow drift
            ctx.fillStyle = isLight ? 'rgba(15,23,42,0.45)' : '#fff';
            layers.far.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) p.y = canvas.height;
                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Layer 2 (Mid) - Parallax
            layers.mid.forEach(p => {
                const px = p.x + (mouseX * p.parallax);
                const py = p.y + (mouseY * p.parallax);
                
                // Wrap around
                let finalX = px % canvas.width;
                if (finalX < 0) finalX += canvas.width;
                let finalY = py % canvas.height;
                if (finalY < 0) finalY += canvas.height;

                ctx.globalAlpha = p.opacity;
                ctx.beginPath();
                ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Layer 3 (Front) - Soft Orbs
            layers.front.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                const px = p.x + (mouseX * p.parallax);
                const py = p.y + (mouseY * p.parallax);

                let finalX = px % canvas.width;
                if (finalX < -p.size) finalX += canvas.width + p.size * 2;
                let finalY = py % canvas.height;
                if (finalY < -p.size) finalY += canvas.height + p.size * 2;

                const gradient = ctx.createRadialGradient(
                    finalX, finalY, 0,
                    finalX, finalY, p.size
                );
                gradient.addColorStop(0, `rgba(${p.color}, ${p.opacity})`);
                gradient.addColorStop(1, `rgba(${p.color}, 0)`);

                ctx.globalAlpha = 1;
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-20 pointer-events-none transform-gpu transition-opacity duration-1000"
            style={{ backgroundColor: theme === 'light' ? '#eef4ff' : '#020617' }}
        />
    );
};

export default StarField;
