import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle fixed right-5 top-24 md:right-6 md:top-28 z-[1200] px-3 py-2 rounded-2xl glass border-none shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden inline-flex items-center gap-2"
            aria-label="Toggle Theme"
        >
            <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {theme === 'light' ? (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Sun size={20} className="text-orange-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ y: 20, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Moon size={20} className="text-blue-400" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-200">
                {theme === 'light' ? 'Light' : 'Dark'}
            </span>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
    );
};

export default ThemeToggle;
