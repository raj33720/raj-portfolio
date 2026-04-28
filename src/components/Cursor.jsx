import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Cursor = () => {
    const [isPointer, setIsPointer] = useState(false);

    // Smooth springs for the cursor movement
    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const classList = target?.classList;
            const isClickable =
                target?.tagName === 'A' ||
                target?.tagName === 'BUTTON' ||
                target?.closest?.('a') ||
                target?.closest?.('button') ||
                classList?.contains?.('glass');

            setIsPointer(isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Main Circle */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isPointer ? 1.8 : 1,
                    backgroundColor: isPointer ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0)',
                    borderColor: isPointer ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.4)',
                }}
            />

            {/* Inner Dot with Glow */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(168,85,247,0.8)]"

                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
};

export default Cursor;
