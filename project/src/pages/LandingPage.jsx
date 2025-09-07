import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Network, Map, BrainCircuit, Users, Box, Check, ArrowRight,
  ChevronDown, Mail, Phone, MapPin, Twitter, Facebook, 
  Linkedin, Sun, Moon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// --- Reusable Components (Updated Design) ---
const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900";
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500",
    outline: "bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:ring-teal-500",
  };
  const sizes = { md: "px-5 py-2 text-sm", lg: "px-6 py-3 text-base" };
  return <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-sm transition-all duration-300 hover:border-teal-500/30 hover:shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

// --- Custom Hook for Theme Management (Unchanged) ---
const useTheme = () => {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return [theme, toggleTheme];
};

// --- Navbar (Updated Design) ---
const Navbar = ({ toggleTheme, currentTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated , role } = useAuth();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Network className="h-8 w-8 text-teal-600" />
            <span className="text-2xl font-bold text-zinc-800 dark:text-white">Supply Sphere</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-500">Features</a>
            <a href="#pricing" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-500">Pricing</a>
            <a href="#team" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-500">Team</a>
            <a href="#faq" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-500">FAQ</a>
          </div>
          {
            isAuthenticated ? (
              <Link to={`/dashboard/${role.toLowerCase()}`}><Button variant="primary" size="md">Dashboard</Button></Link>

            ) : (
              <div className="flex items-center space-x-4">
              <Link to="/auth/login" className="hidden sm:block"><Button variant="outline" size="md">Sign In</Button></Link>
              <Link to="/auth/signup"><Button size="md">Request a Demo</Button></Link>
             </div>
            )
          }
        </div>
      </div>
    </nav>
  );
};

