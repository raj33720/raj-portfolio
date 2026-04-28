import { memo } from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';
import { profile } from '../data/portfolio';

const Resumes = memo(() => {
    return (
        <section id="resume" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <div className="mb-20 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4"
                    >
                        Resources
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-grotesk font-bold text-white tracking-tighter leading-none"
                    >
                        <span className="text-gradient">Resume.</span>
                    </motion.h2>
                </div>

                <div className="flex justify-center">
                    <div className="max-w-md w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass p-10 flex flex-col items-center text-center group hover:bg-slate-900/60 transition-all duration-500 relative border-none shadow-sm hover:shadow-xl w-full"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-3xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Code size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-grotesk text-white leading-tight">{profile.role}</h3>
                            <p className="text-sm text-slate-400 mb-10 leading-relaxed font-inter font-light">
                                Resume snapshot covering internships, full-stack projects, technical skills, education, certifications, and tools used across real-world web development work.
                            </p>

                            <a
                                href={profile.resumePath}
                                download={profile.resumeFileName}
                                className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary group-hover:text-white transition-colors mt-auto group/btn"
                            >
                                Download PDF <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                            </a>

                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>
                    </div>
                </div>

            
            </div>
        </section>
    );
});

export default Resumes;
