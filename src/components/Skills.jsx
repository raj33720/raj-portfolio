import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Zap } from 'lucide-react';
import { skillGroups } from '../data/portfolio';

const iconMap = {
    code: <Code2 size={20} />,
    globe: <Globe size={20} />,
    database: <Database size={20} />,
    zap: <Zap size={20} />,
};

const Skills = () => {
    return (
        <section id="skills" className="py-24 relative bg-slate-900/20">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center lg:text-left">
                <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
                    <div className="max-w-2xl">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4"
                        >
                            Capabilities
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-grotesk font-bold text-white leading-tight"
                        >
                            Technical <br /><span className="text-gradient">Infrastructure.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass px-5 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 md:gap-4 text-center sm:text-left mx-auto lg:mx-0 w-full md:w-auto"
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                            <Cpu size={18} className="animate-pulse" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Core Focus</p>
                            <p className="text-xs text-white font-medium">Responsive UI • REST APIs • MVC Architecture</p>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden rounded-3xl">
                    {skillGroups.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            whileHover={{ y: -10 }}
                            className={`glass p-6 md:p-10 flex flex-col group relative rounded-3xl border border-white/5 ${skill.primary ? 'ring-2 ring-primary/30' : ''}`}
                        >
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500 rounded-3xl md:rounded-none"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 w-fit bg-white/5 rounded-xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {iconMap[skill.icon]}
                                    </div>
                                    {skill.primary && (
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-primary text-white rounded">Focus</span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                                    {skill.category}
                                </h3>

                                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-light text-left">
                                    {skill.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto justify-start">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white/5 border border-white/5 text-slate-400 group-hover:border-primary/20 group-hover:text-primary group-hover:text-slate-200 transition-all cursor-default"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-4 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
