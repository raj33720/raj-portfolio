import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projectItems } from '../data/portfolio';

const toPreview = (text = '', maxLength = 118) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}...`;
};

const Projects = memo(() => {
    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
                    <div className="text-left">
                        <motion.p
                            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
                            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4"
                        >
                            Featured Work
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 1, type: 'spring', bounce: 0.3, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-grotesk font-bold text-white tracking-tighter"
                        >
                            Featured <br /><span className="text-gradient">Projects.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 1, type: 'spring', bounce: 0.3, delay: 0.2 }}
                        className="max-w-lg text-slate-400 text-base text-left md:text-right font-inter font-light"
                    >
                        {/* These are some of the projects I've worked on, showcasing my skills in web development and design. Each project highlights my ability to create responsive, user-friendly interfaces and solve complex problems with innovative solutions. */}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {projectItems.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 70, scale: 0.95, filter: 'blur(8px)' }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, type: 'spring', bounce: 0.26, delay: index * 0.08 }}
                            whileHover={{ y: -8, transition: { duration: 0.25 } }}
                            className="group relative overflow-hidden rounded-[2rem] glass border border-white/8 hover:border-primary/40 shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-slate-950/30 transition-colors duration-500"></div>

                            <div className="w-full h-52 relative overflow-hidden">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                    {project.tech.slice(0, 2).map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20 bg-black/45 text-slate-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative p-6 z-10 flex flex-col min-h-[20rem]">
                                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-3">
                                    {project.category}
                                </span>

                                <h3 className="text-3xl font-bold text-white mb-3 font-grotesk tracking-tight group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-slate-400 font-inter font-light leading-relaxed mb-5">
                                    {toPreview(project.solution || project.problem)}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.highlights.slice(0, 3).map((highlight) => (
                                        <span
                                            key={highlight}
                                            className="text-[11px] font-medium border border-white/10 px-3 py-1.5 rounded-full text-slate-300"
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-center gap-3">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full border border-white/15 bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all"
                                    >
                                        <Github size={18} />
                                        View Code
                                    </a>

                                    {(project.demo || project.link) && (
                                        <a
                                            href={project.demo || project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/15 hover:bg-primary hover:border-primary hover:text-white transition-all"
                                            aria-label={`Open ${project.title}`}
                                        >
                                            <ArrowUpRight size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Projects;
