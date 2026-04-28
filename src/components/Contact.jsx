import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github as GithubIcon, Phone, MapPin, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { profile } from '../data/portfolio';

const Contact = () => {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );

        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactItems = [
        { icon: <Mail size={20} />, label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
        { icon: <Phone size={20} />, label: 'Phone', text: profile.phone, href: profile.phoneHref },
        { icon: <GithubIcon size={20} />, label: 'GitHub', text: profile.githubLabel, href: profile.github, external: true },
        {
            icon: <MapPin size={20} />,
            label: 'Location',
            text: profile.location,
            href: `https://maps.google.com/?q=${encodeURIComponent(profile.location)}`,
            external: true
        }
    ];

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Contact</p>
                        <h2 className="text-3xl md:text-5xl font-grotesk font-bold text-white mb-8 tracking-tighter leading-none">
                            Let's <span className="text-gradient">Connect.</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-md font-inter font-light leading-relaxed">
                            Available for internships, junior full-stack roles, collaborations, and practical web or dashboard projects. Let&apos;s build something useful together.
                        </p>

                        <div className="space-y-4">
                            {contactItems.map((item, i) => (
                                <a
                                    key={i}
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    rel={item.external ? 'noreferrer' : undefined}
                                    className="flex items-center gap-6 glass p-6 border-none hover:bg-white/5 transition-all shadow-sm group"
                                >
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                                        <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{item.text}</span>
                                    </div>
                                </a>
                            ))}
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass p-10 md:p-14 border-none shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 text-primary/[0.03]">
                            <MessageSquare size={120} />
                        </div>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative z-10 py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4 font-grotesk">Draft Ready!</h3>
                                    <p className="text-slate-400">Your email draft has been prepared for {profile.email}.</p>
                                </motion.div>
                            ) : (
                                <form key="form" className="relative z-10 space-y-8" onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        <div className="relative group">
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                className="w-full bg-transparent border-b border-white/10 px-0 py-4 outline-none focus:border-primary transition-all text-white font-medium placeholder-slate-400"
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-focus-within:w-full transition-all duration-500"></div>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email Address"
                                                className="w-full bg-transparent border-b border-white/10 px-0 py-4 outline-none focus:border-primary transition-all text-white font-medium placeholder-slate-400"
                                            />
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-focus-within:w-full transition-all duration-500"></div>
                                        </div>
                                        <div className="relative group pt-4">
                                            <textarea
                                                required
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell me about your project or opportunity"
                                                rows="4"
                                                className="w-full bg-transparent border-b border-white/10 px-0 py-4 outline-none focus:border-primary transition-all text-white font-medium resize-none placeholder-slate-400"
                                            ></textarea>
                                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-focus-within:w-full transition-all duration-500"></div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-4 group"
                                    >
                                        <>Open Email Draft <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                                    </button>

                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
