import { memo } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Users, Star, ArrowUpRight, GraduationCap, Building2 } from 'lucide-react';
import { educationItems, workExperienceItems, certificates } from '../data/portfolio';

const iconMap = {
    award: <Award size={20} />,
    briefcase: <Briefcase size={20} />,
    users: <Users size={20} />,
    star: <Star size={20} />,
    graduation: <GraduationCap size={20} />,
    building: <Building2 size={20} />,
};

const sectionIntroMotion = {
    initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 1, type: 'spring', bounce: 0.3 },
};

const JourneyCard = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15, filter: 'blur(15px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.1, type: 'spring', bounce: 0.35, delay: index * 0.12 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="glass p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start group hover:border-primary/30 transition-all border-white/5 shadow-lg hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
    >
        <div className={`w-16 h-16 shrink-0 rounded-2xl ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500`}>
            {iconMap[item.icon]}
        </div>
        <div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{item.type}</p>
            <h3 className="text-lg md:text-xl font-bold text-white font-grotesk">{item.title}</h3>
            <span className="text-[10px] md:text-xs font-medium text-slate-400 font-inter mt-1 tracking-wider whitespace-nowrap inline-block">
                {item.period}
            </span>
            <p className="text-slate-400 text-sm leading-relaxed font-light mb-6 mt-4">
                {item.outcome}
            </p>
            <div className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                Resume Highlight <ArrowUpRight size={12} />
            </div>
        </div>
    </motion.div>
);

const CredentialCard = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.92, filter: 'blur(15px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, type: 'spring', bounce: 0.35, delay: index * 0.12 }}
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="glass p-6 md:p-8 relative overflow-hidden group border border-white/5 hover:border-primary/30 transition-all"
    >
        <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
            {iconMap[item.icon]}
        </div>
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{item.type}</p>
        <h3 className="text-xl font-bold text-white font-grotesk mb-2">{item.title}</h3>
        <p className="text-[10px] md:text-xs font-medium text-slate-400 tracking-wider mb-4">{item.period}</p>
        <p className="text-slate-400 text-sm leading-relaxed font-light mb-6">
            {item.outcome}
        </p>
        <div className="flex flex-wrap gap-2">
            {item.items.map((entry) => (
                <span
                    key={entry}
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 rounded-lg group-hover:border-primary/30 transition-all"
                >
                    {entry}
                </span>
            ))}
        </div>
    </motion.div>
);

const SectionHeading = ({ eyebrow, accent }) => (
    <div className="mb-12">
        <motion.p
            {...sectionIntroMotion}
            className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-5"
        >
            {eyebrow}
        </motion.p>
        <motion.h2
            {...sectionIntroMotion}
            transition={{ duration: 1.1, type: 'spring', bounce: 0.3, delay: 0.08 }}
            className="text-4xl md:text-6xl font-grotesk font-black text-white leading-none tracking-tighter"
        >
            My
            <br />
            <span className="text-gradient">{accent}</span>
        </motion.h2>
    </div>
);

const Experience = memo(() => {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                <SectionHeading eyebrow="Professional Journey" accent="Experience." />
                <div className="grid lg:grid-cols-2 gap-8">
                    {workExperienceItems.map((item, index) => (
                        <JourneyCard key={item.title} item={item} index={index} />
                    ))}
                </div>

                <div className="mt-24">
                    <SectionHeading eyebrow="Academic Journey" accent="Education." />
                    <div className="grid lg:grid-cols-2 gap-8">
                        {educationItems.map((item, index) => (
                            <JourneyCard key={item.title} item={item} index={index} />
                        ))}
                    </div>
                </div>

                <div className="mt-24">
                    <SectionHeading eyebrow="Credentials & Foundations" accent="Certificates." />
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                        {certificates && certificates.map((c, idx) => (
                            <motion.a
                                key={idx}
                                href={c.src}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group block rounded-xl overflow-hidden"
                            >
                                <div className="w-full h-40 bg-slate-800 rounded-md overflow-hidden flex items-center justify-center">
                                    <img src={encodeURI(c.src)} alt={c.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="mt-2 text-sm font-medium text-slate-200">{c.title}</div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Experience;
