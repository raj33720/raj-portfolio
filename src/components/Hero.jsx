import { memo, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Download, Github, Mail, MapPin, Sparkles } from 'lucide-react';
import { heroStats, profile } from '../data/portfolio';

const MagneticButton = ({ children, className, href, target }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noreferrer' : undefined}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className={className}
        >
            {children}
        </motion.a>
    );
};

const Hero = memo(() => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.22]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 130]);
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.14,
                delayChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
        show: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.1, type: 'spring', bounce: 0.32 }
        }
    };

    return (
        <section id="home" ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-40 md:pt-44 lg:pt-48 pb-16 md:pb-20 perspective-1000">
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full transform-gpu origin-top"
            >
                <div className="grid lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-12 items-center">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="text-left z-20 flex flex-col justify-center"
                    >
                        <motion.div variants={item} className="flex items-center gap-3 mb-5">
                            <span className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500"></span>
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-cyan-400">
                                {profile.heroEyebrow}
                            </span>
                        </motion.div>

                        <motion.p
                            variants={item}
                            className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-200 mb-6"
                        >
                            <Sparkles size={12} className="text-cyan-400" />
                            {profile.role}
                        </motion.p>

                        <motion.h1
                            variants={item}
                            className="text-4xl sm:text-6xl md:text-7xl font-bold font-grotesk leading-[0.95] tracking-tight mb-5 relative"
                        >
                            <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent blur-[60px] -z-10 rounded-full"></div>
                            <span className="text-white">
                                {profile.firstName}{' '}
                            </span>
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                {profile.lastName}.
                            </span>
                        </motion.h1>

                        <motion.h2 variants={item} className="text-lg md:text-2xl font-semibold text-slate-100 leading-snug max-w-2xl">
                            {profile.headline}
                        </motion.h2>

                        <motion.p variants={item} className="text-slate-400 text-base md:text-lg leading-relaxed font-light max-w-2xl mt-5">
                            {profile.summary}
                        </motion.p>

                        <motion.p variants={item} className="text-slate-500 text-sm md:text-base leading-relaxed font-light max-w-2xl mt-3">
                            {profile.subSummary}
                        </motion.p>

                        <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-8">
                            <MagneticButton
                                href="#contact"
                                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold tracking-[0.15em] uppercase hover:opacity-90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                            >
                                <BriefcaseBusiness size={14} /> Hire Me
                            </MagneticButton>

                            <MagneticButton
                                href="#projects"
                                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/10 hover:border-white/40 transition-all"
                            >
                                View Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </MagneticButton>

                            <MagneticButton
                                href={profile.resumePath}
                                target="_blank"
                                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-400/25 bg-cyan-400/8 text-cyan-100 text-xs font-bold tracking-[0.15em] uppercase hover:bg-cyan-400/12 transition-all"
                            >
                                <Download size={14} /> Resume
                            </MagneticButton>
                        </motion.div>

                        <motion.div variants={item} className="flex flex-wrap gap-3 pt-6">
                            {[
                                'Scalable web apps',
                                'RESTful APIs',
                                'Dashboards & insights',
                                'MongoDB workflows'
                            ].map((label) => (
                                <span
                                    key={label}
                                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300"
                                >
                                    {label}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.15, type: 'spring', bounce: 0.22, delay: 0.35 }}
                        className="relative w-full mt-8 lg:mt-0"
                    >
                        <div className="hero-shell glass rounded-[2rem] p-7 md:p-10 lg:p-11 relative overflow-hidden border border-white/8 shadow-[0_0_45px_rgba(15,23,42,0.45)] max-w-[47rem] ml-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.04] via-transparent to-purple-500/[0.06]"></div>
                            <div className="relative z-10">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-7">
                                    <div className="relative shrink-0">
                                        <img
                                            src={profile.avatarUrl}
                                            alt={profile.fullName}
                                            className="w-24 h-24 md:w-28 md:h-28 rounded-3xl object-cover border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                                        />
                                        <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#020617]"></span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-grotesk text-3xl md:text-[2.35rem] font-bold tracking-tight">{profile.fullName}</p>
                                        <p className="text-slate-400 text-base leading-relaxed mt-1.5">{profile.availability}</p>
                                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 mt-3.5 text-sm text-slate-300">
                                            <span className="inline-flex items-center gap-1.5">
                                                <MapPin size={14} className="text-cyan-400" />
                                                {profile.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 break-all sm:break-normal">
                                                <Mail size={14} className="text-cyan-400" />
                                                {profile.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="hero-code-block rounded-[1.5rem] border border-white/8 bg-[#020617]/80 p-6 md:p-7 font-mono text-[13px] md:text-sm leading-7 md:leading-8 text-slate-300 overflow-hidden mb-7">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                                        <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                                        <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                                    </div>
                                    <p><span className="text-cyan-400">const</span> <span className="text-white">developer</span> = {'{'}</p>
                                    <p className="pl-4"><span className="text-purple-400">name</span>: <span className="text-emerald-300">"{profile.fullName}"</span>,</p>
                                    <p className="pl-4"><span className="text-purple-400">stack</span>: <span className="text-emerald-300">["React", "Node", "MongoDB"]</span>,</p>
                                    <p className="pl-4"><span className="text-purple-400">focus</span>: <span className="text-emerald-300">"Dashboards + APIs"</span>,</p>
                                    <p className="pl-4"><span className="text-purple-400">status</span>: <span className="text-emerald-300">"Available"</span>,</p>
                                    <p className="pl-4"><span className="text-purple-400">github</span>: <span className="text-emerald-300">"{profile.githubLabel}"</span></p>
                                    <p>{'}'}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {heroStats.slice(0, 2).map((stat) => (
                                        <div key={stat.label} className="hero-stat-card rounded-2xl border border-white/8 bg-white/[0.04] p-4 min-h-[92px] flex flex-col justify-between">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                                            <p className="text-xl md:text-2xl font-black text-white font-grotesk leading-tight">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid sm:grid-cols-2 gap-3">
                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex justify-center items-center gap-2 px-5 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-slate-200 text-xs font-bold uppercase tracking-[0.15em] hover:border-primary/40 hover:text-white transition-all"
                                    >
                                        <Github size={14} />
                                        GitHub Profile
                                    </a>
                                    <a
                                        href="#contact"
                                        className="inline-flex justify-center items-center gap-2 px-5 py-3.5 rounded-2xl border border-cyan-400/20 bg-cyan-400/8 text-cyan-100 text-xs font-bold uppercase tracking-[0.15em] hover:bg-cyan-400/12 transition-all"
                                    >
                                        <Mail size={14} />
                                        Contact Me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2 transform-gpu will-change-transform pointer-events-none"></div>
        </section>
    );
});

export default Hero;
