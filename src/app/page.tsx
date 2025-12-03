// src/app/page.js
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Camera, Video, PenTool, Film, 
  MessageCircle, ChevronDown, Sparkles, 
  Send, ArrowRight, CheckCircle, Star,
  Phone, Mail, MapPin, Menu, X,
  Facebook, Linkedin, Instagram, Play,
  Users, Clock, TrendingUp, Shield,
  Award, Briefcase, Headphones, Download,
  ChevronRight, ExternalLink, Check,
  Heart, Eye, Zap, Target, Users as TeamIcon,
  Building, Globe, Mic, Edit3,
  BarChart, PieChart, ThumbsUp,
  Quote, Calendar, Mail as MailIcon,
  ShieldCheck, Coffee, Handshake,
  CameraOff, Maximize2, Lightbulb,
  Cloud, Filter, Settings, Palette,
  Layers, Compass, Globe2, Rocket,
  Volume2, Music, Film as FilmIcon,
  CameraIcon, Radio, Disc, Waves,
  Palette as PaletteIcon, Brush,
  Type, Grid, Zap as ZapIcon,
  Moon, Sun, CloudLightning,
  Wind, Droplets, Sparkle
} from 'lucide-react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeParticle, setActiveParticle] = useState(0);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const audioRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Enhanced scroll progress
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  // Audio effect
  const playAudioEffect = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsAudioPlaying(true);
      setTimeout(() => setIsAudioPlaying(false), 1000);
    }
  };

  // Particle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveParticle((prev) => (prev + 1) % 20);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      playAudioEffect();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    playAudioEffect();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: ''
      });
      setSubmitStatus(null);
    }, 5000);
  };

  const openWhatsApp = () => {
    const message = `Bonjour Blue Ocean Production,

Je souhaite discuter d'un projet audiovisuel. Pourriez-vous me recontacter ?`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  const services = [
    {
      icon: <Camera className="w-12 h-12" />,
      title: 'Production Vidéo',
      description: 'Création de vidéos corporate, publicitaires et institutionnelles qui racontent votre histoire avec impact',
      features: ['Scénarisation professionnelle', 'Tournage 4K HDR', 'Montage cinématographique', 'Étalonnage DaVinci Resolve'],
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      delay: 0.1,
      audioColor: 'text-blue-500'
    },
    {
      icon: <Video className="w-12 h-12" />,
      title: 'Shooting Photo',
      description: 'Photographie artistique et commerciale qui sublime votre image de marque',
      features: ['Photo produit studio', 'Portrait corporate', 'Reportage événementiel', 'Retouche professionnelle'],
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      delay: 0.2,
      audioColor: 'text-purple-500'
    },
    {
      icon: <PenTool className="w-12 h-12" />,
      title: 'Motion Design',
      description: 'Animations créatives et infographies dynamiques pour une communication percutante',
      features: ['Animation 2D/3D', 'Infographie animée', 'Vidéos explicatives', 'Animations logo'],
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      delay: 0.3,
      audioColor: 'text-green-500'
    },
    {
      icon: <Film className="w-12 h-12" />,
      title: 'Post-Production',
      description: 'Montage créatif, effets visuels et sound design pour des productions cinématographiques',
      features: ['Montage Avid/FCP', 'Sound design Dolby', 'Étourage VFX', 'Color grading avancé'],
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      delay: 0.4,
      audioColor: 'text-orange-500'
    }
  ];

  const portfolio = [
    {
      category: 'Corporate',
      title: 'Maroc Telecom - Vidéo Institutionnelle',
      description: 'Production d\'une série documentaire corporate',
      color: 'bg-gradient-to-br from-blue-600 to-blue-800',
      duration: '2:30 min',
      views: '150K+',
      audioEffect: 'corporate'
    },
    {
      category: 'Publicité',
      title: 'OCP Group - Campagne Ramadan',
      description: 'Spot TV primé diffusé nationalement',
      color: 'bg-gradient-to-br from-purple-600 to-purple-800',
      duration: '0:45 min',
      views: '2M+',
      audioEffect: 'advertisement'
    },
    {
      category: 'Événementiel',
      title: 'SIAM 2023 - Couverture Live',
      description: 'Production multicaméra en direct',
      color: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
      duration: 'Livestream',
      views: '50K+',
      audioEffect: 'event'
    }
  ];

  const testimonials = [
    {
      name: 'Karim Benjelloun',
      role: 'Directeur Marketing, Groupe Holding',
      content: "L'expertise technique et la créativité de Blue Ocean ont transformé notre vision en une production cinématographique qui a dépassé toutes nos attentes.",
      company: 'Holding Group',
      avatar: 'KB',
      rating: 5,
      audio: 'testimonial1'
    },
    {
      name: 'Sara El Mansouri',
      role: 'Responsable Communication, Startup Tech',
      content: "Leur approche data-driven et leur compréhension des tendances digitales ont multiplié notre engagement en ligne par 3 en seulement 2 mois.",
      company: 'Tech Startup',
      avatar: 'SM',
      rating: 5,
      audio: 'testimonial2'
    },
    {
      name: 'Mehdi Alaoui',
      role: 'Directeur Général, PME',
      content: "Un partenariat exceptionnel. Leur capacité à traduire notre ADN de marque en contenu visuel impactant a révolutionné notre communication.",
      company: 'Entreprise Locale',
      avatar: 'MA',
      rating: 5,
      audio: 'testimonial3'
    }
  ];

  const stats = [
    { value: '150+', label: 'Projets Réalisés', icon: <Award className="w-6 h-6" />, sound: 'projects' },
    { value: '98%', label: 'Satisfaction Client', icon: <ThumbsUp className="w-6 h-6" />, sound: 'satisfaction' },
    { value: '50+', label: 'Clients Prestigieux', icon: <Briefcase className="w-6 h-6" />, sound: 'clients' },
    { value: '5M+', label: 'Vues Cumulées', icon: <Eye className="w-6 h-6" />, sound: 'views' }
  ];

  const faqs = [
    {
      question: 'Quel est votre délai de production moyen ?',
      answer: 'Pour une vidéo corporate standard (3-5 min), comptez 10-15 jours ouvrables. Nous suivons un processus rigoureux : pré-production (3-5j), tournage (1-3j), post-production (6-8j) avec des points de validation à chaque étape.'
    },
    {
      question: 'Proposez-vous des solutions de financement ?',
      answer: 'Oui, nous offrons des plans de paiement échelonnés et travaillons avec des partenaires financiers. Nous pouvons également adapter la production selon votre budget tout en maintenant notre excellence qualitative.'
    },
    {
      question: 'Quelle est votre zone d\'intervention ?',
      answer: 'Basés à Kénitra, nous intervenons dans tout le Maroc et à l\'international. Notre équipe est équipée pour des tournages en extérieur comme en studio, avec du matériel professionnel dernier cri.'
    },
    {
      question: 'Comment garantissez-vous la qualité finale ?',
      answer: 'Qualité certifiée ISO 9001. Processus en 5 étapes : audit créatif, storyboard validé, tournage supervisé, post-production pro, livraison 4K/HDR avec support technique inclus.'
    }
  ];

  const team = [
    {
      name: 'Youssef El Amrani',
      role: 'Directeur Créatif & Réalisateur',
      bio: '20 ans d\'expérience internationale, formé à La Fémis Paris',
      specialty: 'Storytelling & Direction Artistique',
      expertise: ['Cinéma', 'Documentaire', 'Brand Content'],
      imageColor: 'from-blue-500 to-cyan-500',
      audio: 'director'
    },
    {
      name: 'Fatima Zahra Benbrahim',
      role: 'Directrice de Production',
      bio: 'MBA en Management Culturel, experte en stratégie média',
      specialty: 'Gestion de Projet & Planification',
      expertise: ['Production', 'Budgeting', 'Coordination'],
      imageColor: 'from-purple-500 to-pink-500',
      audio: 'producer'
    },
    {
      name: 'Hamid Chraibi',
      role: 'Director of Photography',
      bio: 'Ancien cadreur BBC, spécialiste caméras RED et Arri',
      specialty: 'Cinématographie & Éclairage',
      expertise: ['Prise de vue', 'Color Grading', 'Technique'],
      imageColor: 'from-emerald-500 to-teal-500',
      audio: 'dop'
    }
  ];

  const processSteps = [
    { number: '01', title: 'Discovery & Strategy', description: 'Audit approfondi et stratégie créative', icon: <Compass className="w-6 h-6" />, sound: 'step1' },
    { number: '02', title: 'Concept & Scripting', description: 'Développement créatif et scénarisation', icon: <Edit3 className="w-6 h-6" />, sound: 'step2' },
    { number: '03', title: 'Production', description: 'Tournage professionnel multicaméra', icon: <Camera className="w-6 h-6" />, sound: 'step3' },
    { number: '04', title: 'Post-Production', description: 'Montage, effets et sound design', icon: <Film className="w-6 h-6" />, sound: 'step4' },
    { number: '05', title: 'Delivery & Analytics', description: 'Livraison et analyse performance', icon: <BarChart className="w-6 h-6" />, sound: 'step5' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased overflow-x-hidden">
      {/* Audio Element for Sound Effects */}
      <audio ref={audioRef} preload="auto">
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3" type="audio/mpeg" />
      </audio>

      {/* Enhanced Header */}
      <motion.header 
        style={{ scale: headerScale, opacity: headerOpacity }}
        className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl py-3' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo with Audio Effect */}
            <motion.div 
              className="flex items-center cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                scrollToSection('hero');
                playAudioEffect();
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 12 }}
                    animate={{ rotate: isAudioPlaying ? [0, 10, -10, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Video className="w-7 h-7 text-white" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="hidden sm:block">
                  <motion.h1 
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                    animate={isAudioPlaying ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    Blue Ocean
                  </motion.h1>
                  <p className="text-xs text-gray-500 tracking-widest uppercase">Studio Créatif</p>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {['Services', 'Réalisations', 'Process', 'Équipe', 'Clients'].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    scrollToSection(item.toLowerCase().replace(' ', '-'));
                    playAudioEffect();
                  }}
                  className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  openWhatsApp();
                  playAudioEffect();
                }}
                className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 group overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                animate={isAudioPlaying ? { scale: [1, 1.02, 1] } : {}}
              >
                <span className="relative flex items-center font-semibold">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Démarrer un projet
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3 bg-white/80 backdrop-blur-sm rounded-xl"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                playAudioEffect();
              }}
              whileTap={{ scale: 0.9 }}
              animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div 
              className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              <div className="flex flex-col h-full pt-24 px-8 space-y-8">
                {['Services', 'Réalisations', 'Process', 'Équipe', 'Clients', 'Contact'].map((item, idx) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      scrollToSection(item.toLowerCase().replace(' ', '-'));
                      setIsMobileMenuOpen(false);
                      playAudioEffect();
                    }}
                    className="text-xl text-gray-700 hover:text-blue-600 transition-colors py-3 border-b border-gray-100 text-left flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      animate={isAudioPlaying ? { rotate: 360 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <ChevronRight className="w-5 h-5 mr-4 text-gray-400 group-hover:text-blue-600" />
                    </motion.div>
                    {item}
                  </motion.button>
                ))}
                <motion.button
                  onClick={openWhatsApp}
                  className="mt-8 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  animate={isAudioPlaying ? { scale: [1, 1.02, 1] } : {}}
                >
                  <span className="flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Contact WhatsApp
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating Audio Visualizers */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-200/50 mb-10"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 mr-3 text-blue-600" />
                </motion.div>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Agence Créative Primée • Excellence Audiovisuelle
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight tracking-tight"
              >
                <span className="block text-gray-900">Storytelling</span>
                <motion.span 
                  className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent"
                  animate={isAudioPlaying ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  d'Exception
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-gray-600 mb-14 max-w-4xl mx-auto leading-relaxed"
              >
                Nous transformons vos idées en expériences visuelles mémorables. 
                <span className="font-semibold text-gray-900"> Production audiovisuelle sur-mesure</span> 
                pour les marques ambitieuses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  onClick={() => {
                    scrollToSection('contact');
                    playAudioEffect();
                  }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(37, 99, 235, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={isAudioPlaying ? { scale: [1, 1.02, 1] } : {}}
                >
                  <span className="relative flex items-center">
                    Démarrer mon projet
                    <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                </motion.button>

                <motion.button
                  onClick={() => {
                    scrollToSection('réalisations');
                    playAudioEffect();
                  }}
                  className="group px-10 py-5 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center">
                    <motion.div
                      animate={videoPlaying ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Play className="mr-4 w-6 h-6 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    Galerie des réalisations
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Enhanced Stats with Audio Effects */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={playAudioEffect}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.icon.type === Award ? 'from-blue-500/20 to-blue-600/20' : 'from-cyan-500/20 to-cyan-600/20'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                      whileHover={{ rotate: 10 }}
                    >
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                    </motion.div>
                    <motion.div 
                      className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3"
                      animate={isAudioPlaying ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              scrollToSection('services');
              playAudioEffect();
            }}
          >
            <span className="text-sm text-gray-500 mb-2">Explorer</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
        
        {/* Audio Visualizer Background */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              style={{
                left: `${i * 10}%`,
                bottom: '0',
                width: '4px',
                height: `${Math.random() * 100 + 50}px`
              }}
              animate={{
                height: [`${Math.random() * 50 + 30}px`, `${Math.random() * 100 + 50}px`, `${Math.random() * 50 + 30}px`]
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lightbulb className="w-5 h-5 mr-3 text-blue-600" />
              </motion.div>
              <span className="text-sm font-semibold text-blue-600">Notre Expertise</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
            >
              Services <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Premium</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Une gamme complète de services créatifs pour propulser votre communication visuelle
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay }}
                whileHover={{ y: -10 }}
                onHoverStart={() => {
                  setHoveredService(idx);
                  playAudioEffect();
                }}
                onHoverEnd={() => setHoveredService(null)}
                onClick={playAudioEffect}
                className={`relative group cursor-pointer ${service.gradient} backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-transparent transition-all duration-500 overflow-hidden`}
              >
                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon Container */}
                <div className="relative mb-8">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    whileHover={{ rotate: 5 }}
                  >
                    <motion.div
                      animate={hoveredService === idx ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                    animate={{ rotate: hoveredService === idx ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Rocket className="w-5 h-5 text-blue-600" />
                  </motion.div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-4">
                  {service.features.map((feature, fIdx) => (
                    <motion.li
                      key={fIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fIdx * 0.1 }}
                      className="flex items-center text-gray-700 group-hover:text-gray-900"
                    >
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </motion.div>
                      <span className="font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Audio Wave Effect */}
                {hoveredService === idx && (
                  <div className="absolute bottom-4 left-4 flex space-x-1">
                    {[1, 2, 3, 4, 3, 2, 1].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-full"
                        initial={{ height: '4px' }}
                        animate={{ height: [`${height * 4}px`, `${(height + 2) * 4}px`, `${height * 4}px`] }}
                        transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                      />
                    ))}
                  </div>
                )}

                {/* Hover Explore Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hoveredService === idx ? 1 : 0, y: hoveredService === idx ? 0 : 20 }}
                  className="absolute bottom-8 right-8"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <section id="réalisations" className="relative py-32 bg-gradient-to-b from-white to-gray-50">
        {/* Film Grain Effect */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FilmIcon className="w-5 h-5 mr-3 text-purple-600" />
              </motion.div>
              <span className="text-sm font-semibold text-purple-600">Notre Portfolio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
            >
              Réalisations <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Phares</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {portfolio.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                onClick={() => {
                  setVideoPlaying(!videoPlaying);
                  playAudioEffect();
                }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl mb-8 transform group-hover:shadow-2xl transition-all duration-500">
                  <div className={`aspect-video ${item.color} flex items-center justify-center relative overflow-hidden`}>
                    {/* Video Preview Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"
                      animate={videoPlaying ? { opacity: [0.2, 0.4, 0.2] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Play Button */}
                    <motion.div
                      className="relative w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1 }}
                      animate={{ scale: videoPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: videoPlaying ? 0.5 : 0.3, repeat: videoPlaying ? Infinity : 0 }}
                    >
                      <motion.div
                        animate={videoPlaying ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Play className="w-8 h-8 text-purple-600 ml-1" />
                      </motion.div>
                      
                      {/* Ripple Effect */}
                      {videoPlaying && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-purple-500/50"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                        </>
                      )}
                    </motion.div>
                    
                    {/* Audio Waves */}
                    {videoPlaying && (
                      <div className="absolute bottom-4 left-4 flex space-x-1">
                        {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                            animate={{ height: [`${height * 3}px`, `${(height + 1) * 4}px`, `${height * 3}px`] }}
                            transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{item.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          <span className="text-sm">{item.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-700 shadow-lg">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playAudioEffect}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 font-semibold text-lg"
            >
              <motion.span
                animate={isAudioPlaying ? { x: [0, 2, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                Explorer la galerie complète
              </motion.span>
              <ExternalLink className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Enhanced Process Section with Audio Visualizer */}
      <section id="process" className="relative py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="w-5 h-5 mr-3 text-emerald-600" />
              </motion.div>
              <span className="text-sm font-semibold text-emerald-600">Notre Méthodologie</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
            >
              Processus <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Créatif</span>
            </motion.h2>
          </div>

          {/* Audio Visualizer Bar */}
          <div className="relative mb-16 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            {[0, 25, 50, 75, 100].map((pos) => (
              <motion.div
                key={pos}
                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 shadow-lg"
                style={{ left: `${pos}%` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: pos / 100 * 0.5 }}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={playAudioEffect}
                className="relative group cursor-pointer"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="relative mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mb-4"
                      whileHover={{ rotate: 10 }}
                    >
                      {step.number}
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <motion.div
                        className="text-emerald-600"
                        animate={isAudioPlaying ? { scale: [1, 1.2, 1] } : {}}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section id="équipe" className="relative py-32 bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, rgba(37,99,235,0.1), transparent 50%),
                             radial-gradient(circle at 70% 30%, rgba(37,99,235,0.1), transparent 50%)`
          }} />
        </div>
        
        {/* Audio Spectrum Visualization */}
        <div className="absolute bottom-0 left-0 right-0 h-20 opacity-5">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg"
              style={{
                left: `${i * 2}%`,
                width: '1%',
                height: `${Math.sin(i * 0.3) * 30 + 40}px`
              }}
              animate={{
                height: [
                  `${Math.sin(i * 0.3 + 0) * 30 + 40}px`,
                  `${Math.sin(i * 0.3 + 1) * 40 + 50}px`,
                  `${Math.sin(i * 0.3 + 2) * 30 + 40}px`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.05
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <TeamIcon className="w-5 h-5 mr-3 text-blue-600" />
              </motion.div>
              <span className="text-sm font-semibold text-blue-600">Notre Équipe</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
            >
              Experts <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Créatifs</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Une équipe de passionnés combinant expertise technique et vision artistique
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                onClick={playAudioEffect}
                className="group relative cursor-pointer"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  {/* Avatar */}
                  <div className="relative mb-8">
                    <motion.div 
                      className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${member.imageColor} p-1`}
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-3xl font-bold text-gray-900">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Target className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{member.name}</h3>
                  <div className="text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-semibold mb-4 text-center">
                    {member.role}
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-6">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full text-blue-700 font-medium">
                      {member.specialty}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((exp, expIdx) => (
                      <motion.span
                        key={expIdx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: expIdx * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600"
                      >
                        {exp}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Audio Waves */}
      <section id="clients" className="relative py-32 bg-gradient-to-br from-blue-600 to-cyan-500 overflow-hidden">
        {/* Animated Background Waves */}
        <div className="absolute inset-0">
          {[1, 2, 3].map((wave) => (
            <motion.div
              key={wave}
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
              style={{ clipPath: `ellipse(${50 + wave * 10}% ${30 + wave * 5}% at ${50 - wave * 5}% ${50 + wave * 5}%)` }}
              animate={{
                x: [0, 100, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 10 + wave * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Audio Visualization */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 bg-gradient-to-t from-white to-transparent"
              style={{
                left: `${i}%`,
                width: '1px',
                height: `${Math.sin(i * 0.2) * 20 + 40}px`
              }}
              animate={{
                height: [
                  `${Math.sin(i * 0.2) * 20 + 40}px`,
                  `${Math.sin(i * 0.2 + 1) * 30 + 50}px`,
                  `${Math.sin(i * 0.2) * 20 + 40}px`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.01
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Quote className="w-5 h-5 mr-3 text-white" />
              </motion.div>
              <span className="text-sm font-semibold text-white">Témoignages Clients</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            >
              Ils nous <span className="text-cyan-200">font confiance</span>
            </motion.h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-10">
                  <div className="relative">
                    <motion.div
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="text-3xl font-bold text-white">
                        {testimonials[activeTestimonial].avatar}
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Quote className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    {/* Audio Waves around Avatar */}
                    <div className="absolute -inset-4">
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute inset-0 rounded-full border border-white/10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.3, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: ring * 0.3
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {testimonials[activeTestimonial].name}
                    </h3>
                    <p className="text-cyan-100 mb-6">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl text-white/90 italic mb-10 leading-relaxed"
                >
                  "{testimonials[activeTestimonial].content}"
                </motion.p>
                
                <div className="flex items-center justify-between border-t border-white/20 pt-8">
                  <div className="flex items-center">
                    <motion.div
                      animate={isAudioPlaying ? { rotate: 360 } : {}}
                      transition={{ duration: 2 }}
                    >
                      <Building className="w-6 h-6 text-cyan-200 mr-3" />
                    </motion.div>
                    <span className="text-white font-semibold">
                      {testimonials[activeTestimonial].company}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => {
                        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                        playAudioEffect();
                      }}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-6 h-6 text-white rotate-180" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
                        playAudioEffect();
                      }}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-3 mt-10">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setActiveTestimonial(idx);
                    playAudioEffect();
                  }}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'bg-white w-8' : 'bg-white/30'}`}
                  whileHover={{ scale: 1.2 }}
                >
                  {idx === activeTestimonial && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white"
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Audio Frequency Visualization */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5">
          {Array.from({ length: 200 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 bg-gradient-to-t from-cyan-500/30 to-transparent"
              style={{
                left: `${i * 0.5}%`,
                width: '2px',
                height: `${Math.sin(i * 0.1) * 15 + 20}px`
              }}
              animate={{
                height: [
                  `${Math.sin(i * 0.1) * 15 + 20}px`,
                  `${Math.sin(i * 0.1 + 1) * 25 + 30}px`,
                  `${Math.sin(i * 0.1) * 15 + 20}px`
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.01
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="sticky top-32">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Transformons vos idées en <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">réalité visuelle</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    Discutons de votre projet lors d'une consultation gratuite. 
                    Notre équipe d'experts vous accompagne de la conception à la réalisation.
                  </p>

                  <div className="space-y-8">
                    {[
                      { icon: Phone, title: 'Téléphone', text: '+212 600 000 000', subtext: 'Lun-Ven, 9h-18h', sound: 'phone' },
                      { icon: Mail, title: 'Email', text: 'contact@blueocean.ma', subtext: 'Réponse sous 24h', sound: 'email' },
                      { icon: MapPin, title: 'Studio', text: 'Kénitra, Maroc', subtext: 'Intervention nationale & internationale', sound: 'location' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 5 }}
                        onClick={playAudioEffect}
                        className="flex items-start group cursor-pointer"
                      >
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 5 }}
                        >
                          <item.icon className="w-7 h-7 text-cyan-400" />
                        </motion.div>
                        <div>
                          <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                          <p className="text-cyan-100 mb-1">{item.text}</p>
                          <p className="text-sm text-gray-400">{item.subtext}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-12">
                    <h4 className="text-lg font-semibold text-white mb-6">Suivez-nous</h4>
                    <div className="flex space-x-4">
                      {[
                        { icon: Facebook, color: 'from-blue-500 to-blue-600', label: 'Facebook', sound: 'social' },
                        { icon: Instagram, color: 'from-purple-500 to-pink-500', label: 'Instagram', sound: 'social' },
                        { icon: Linkedin, color: 'from-blue-600 to-blue-700', label: 'LinkedIn', sound: 'social' }
                      ].map((social, idx) => (
                        <motion.a
                          key={idx}
                          href="#"
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={playAudioEffect}
                          className={`relative group w-14 h-14 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300`}
                        >
                          <social.icon className="w-7 h-7 text-white" />
                          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {social.label}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-10 shadow-2xl">
                  <div className="flex items-center mb-10">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mr-4"
                      animate={isSubmitting ? { rotate: 360 } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Send className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Contactez-nous</h3>
                      <p className="text-gray-400">Remplissez le formulaire ci-dessous</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-8 p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                            <Check className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg">Message envoyé avec succès !</div>
                            <div className="text-emerald-200">Notre équipe vous contactera dans les 24h.</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Nom complet *
                        </label>
                        <motion.input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="Votre nom"
                          required
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Entreprise
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="+212 XX XX XX XX"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Type de projet *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none"
                        required
                      >
                        <option value="" className="bg-gray-800">Sélectionnez un type de projet</option>
                        <option value="corporate" className="bg-gray-800">Vidéo Corporate</option>
                        <option value="publicite" className="bg-gray-800">Publicité TV/Digital</option>
                        <option value="evenement" className="bg-gray-800">Couverture Événementielle</option>
                        <option value="formation" className="bg-gray-800">Vidéo Formation</option>
                        <option value="animation" className="bg-gray-800">Motion Design</option>
                        <option value="autre" className="bg-gray-800">Autre projet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Votre message *
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                        placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-2xl transition-all duration-500 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      animate={isSubmitting ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <span className="relative flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Envoyer ma demande
                            <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-950 text-white pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
                  whileHover={{ rotate: 10 }}
                  onClick={playAudioEffect}
                >
                  <Video className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold">Blue Ocean Studio</h3>
                  <p className="text-gray-400">Excellence Audiovisuelle</p>
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                Agence créative spécialisée dans la production audiovisuelle premium. 
                Nous transformons les idées en expériences visuelles mémorables.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Linkedin, Globe2].map((Icon, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={playAudioEffect}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Services',
                items: ['Production Vidéo', 'Shooting Photo', 'Motion Design', 'Post-Production', 'Stratégie Digital']
              },
              {
                title: 'Entreprise',
                items: ['À propos', 'Notre équipe', 'Nos réalisations', 'Carrières', 'Presse']
              },
              {
                title: 'Contact',
                items: ['Demande de devis', 'Support technique', 'Consultation gratuite', 'Visite du studio']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold mb-8">{column.title}</h4>
                <ul className="space-y-4">
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group"
                        whileHover={{ x: 5 }}
                        onClick={playAudioEffect}
                      >
                        <motion.div
                          animate={isAudioPlaying ? { rotate: 360 } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <ChevronRight className="w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 transition-all" />
                        </motion.div>
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Blue Ocean Studio. Tous droits réservés.
              </div>
              
              <div className="flex items-center space-x-8">
                {['Politique de confidentialité', 'Conditions d\'utilisation', 'Mentions légales'].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={playAudioEffect}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced WhatsApp Floating Button with Sound */}
      <motion.button
        onClick={() => {
          openWhatsApp();
          playAudioEffect();
        }}
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-2xl flex items-center justify-center"
            animate={isAudioPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            3
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-500"
            animate={isAudioPlaying ? { opacity: [0.2, 0, 0.2] } : { opacity: 0.2 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </motion.button>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playAudioEffect();
            }}
            className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-2xl flex items-center justify-center hover:shadow-3xl transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-white rotate-180" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Audio Toggle */}
      <motion.button
        onClick={() => setIsAudioPlaying(!isAudioPlaying)}
        className="fixed bottom-8 left-24 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isAudioPlaying ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Volume2 className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          <Music className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}