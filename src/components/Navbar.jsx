import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../data/portfolio';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Resume', href: '#resume' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-[999] transition-all duration-700 ${isScrolled ? 'bg-[#020617]/80 backdrop-blur-xl py-4 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent py-8'}`}>
            <div className="container mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center">
                <a href="#" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-300">
                        {profile.initials}
                    </div>
                    <span className="hidden sm:block text-[11px] font-black uppercase tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">
                        {profile.fullName}
                    </span>
                </a>

                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                            >
                                <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300"></span>
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="lg:hidden flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 glass">
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#020617]/95 backdrop-blur-2xl z-[998] lg:hidden"
                    >
                        <div className="flex flex-col h-full justify-center px-12 gap-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-3xl font-bold font-grotesk text-white/50 hover:text-white flex justify-between items-center group"
                                >
                                    <span className="group-hover:text-primary transition-colors underline-offset-8 group-hover:underline">{link.name}</span>
                                    <ArrowUpRight size={24} className="group-hover:text-primary" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
