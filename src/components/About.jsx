import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Database, LayoutPanelTop, Rocket, Server } from 'lucide-react';
import { aboutCards, profile } from '../data/portfolio';

const iconMap = {
    layout: <LayoutPanelTop size={24} />,
    server: <Server size={24} />,
    database: <Database size={24} />,
    rocket: <Rocket size={24} />,
};

const About = memo(() => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const headerY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden perspective-1000">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative z-10">
                    <motion.div
                        style={{ y: headerY }}
                        initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-grotesk font-black text-white mb-4 tracking-tighter">About Me</h2>
                        <p className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm">
                            Vadodara-based developer building with MERN and data-driven thinking
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 1, type: 'spring', bounce: 0.3, delay: 0.1 }}
                        className="md:col-span-4 glass p-8 md:p-12 relative overflow-hidden group rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <div className="relative z-10 max-w-4xl">
                            <h3 className="text-2xl sm:text-3xl font-bold font-grotesk mb-6 text-white tracking-tight">
                                {profile.role} <span className="text-gradient">focused on practical web products</span>
                            </h3>
                            <p className="text-slate-400 text-base md:text-xl leading-relaxed font-inter font-light">
                                {profile.summary} {profile.subSummary} I enjoy turning requirements into responsive interfaces, maintainable backend workflows, and web experiences that feel clear and reliable for real users.
                            </p>
                        </div>
                    </motion.div>

                    {aboutCards.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 1, type: 'spring', bounce: 0.4, delay: 0.1 + (index * 0.1) }}
                            className="glass p-6 md:p-8 relative overflow-hidden group flex flex-col justify-between rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-500"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen`}></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                        {iconMap[item.icon]}
                                    </div>
                                    <ArrowUpRight className="text-slate-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">{item.title}</p>
                                    <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300 leading-tight mb-4 tracking-tight">
                                        {item.text}
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed font-inter font-light">
                                        {item.subtext}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default About;