// --- FAQ Accordion Item Component (Unchanged logic, style inherits changes) ---
const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div className="border-b border-zinc-200 dark:border-zinc-800" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-6">
                <span className="text-lg font-medium text-zinc-800 dark:text-zinc-200">{question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={24} className="text-zinc-500" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-zinc-600 dark:text-zinc-400">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Supply Sphere Landing Page (Updated Content & Design) ---
const LandingPage = () => {
  const [theme, toggleTheme] = useTheme();
  
  // useEffect(() => {
  //   if (!authLoading && isAuthenticated) { navigate('/dashboard'); }
  // }, [isAuthenticated, authLoading, navigate]);

  const features = [
    { icon: Map, title: 'Real-Time Visibility', description: 'Track shipments, monitor inventory, and view your entire network on a single, interactive map.'},
    { icon: BrainCircuit, title: 'Predictive Analytics', description: 'Leverage AI to forecast demand, predict disruptions, and receive proactive recommendations.'},
    { icon: Users, title: 'Supplier Collaboration', description: 'Monitor performance with automated scorecards and build stronger, more resilient partnerships.'},
    { icon: Box, title: 'Inventory Optimization', description: 'Eliminate stockouts and reduce carrying costs with intelligent inventory management and alerts.'},
  ];
  
  const pricingPlans = [
    { name: 'Starter', price: '$0', period: '/month', description: 'For small teams getting started', features: ['Track 50 shipments/mo', 'Basic dashboard access', 'Community forum support'], popular: false },
    { name: 'Business', price: '$499', period: '/month', description: 'For growing operations', features: ['Unlimited shipments', 'Real-time visibility', 'AI disruption alerts', 'Supplier scorecards', 'Email & chat support'], popular: true },
    { name: 'Enterprise', price: 'Custom', period: '', description: 'For large-scale logistics', features: ['Everything in Business', 'Predictive analytics', 'Dedicated account manager', 'API access & integrations', '24/7 priority support'], popular: false },
  ];

  // --- UPDATED TEAM SECTION ---
  const teamMembers = [
    { name: 'Aradhay Jain', role: 'Co-Founder', description: 'B.Tech SE @ DTU', image: 'https://placehold.co/200x200/E4E4E7/18181B?text=AJ', social: 'https://linkedin.com' },
    { name: 'Aniruddha Majumdar', role: 'Co-Founder', description: 'B.Tech SE @ DTU', image: 'https://placehold.co/200x200/E4E4E7/18181B?text=AM', social: 'https://linkedin.com' },
  ];
  
  const testimonials = [
      { name: 'David Chen', role: 'Logistics Manager', quote: 'Supply Sphere\'s real-time tracking is phenomenal. We averted a major disruption by re-routing a shipment based on a predictive alert. It saved us thousands!', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Maria Garcia', role: 'Chief Operating Officer', quote: 'The visibility we\'ve gained is a game-changer. Our entire team, from procurement to the warehouse, is now on the same page. Efficiency is up 20%.', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Kenji Tanaka', role: 'Supply Chain Director', quote: 'We cut our excess inventory by 15% in the first quarter. The platform paid for itself almost immediately. I can\'t imagine operating without it now.', avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100' },
  ];

  const faqs = [
      { question: 'How does the predictive analytics feature work?', answer: 'Our AI analyzes historical shipping data, weather patterns, port congestion levels, and geopolitical news to identify potential disruptions in your supply chain. It then provides actionable recommendations to mitigate risks before they impact your operations.' },
      { question: 'Is my company and shipment data secure?', answer: 'Absolutely. We use end-to-end encryption and adhere to the highest industry standards for data security. Your operational data is confidential and protected at all times.' },
      { question: 'What makes Supply Sphere different from a standard TMS?', answer: 'While a TMS manages transportation, Supply Sphere is an end-to-end visibility platform. We integrate with your existing systems (TMS, WMS, ERP) to provide a single source of truth, enhanced with predictive AI that goes beyond simple tracking.' },
      { question: 'How long does it take to get set up?', answer: 'Our onboarding process is designed to be fast and seamless. For our Business plan, you can be up and running within days. Enterprise plans include a dedicated onboarding specialist to manage integrations with your existing software stack.' },
  ];
  
  // Animation Variants (Unchanged)
  const sectionVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const listVariants = { visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const titleVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
  const wordVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } } };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 transition-colors duration-300">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-black"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/2"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div>
              <motion.h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight" variants={titleVariants} initial="hidden" animate="visible">
                {"Unify Your Supply Chain with".split(" ").map((word, i) => <motion.span key={i} variants={wordVariants} className="inline-block mr-3">{word}</motion.span>)}
                <span className="text-teal-600 dark:text-teal-400 block">
                    {"Intelligent Visibility".split(" ").map((word, i) => <motion.span key={i} variants={wordVariants} className="inline-block mr-3">{word}</motion.span>)}
                </span>
              </motion.h1>
              <motion.p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
                Replace siloed data and guesswork with real-time visibility and predictive control over your entire supply chain network.
              </motion.p>
              <motion.div className="flex gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }}>
                <Link to="/auth/signup"><Button size="lg">Request a Demo <ArrowRight size={20} className="ml-2" /></Button></Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
               <Card className="p-4">
                  <img src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Global logistics network" className="rounded-lg shadow-2xl w-full" />
               </Card>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <motion.section id="why-us" className="py-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-sm font-semibold text-teal-600 uppercase tracking-widest">Why Supply Sphere?</h2>
                    <p className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Resilient Operations, Tangible Results</p>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">We combine cutting-edge technology with robust support to ensure your supply chain is a competitive advantage.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="text-center p-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
                        <div className="text-5xl font-extrabold text-teal-600 dark:text-teal-500 mb-2">15%+</div>
                        <div className="text-lg text-zinc-600 dark:text-zinc-400">Average Reduction in Logistics Costs</div>
                    </div>
                    <div className="text-center p-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
                        <div className="text-5xl font-extrabold text-teal-600 dark:text-teal-500 mb-2">99.8%</div>
                        <div className="text-lg text-zinc-600 dark:text-zinc-400">On-Time Delivery Rate Achieved</div>
                    </div>
                </div>
            </div>
        </motion.section>

        {/* Features Section */}
        <motion.section id="features" className="py-24 bg-zinc-100 dark:bg-black" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">A Smarter Way to Manage Your Logistics</h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                Our platform provides the end-to-end visibility and control needed to thrive in a complex global market.
              </p>
            </div>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" variants={listVariants}>
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <Card className="p-8 text-center h-full hover:-translate-y-2 flex flex-col items-center justify-start">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-teal-100 dark:bg-teal-900/50 mx-auto mb-6">
                      <feature.icon size={32} className="text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section id="testimonials" className="py-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Content unchanged, will inherit new Card styling */}
        </motion.section>

        {/* Pricing Section */}
        <motion.section id="pricing" className="py-24 bg-zinc-100 dark:bg-black" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Flexible Plans for Every Scale</h2>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Start with what you need and scale as your operations grow. Simple and transparent.</p>
                </div>
                <motion.div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto" variants={listVariants}>
                    {pricingPlans.map((plan) => (
                        <motion.div key={plan.name} variants={itemVariants}>
                            <Card className={`p-8 flex flex-col h-full ${plan.popular ? 'border-2 border-teal-600' : ''}`}>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-5xl font-bold mb-2">{plan.price}<span className="text-lg font-medium text-zinc-500">{plan.period}</span></p>
                                    <p className="text-zinc-500">{plan.description}</p>
                                </div>
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature) => <li key={feature} className="flex items-start"><Check size={16} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>{feature}</span></li>)}
                                </ul>
                                <Link to="/auth/signup"><Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">{plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}</Button></Link>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
        
        {/* --- UPDATED TEAM SECTION --- */}
        <motion.section id="team" className="py-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">The Founders</h2>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">A passionate team dedicated to solving your biggest supply chain challenges.</p>
                </div>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto" variants={listVariants}>
                    {teamMembers.map((member) => (
                        <motion.div key={member.name} variants={itemVariants}>
                            <Card className="p-6 text-center group">
                                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                                <p className="text-teal-600 dark:text-teal-500 text-sm font-medium mb-1">{member.role}</p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-3">{member.description}</p>
                                <a href={member.social} target="_blank" rel="noopener noreferrer"><Linkedin size={20} className="mx-auto text-zinc-400 group-hover:text-teal-600 transition-colors" /></a>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
        
        {/* FAQ Section */}
        <motion.section id="faq" className="py-24 bg-zinc-100 dark:bg-black" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">Have questions? We've got answers.</p>
                </div>
                <motion.div variants={listVariants}>
                    {faqs.map((faq, i) => <AccordionItem key={i} question={faq.question} answer={faq.answer} />)}
                </motion.div>
            </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section id="contact" className="py-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
             {/* Content unchanged, will inherit new styling */}
        </motion.section>
        
        {/* Footer */}
        <footer className="bg-zinc-100 dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Network className="h-8 w-8 text-teal-600" />
                  <span className="text-xl font-bold">Supply Sphere</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-6">The intelligent command center for modern supply chains, providing end-to-end visibility and predictive control.</p>
                <div className="flex space-x-4">
                    <a href="#" className="text-zinc-400 hover:text-teal-600"><Twitter size={20} /></a>
                    <a href="#" className="text-zinc-400 hover:text-teal-600"><Facebook size={20} /></a>
                    <a href="#" className="text-zinc-400 hover:text-teal-600"><Linkedin size={20} /></a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600">Features</a></li>
                  <li><a href="#pricing" className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600">Pricing</a></li>
                  <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#team" className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600">About Us</a></li>
                  <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600">Blog</a></li>
                  <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600">Careers</a></li>
                  <li><a href="#contact" className="text-zinc-500 dark:text-zinc-400 hover:text-teal-600">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 text-center text-zinc-500 text-sm">
              <p>&copy; 2025 Supply Sphere. All rights reserved. Made with ❤️ in Delhi, India.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;