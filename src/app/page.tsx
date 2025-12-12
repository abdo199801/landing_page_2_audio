// src/app/page.js
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { 
  Camera, Video, PenTool, Film, 
  MessageCircle, ChevronDown, Sparkles, 
  Send, ArrowRight, CheckCircle, Star,
  Phone, Mail, MapPin, Menu, X,
  Facebook, Linkedin, Instagram, Play,
  Users, Clock, TrendingUp, Shield,
  Award, Briefcase, Headphones, Download,
  ChevronRight, ExternalLink, Check,
  Heart, Eye, Zap, Target,
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
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [themeAnimation, setThemeAnimation] = useState(false);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const audioRef = useRef(null);
  const formRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  // SEO Keywords Arrays remain the same
  const primaryKeywords = [
    "production audiovisuelle Maroc",
    "agence vidéo professionnelle Maroc", 
    "studio production vidéo Kénitra",
    "réalisation vidéo corporate Maroc",
    "shooting photo professionnel Maroc",
    "motion design Maroc",
    "post-production vidéo",
    "tournage vidéo 4K HDR",
    "photographie produit studio",
    "animation 2D/3D Maroc"
  ];

  const locationKeywords = [
    "production vidéo Kénitra",
    "agence audiovisuelle Rabat",
    "studio vidéo Casablanca",
    "motion design Maroc",
    "réalisation film institutionnel Maroc",
    "photographe professionnel Kénitra",
    "tournage vidéo Rabat Salé",
    "production audiovisuelle région Rabat Kénitra"
  ];

  const serviceKeywords = [
    "vidéo publicitaire Maroc",
    "film corporate entreprise",
    "reportage événementiel",
    "vidéo formation entreprise",
    "spot TV Ramadan",
    "couverture live événements",
    "making of produit",
    "interview corporate",
    "vidéo institutionnelle",
    "clip promotionnel"
  ];

  const technicalKeywords = [
    "color grading DaVinci Resolve",
    "sound design professionnel",
    "montage vidéo Avid Media Composer",
    "étalonnage professionnel",
    "effets visuels VFX",
    "tournage multicaméra",
    "drone vidéo aérienne",
    "studio photo équipé",
    "éclairage professionnel",
    "prise de son numérique"
  ];

  const businessKeywords = [
    "devis production vidéo gratuit",
    "prix shooting photo Maroc",
    "budget motion design",
    "tarif agence audiovisuelle",
    "coût production film corporate",
    "forfait vidéo entreprise",
    "offre package communication visuelle",
    "prestation audiovisuelle sur mesure"
  ];

  // Initialiser le thème
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  // Appliquer le thème
  useEffect(() => {
    if (!mounted) return;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Animation de transition de thème
  const toggleTheme = () => {
    setThemeAnimation(true);
    playAudioEffect();
    
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      setTimeout(() => {
        setThemeAnimation(false);
      }, 300);
    }, 100);
  };

  // Créer un effet visuel créatif pour le changement de thème
  const ThemeEffect = () => {
    if (!themeAnimation) return null;
    
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10" />
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
              scale: [0, 2, 0],
              opacity: [1, 0.5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: 0
            }}
          />
        ))}
      </div>
    );
  };

  const playAudioEffect = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsAudioPlaying(true);
      setTimeout(() => setIsAudioPlaying(false), 1000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveParticle((prev) => (prev + 1) % 20);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsLoading(true);
    playAudioEffect();
    
    // Validation côté client
    if (!formData.name || !formData.email || !formData.phone || !formData.projectType || !formData.message) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setIsLoading(false);
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return;
    }
    
    try {
      console.log('📤 Envoi des données au serveur:', formData);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('📥 Réponse du serveur:', result);

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Réinitialiser le formulaire après succès
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: ''
        });
        
        // Auto-scroll pour montrer le message de succès
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      } else {
        setSubmitStatus('error');
        console.error('❌ Erreur serveur:', result.error);
      }
    } catch (error) {
      console.error('❌ Erreur réseau:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
      
      // Réinitialiser le statut après 8 secondes
      setTimeout(() => {
        setSubmitStatus(null);
      }, 8000);
    }
  };

  const openWhatsApp = () => {
    const message = `Bonjour Blue Ocean Production,

Je souhaite discuter d'un projet audiovisuel. 
Type de projet : [Vidéo corporate/Publicité/Événementiel/Motion design]
Budget approximatif : [Indiquez si connu]
Délai souhaité : [Date de livraison]

Pourriez-vous me recontacter pour un devis personnalisé ?`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

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
      title: 'Production Vidéo Professionnelle',
      description: 'Création de vidéos corporate, publicitaires et institutionnelles au Maroc. Tournage 4K HDR avec scénarisation professionnelle et montage cinématographique pour un impact maximal.',
      features: ['Scénarisation professionnelle', 'Tournage 4K HDR multicaméra', 'Montage cinématographique Avid/FCP', 'Étalonnage DaVinci Resolve', 'Sound design Dolby Atmos'],
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      darkGradient: 'dark:from-blue-900/30 dark:to-cyan-900/30',
      delay: 0.1,
      audioColor: 'text-blue-500',
      image: 'https://images.unsplash.com/photo-1764581659101-0c2a38ebe301?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      seoTitle: 'Production Vidéo Corporate et Publicitaire au Maroc',
      keywords: ['vidéo entreprise', 'film institutionnel', 'spot publicitaire', 'reportage corporate']
    },
    {
      icon: <Video className="w-12 h-12" />,
      title: 'Shooting Photo Studio & Extérieur',
      description: 'Photographie artistique et commerciale professionnelle au Maroc. Studio équipé avec éclairage professionnel pour shooting produit, portrait corporate et reportage événementiel.',
      features: ['Photo produit studio lumière naturelle', 'Portrait corporate professionnel', 'Reportage événementiel entreprises', 'Retouche photo Photoshop avancée', 'Packshot e-commerce'],
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      darkGradient: 'dark:from-purple-900/30 dark:to-pink-900/30',
      delay: 0.2,
      audioColor: 'text-purple-500',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      seoTitle: 'Photographie Professionnelle Studio et Extérieur Maroc',
      keywords: ['photographe produit', 'portrait entreprise', 'reportage mariage', 'packshot e-commerce']
    },
    {
      icon: <PenTool className="w-12 h-12" />,
      title: 'Motion Design & Animation 2D/3D',
      description: 'Création d\'animations motion design et infographies dynamiques pour la communication digitale. Motion design explicatif, animation logo et vidéos pédagogiques pour sites web et réseaux sociaux.',
      features: ['Animation 2D/3D After Effects', 'Infographie animée explicative', 'Vidéos pédagogiques entreprises', 'Animations logo identité visuelle', 'Character animation'],
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      darkGradient: 'dark:from-green-900/30 dark:to-emerald-900/30',
      delay: 0.3,
      audioColor: 'text-green-500',
      image: 'https://images.unsplash.com/photo-1680055196833-c2965de0caec?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      seoTitle: 'Motion Design et Animation Vidéo Créative Maroc',
      keywords: ['animation 2D', 'vidéo explicative', 'infographie animée', 'character design']
    },
    {
      icon: <Film className="w-12 h-12" />,
      title: 'Post-Production & Effets Spéciaux',
      description: 'Montage créatif professionnel, étalonnage colorimétrique et effets visuels VFX pour productions cinématographiques. Sound design professionnel et mixage audio 5.1 pour une expérience immersive.',
      features: ['Montage Avid Media Composer Pro', 'Sound design professionnel 5.1', 'Étourage VFX effets spéciaux', 'Color grading avancé DaVinci', 'Correction audio RX'],
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      darkGradient: 'dark:from-orange-900/30 dark:to-red-900/30',
      delay: 0.4,
      audioColor: 'text-orange-500',
      image: 'https://plus.unsplash.com/premium_photo-1710961232728-1bd418c4081d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      seoTitle: 'Post-Production Vidéo et Effets Spéciaux VFX Maroc',
      keywords: ['montage vidéo', 'étalonnage', 'effets spéciaux', 'sound design']
    }
  ];

  const portfolio = [
    {
      category: 'Vidéo Corporate',
      title: 'Maroc Telecom - Film Institutionnel Corporate',
      description: 'Production complète d\'une série documentaire corporate tournée en 4K HDR avec drone aérien. Projet incluant scénarisation, tournage multicaméra et post-production avancée.',
      color: 'bg-gradient-to-br from-blue-600 to-blue-800',
      darkColor: 'dark:from-blue-900 dark:to-blue-950',
      duration: '2:30 min',
      views: '150K+ vues',
      audioEffect: 'corporate',
      image: 'https://images.unsplash.com/photo-1606261463690-0aa5f7cad70f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RmlsbSUyMEluc3RpdHV0aW9ubmVsJTIwQ29ycG9yYXRlfGVufDB8fDB8fHww',
      client: 'Maroc Telecom',
      location: 'Casablanca, Maroc',
      keywords: ['film institutionnel', 'vidéo corporate', 'documentaire entreprise']
    },
    {
      category: 'Publicité TV',
      title: 'OCP Group - Campagne Publicitaire Ramadan',
      description: 'Production spot TV primé diffusé nationalement pendant le Ramadan. Tournage avec acteurs professionnels, éclairage cinéma et post-production effets spéciaux.',
      color: 'bg-gradient-to-br from-purple-600 to-purple-800',
      darkColor: 'dark:from-purple-900 dark:to-purple-950',
      duration: '0:45 min',
      views: '2M+ vues',
      audioEffect: 'advertisement',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      client: 'OCP Group',
      location: 'Rabat, Maroc',
      keywords: ['spot publicitaire', 'campagne TV', 'publicité Ramadan']
    },
    {
      category: 'Événementiel Live',
      title: 'SIAM 2023 - Production Multicaméra Live',
      description: 'Couverture événementielle complète du Salon International de l\'Agriculture avec production live streaming, interviews et montage quotidien.',
      color: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
      darkColor: 'dark:from-emerald-900 dark:to-emerald-950',
      duration: 'Livestream 8h',
      views: '50K+ spectateurs',
      audioEffect: 'event',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      client: 'SIAM - Ministère Agriculture',
      location: 'Meknès, Maroc',
      keywords: ['production événementielle', 'streaming live', 'couverture événement']
    }
  ];

  const testimonials = [
    {
      name: 'Karim Benjelloun',
      role: 'Directeur Marketing, Groupe Attijariwafa Bank',
      content: "L'expertise technique et la créativité de Blue Ocean Production en production audiovisuelle au Maroc ont transformé notre vision en une production cinématographique qui a dépassé toutes nos attentes. Leur approche professionnelle du tournage vidéo corporate et leur maîtrise de la post-production ont été déterminantes.",
      company: 'Attijariwafa Bank',
      location: 'Casablanca, Maroc',
      avatar: 'KB',
      rating: 5,
      audio: 'testimonial1',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      keywords: ['production audiovisuelle banque', 'vidéo corporate finance', 'agence vidéo Casablanca']
    },
    {
      name: 'Sara El Mansouri',
      role: 'Responsable Communication, Total Energies Maroc',
      content: "Leur approche data-driven et leur compréhension des tendances digitales ont multiplié notre engagement en ligne par 3 en seulement 2 mois. La production vidéo pour nos campaines digitales a été un véritable succès grâce à leur expertise en motion design et post-production.",
      company: 'Total Energies Maroc',
      location: 'Rabat, Maroc',
      avatar: 'SM',
      rating: 5,
      audio: 'testimonial2',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      keywords: ['motion design énergie', 'vidéo corporate pétrole', 'production digitale']
    },
    {
      name: 'Mehdi Alaoui',
      role: 'Directeur Général, Cosumar Group',
      content: "Un partenariat exceptionnel pour notre film institutionnel. Leur capacité à traduire notre ADN de marque en contenu visuel impactant a révolutionné notre communication corporate. Le tournage en 4K HDR et l'étalonnage professionnel ont donné un résultat cinématographique.",
      company: 'Cosumar Group',
      location: 'Casablanca, Maroc',
      avatar: 'MA',
      rating: 5,
      audio: 'testimonial3',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      keywords: ['film institutionnel', 'production vidéo agroalimentaire', 'tournage 4K Maroc']
    }
  ];

  const stats = [
    { value: '150+', label: 'Projets Audiovisuels Réalisés', icon: <Award className="w-6 h-6" />, sound: 'projects', description: 'Depuis 2015' },
    { value: '98%', label: 'Satisfaction Client Garantie', icon: <ThumbsUp className="w-6 h-6" />, sound: 'satisfaction', description: 'Clients fidèles' },
    { value: '50+', label: 'Grandes Entreprises Marocaines', icon: <Briefcase className="w-6 h-6" />, sound: 'clients', description: 'Partenaire de confiance' },
    { value: '5M+', label: 'Vues Cumulées en Ligne', icon: <Eye className="w-6 h-6" />, sound: 'views', description: 'Impact digital' }
  ];

  const faqs = [
    {
      question: 'Quel est votre délai de production moyen pour une vidéo corporate ?',
      answer: 'Pour une vidéo corporate standard (3-5 minutes), comptez 10-15 jours ouvrables. Nous suivons un processus rigoureux : pré-production et scénarisation (3-5 jours), tournage professionnel multicaméra (1-3 jours), post-production avancée (6-8 jours) avec des points de validation à chaque étape.'
    },
    {
      question: 'Proposez-vous des solutions de financement pour les projets audiovisuels ?',
      answer: 'Oui, nous offrons des plans de paiement échelonnés adaptés aux entreprises marocaines et travaillons avec des partenaires financiers. Nous pouvons également adapter la production selon votre budget tout en maintenant notre excellence qualitative et nos standards professionnels.'
    },
    {
      question: 'Quelle est votre zone d\'intervention géographique au Maroc ?',
      answer: 'Basés à Kénitra, nous intervenons dans tout le Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir. Notre équipe est équipée pour des tournages en extérieur comme en studio, avec du matériel professionnel dernier cri incluant drone aérien.'
    },
    {
      question: 'Comment garantissez-vous la qualité finale de vos productions vidéo ?',
      answer: 'Qualité certifiée avec processus en 5 étapes : audit créatif approfondi, storyboard validé client, tournage supervisé par directeur photo, post-production professionnelle (DaVinci Resolve, Avid, After Effects), livraison 4K/HDR avec support technique inclus et révisions gratuites.'
    }
  ];

  const processSteps = [
    { 
      number: '01', 
      title: 'Audit & Stratégie Créative', 
      description: 'Analyse approfondie de vos besoins en communication audiovisuelle au Maroc', 
      icon: <Compass className="w-6 h-6" />, 
      sound: 'step1',
      keywords: ['audit vidéo', 'stratégie communication', 'étude marché']
    },
    { 
      number: '02', 
      title: 'Concept & Scénarisation', 
      description: 'Développement créatif et script professionnel adapté au marché marocain', 
      icon: <Edit3 className="w-6 h-6" />, 
      sound: 'step2',
      keywords: ['scénario vidéo', 'storyboard', 'concept créatif']
    },
    { 
      number: '03', 
      title: 'Tournage Professionnel', 
      description: 'Production vidéo avec équipement 4K HDR, drone et éclairage cinéma', 
      icon: <Camera className="w-6 h-6" />, 
      sound: 'step3',
      keywords: ['tournage 4K', 'production film', 'équipe technique']
    },
    { 
      number: '04', 
      title: 'Post-Production Avancée', 
      description: 'Montage, étalonnage DaVinci Resolve et effets visuels professionnels', 
      icon: <Film className="w-6 h-6" />, 
      sound: 'step4',
      keywords: ['montage vidéo', 'étalonnage', 'effets spéciaux']
    },
    { 
      number: '05', 
      title: 'Livraison & Analytics', 
      description: 'Livraison formats multiples et analyse performance sur réseaux sociaux', 
      icon: <BarChart className="w-6 h-6" />, 
      sound: 'step5',
      keywords: ['livraison vidéo', 'analytics', 'performance digitale']
    }
  ];

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Blue Ocean Production - Studio de Production Audiovisuelle au Maroc",
    "description": "Agence de production audiovisuelle professionnelle à Kénitra, Maroc. Spécialisée en production vidéo corporate, shooting photo, motion design et post-production pour entreprises marocaines.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kénitra",
      "addressRegion": "Rabat-Salé-Kénitra",
      "addressCountry": "MA"
    },
    "serviceType": [
      "Production vidéo corporate",
      "Shooting photo professionnel",
      "Motion design et animation",
      "Post-production et effets spéciaux"
    ],
    "areaServed": ["Maroc", "Rabat", "Casablanca", "Marrakech", "Fès", "Tanger", "Agadir"],
    "keywords": [...primaryKeywords, ...locationKeywords, ...serviceKeywords].join(", ")
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased overflow-x-hidden transition-colors duration-500 ${themeAnimation ? 'theme-transition' : ''}`}>
      {/* Effet de transition de thème */}
      <ThemeEffect />
      
      {/* SEO Meta Tags */}
      <Head>
        <title>Blue Ocean Production | Studio Audiovisuel Professionnel à Kénitra, Maroc</title>
        <meta name="description" content="Agence de production audiovisuelle au Maroc : production vidéo corporate, shooting photo professionnel, motion design créatif et post-production avancée. Studio équipé 4K HDR à Kénitra, intervention nationale." />
        <meta name="keywords" content={[...primaryKeywords, ...locationKeywords, ...serviceKeywords, ...technicalKeywords, ...businessKeywords].join(', ')} />
        <meta name="author" content="Blue Ocean Production" />
        <meta name="geo.region" content="MA" />
        <meta name="geo.placename" content="Kénitra, Rabat-Salé-Kénitra, Maroc" />
        <meta name="geo.position" content="34.2610;-6.5802" />
        <meta name="ICBM" content="34.2610, -6.5802" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blue Ocean Production | Studio Audiovisuel Premium au Maroc" />
        <meta property="og:description" content="Production vidéo professionnelle, shooting photo et motion design pour entreprises au Maroc. Agence créative à Kénitra avec équipement 4K HDR et drone aérien." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_MA" />
        <meta property="og:site_name" content="Blue Ocean Production" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blue Ocean Production - Production Audiovisuelle Maroc" />
        <meta name="twitter:description" content="Studio de production vidéo et photo professionnelle à Kénitra. Tournage 4K, motion design, post-production pour entreprises marocaines." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Canonical */}
        <link rel="canonical" href="https://blueocean.ma" />
        
        {/* Alternates for languages if needed */}
        <link rel="alternate" hrefLang="fr" href="https://blueocean.ma" />
        <link rel="alternate" hrefLang="ar" href="https://blueocean.ma/ar" />
      </Head>

      <audio ref={audioRef} preload="auto">
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3" type="audio/mpeg" />
      </audio>

      <motion.header 
        style={{ scale: headerScale, opacity: headerOpacity }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl dark:shadow-gray-800/50 py-3' 
            : 'bg-transparent py-6'
        }`}
        role="banner"
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                scrollToSection('hero');
                playAudioEffect();
              }}
              whileTap={{ scale: 0.95 }}
              role="button"
              aria-label="Retour à l'accueil"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* Bigger logo in header */}
                  <div className="relative w-64 h-20 flex items-center">
                    <Image 
                      src="/logo-blue-ocean.png" 
                      alt="Blue Ocean Production - Studio Audiovisuel Professionnel à Kénitra, Maroc"
                      width={300}
                      height={100}
                      className="object-contain w-full h-full dark:invert dark:brightness-200 transition-all duration-500"
                      priority
                    />
                  </div>
                  <motion.div 
                    className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-blue-400 to-cyan-400' 
                        : 'bg-gradient-to-br from-blue-600 to-cyan-500'
                    }`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-10" aria-label="Navigation principale">
              {[
                { name: 'Services Audiovisuels', id: 'services-audiovisuels' },
                { name: 'Réalisations Vidéo', id: 'realisations-video' },
                { name: 'Process Production', id: 'process-production' },
                { name: 'Témoignages Clients', id: 'temoignages-clients' }
              ].map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    scrollToSection(item.id);
                    playAudioEffect();
                  }}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Aller à la section ${item.name}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              
              {/* Bouton thème créatif */}
              <motion.button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-500 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/30 text-yellow-300'
                    : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 text-blue-600'
                } hover:scale-105 active:scale-95`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
                disabled={themeAnimation}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>

              <motion.button
                onClick={() => {
                  openWhatsApp();
                  playAudioEffect();
                }}
                className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-700 dark:to-cyan-600 text-white rounded-xl hover:shadow-xl dark:hover:shadow-blue-500/25 transition-all duration-300 group overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                animate={isAudioPlaying ? { scale: [1, 1.02, 1] } : {}}
                aria-label="Contacter pour devis production audiovisuelle"
              >
                <span className="relative flex items-center font-semibold">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Devis Gratuit
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </nav>

            <div className="flex items-center gap-4 lg:hidden">
              <motion.button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-500 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/30 text-yellow-300'
                    : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 text-blue-600'
                }`}
                whileTap={{ scale: 0.9 }}
                aria-label={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
                disabled={themeAnimation}
              >
                <motion.div
                  key={theme + 'mobile'}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>
              
              <motion.button
                className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  playAudioEffect();
                }}
                whileTap={{ scale: 0.9 }}
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                aria-label="Menu mobile"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div 
              className="absolute right-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
            >
              <div className="flex flex-col h-full pt-24 px-8 space-y-8">
                <div className="absolute top-6 left-8">
                  <div className="relative w-48 h-12">
                    <Image 
                      src="/logo-blue-ocean.png" 
                      alt="Blue Ocean Production"
                      width={192}
                      height={48}
                      className="object-contain w-full h-full dark:invert dark:brightness-200"
                    />
                  </div>
                </div>
                
                {[
                  'Services Audiovisuels',
                  'Réalisations Vidéo', 
                  'Process Production',
                  'Témoignages Clients',
                  'Contact & Devis'
                ].map((item, idx) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      scrollToSection(item.toLowerCase().replace(/ /g, '-'));
                      setIsMobileMenuOpen(false);
                      playAudioEffect();
                    }}
                    className="text-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800 text-left flex items-center group"
                    whileHover={{ x: 5 }}
                    aria-label={`Aller à ${item}`}
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
                  aria-label="Contacter par WhatsApp pour devis production vidéo"
                >
                  <span className="flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    WhatsApp: +212 600 000 000
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        id="hero" 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-gray-900 to-gray-950 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950"
        aria-labelledby="main-title"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-purple-600/5 dark:from-blue-700/10 dark:via-cyan-700/5 dark:to-purple-700/5" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1588898021174-4f7a5809b4f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExMHx8fGVufDB8fHx8fA%3D%3D")'
            }}
            aria-hidden="true"
          />
        </div>
        
        <div className="absolute inset-0 opacity-10 dark:opacity-5" aria-hidden="true">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-600/5 dark:to-cyan-600/5 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-600/5 dark:to-pink-600/5 rounded-full blur-3xl animate-pulse delay-1000" aria-hidden="true" />
        
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 dark:from-blue-500/10 dark:to-cyan-500/10"
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
            aria-hidden="true"
          />
        ))}

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-200/50 dark:border-blue-500/30 mb-10"
                whileHover={{ scale: 1.05 }}
                role="status"
                aria-label="Agence primée en production audiovisuelle"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 mr-3 text-blue-400" />
                </motion.div>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Agence Créative Primée • Excellence Audiovisuelle au Maroc • Depuis 2015
                </span>
              </motion.div>

              <motion.div className="mb-12 flex justify-center">
                <div className="relative w-96 h-24">
                  <Image 
                    src="/logo-blue-ocean.png" 
                    alt="Blue Ocean Production - Studio Audiovisuel Professionnel Maroc"
                    width={384}
                    height={96}
                    className="object-contain w-full h-full drop-shadow-lg invert brightness-200"
                    priority
                  />
                </div>
              </motion.div>

              <motion.h1
                id="main-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight tracking-tight"
              >
                <span className="block text-white drop-shadow-lg" aria-label="Storytelling d'exception pour votre marque">
                  Storytelling
                </span>
                <motion.span 
                  className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
                  animate={isAudioPlaying ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  aria-label="Production audiovisuelle premium au Maroc"
                >
                  d'Exception au Maroc
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-white/80 mb-14 max-w-4xl mx-auto leading-relaxed drop-shadow-lg"
                aria-label="Description des services de production audiovisuelle"
              >
                Agence de <strong className="font-semibold text-white">production audiovisuelle professionnelle à Kénitra, Maroc</strong>. 
                Nous transformons vos idées en expériences visuelles mémorables avec notre 
                <strong className="font-semibold text-white"> studio équipé 4K HDR, drone aérien et équipe d'experts</strong>.
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
                  aria-label="Obtenir un devis gratuit pour production vidéo"
                >
                  <span className="relative flex items-center">
                    Devis Gratuit Production Vidéo
                    <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                </motion.button>

                <motion.button
                  onClick={() => {
                    scrollToSection('realisations-video');
                    playAudioEffect();
                  }}
                  className="group px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl hover:border-white hover:bg-white/20 transition-all duration-300 font-semibold text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Voir notre portfolio de réalisations vidéo"
                >
                  <span className="flex items-center">
                    <motion.div
                      animate={videoPlaying ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Play className="mr-4 w-6 h-6 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    Portfolio Vidéo Corporate
                  </span>
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              role="region"
              aria-label="Statistiques de production audiovisuelle"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={playAudioEffect}
                  className="group relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/20 dark:border-gray-700/50 cursor-pointer"
                  role="article"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.icon.type === Award ? 'from-blue-500/20 to-blue-600/20 dark:from-blue-900/30 dark:to-blue-800/30' : 'from-cyan-500/20 to-cyan-600/20 dark:from-cyan-900/30 dark:to-cyan-800/30'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                      whileHover={{ rotate: 10 }}
                    >
                      <div className="text-blue-600 dark:text-blue-400">
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
                    <div className="text-gray-800 dark:text-gray-200 font-medium">{stat.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.description}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

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
              scrollToSection('services-audiovisuels');
              playAudioEffect();
            }}
            aria-label="Explorer nos services audiovisuels"
          >
            <span className="text-sm text-white/80 mb-2">Découvrir nos services</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section 
        id="services-audiovisuels" 
        className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900"
        aria-labelledby="services-title"
      >
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200/50 dark:border-blue-700/50 mb-8"
              whileHover={{ scale: 1.05 }}
              role="status"
              aria-label="Expertise en production audiovisuelle"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lightbulb className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Expertise Audiovisuelle Professionnelle</span>
            </motion.div>

            <motion.h2
              id="services-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Services <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">Audiovisuels Premium</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Studio de production audiovisuelle complet au Maroc : production vidéo corporate, shooting photo professionnel, motion design créatif et post-production avancée pour votre communication visuelle.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Liste des services audiovisuels">
            {services.map((service, idx) => (
              <motion.article
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
                className={`relative group cursor-pointer ${service.gradient} ${service.darkGradient} backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent transition-all duration-500 overflow-hidden`}
                role="listitem"
                aria-label={`Service: ${service.title}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`} />
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
                    className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ rotate: hoveredService === idx ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                </div>
                
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-900/10 dark:from-gray-900/40 dark:to-gray-900/20 z-10" />
                  <div 
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${service.image}')` }}
                    aria-label={`Exemple de ${service.title}`}
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-4" aria-label="Caractéristiques du service">
                  {service.features.map((feature, fIdx) => (
                    <motion.li
                      key={fIdx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fIdx * 0.1 }}
                      className="flex items-center text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                    >
                      <motion.div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                      </motion.div>
                      <span className="font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {hoveredService === idx && (
                  <div className="absolute bottom-4 left-4 flex space-x-1" aria-hidden="true">
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hoveredService === idx ? 1 : 0, y: hoveredService === idx ? 0 : 20 }}
                  className="absolute bottom-8 right-8"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-3xl p-8 border border-blue-100 dark:border-blue-800/50"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Équipement Professionnel de Production Audiovisuelle
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Caméras 4K HDR', icon: <Camera className="w-6 h-6" /> },
                  { name: 'Drone Aérien DJI', icon: <Globe className="w-6 h-6" /> },
                  { name: 'Studio Photo Équipé', icon: <CameraIcon className="w-6 h-6" /> },
                  { name: 'Station DaVinci Resolve', icon: <Palette className="w-6 h-6" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-center space-x-3">
                    <div className="text-blue-600 dark:text-blue-400">{item.icon}</div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section 
        id="realisations-video" 
        className="relative py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50"
        aria-labelledby="portfolio-title"
      >
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-700/50 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FilmIcon className="w-5 h-5 mr-3 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                Portfolio Production Vidéo Maroc
              </span>
            </motion.div>

            <motion.h2
              id="portfolio-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Réalisations <span className="bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-500 dark:to-pink-400 bg-clip-text text-transparent">Audiovisuelles</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Découvrez nos productions vidéo corporate, publicités TV et couvertures événementielles pour les plus grandes entreprises marocaines.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20" role="list" aria-label="Portfolio de réalisations vidéo">
            {portfolio.map((item, idx) => (
              <motion.article
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
                role="listitem"
                aria-label={`Projet: ${item.title}`}
              >
                <div className="relative overflow-hidden rounded-3xl mb-8 transform group-hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-video relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('${item.image}')` }}
                      aria-label={`Image du projet ${item.title}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20 group-hover:from-black/50 transition-all duration-500" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative w-20 h-20 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: videoPlaying ? [1, 1.1, 1] : 1 }}
                        transition={{ duration: videoPlaying ? 0.5 : 0.3, repeat: videoPlaying ? Infinity : 0 }}
                        aria-label="Voir la vidéo"
                      >
                        <motion.div
                          animate={videoPlaying ? { rotate: 360 } : {}}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Play className="w-8 h-8 text-purple-600 dark:text-purple-400 ml-1" />
                        </motion.div>
                        
                        {videoPlaying && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-purple-500/50 dark:border-purple-400/50"
                              initial={{ scale: 1, opacity: 1 }}
                              animate={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-purple-500/30 dark:border-purple-400/30"
                              initial={{ scale: 1, opacity: 1 }}
                              animate={{ scale: 2, opacity: 0 }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                          </>
                        )}
                      </motion.div>
                    </div>
                    
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
                    <span className="px-4 py-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-700 dark:text-purple-300 shadow-lg">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-sm font-semibold text-white shadow-lg">
                      {item.client}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{item.location}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playAudioEffect}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 font-semibold text-lg"
              aria-label="Voir toutes nos réalisations vidéo"
            >
              <motion.span
                animate={isAudioPlaying ? { x: [0, 2, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                Voir le Portfolio Complet
              </motion.span>
              <ExternalLink className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      <section 
        id="process-production" 
        className="relative py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
        aria-labelledby="process-title"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200/50 dark:border-emerald-700/50 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="w-5 h-5 mr-3 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Méthodologie de Production Professionnelle
              </span>
            </motion.div>

            <motion.h2
              id="process-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Processus de <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-500 dark:to-teal-400 bg-clip-text text-transparent">Production Audiovisuelle</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Un processus rigoureux en 5 étapes pour garantir l'excellence de votre production vidéo ou shooting photo au Maroc.
            </motion.p>
          </div>

          <div className="relative mb-16 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden" aria-hidden="true">
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
                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-2 border-emerald-500 shadow-lg"
                style={{ left: `${pos}%` }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: pos / 100 * 0.5 }}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8" role="list" aria-label="Étapes du processus de production">
            {processSteps.map((step, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={playAudioEffect}
                className="relative group cursor-pointer"
                role="listitem"
                aria-label={`Étape ${step.number}: ${step.title}`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                  <div className="relative mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mb-4"
                      whileHover={{ rotate: 10 }}
                    >
                      {step.number}
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white dark:bg-gray-900 shadow-lg flex items-center justify-center">
                      <motion.div
                        className="text-emerald-600 dark:text-emerald-400"
                        animate={isAudioPlaying ? { scale: [1, 1.2, 1] } : {}}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-3xl p-10 border border-blue-100 dark:border-blue-800/50">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Certification Qualité</h4>
                <p className="text-gray-600 dark:text-gray-400">Processus qualité certifié ISO 9001 pour la production audiovisuelle</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Garantie Satisfait ou Remboursé</h4>
                <p className="text-gray-600 dark:text-gray-400">30 jours de garantie sur toutes nos productions vidéo et photo</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Respect des Délais</h4>
                <p className="text-gray-600 dark:text-gray-400">Engagement contractuel sur les délais de production et livraison</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="temoignages-clients" 
        className="relative py-32 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-700 overflow-hidden"
        aria-labelledby="testimonials-title"
      >
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
              <span className="text-sm font-semibold text-white">
                Témoignages Clients Production Audiovisuelle
              </span>
            </motion.div>

            <motion.h2
              id="testimonials-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            >
              Ils nous <span className="text-cyan-200">font confiance au Maroc</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-12"
            >
              Découvrez les retours d'expérience des entreprises marocaines qui ont choisi Blue Ocean Production pour leurs projets audiovisuels.
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12"
                aria-label={`Témoignage de ${testimonials[activeTestimonial].name}`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-10">
                  <div className="relative">
                    <motion.div
                      className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white/20"
                      whileHover={{ rotate: 5 }}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${testimonials[activeTestimonial].image}')` }}
                        aria-label={`Portrait de ${testimonials[activeTestimonial].name}`}
                      />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Quote className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4" aria-label="Note 5 étoiles">
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
                    <p className="text-cyan-100 mb-2">
                      {testimonials[activeTestimonial].role}
                    </p>
                    <p className="text-sm text-white/60 mb-6">
                      <Building className="w-4 h-4 inline mr-2" />
                      {testimonials[activeTestimonial].company} • {testimonials[activeTestimonial].location}
                    </p>
                  </div>
                </div>
                
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl text-white/90 italic mb-10 leading-relaxed"
                  cite={`${testimonials[activeTestimonial].company}`}
                >
                  "{testimonials[activeTestimonial].content}"
                </motion.blockquote>
                
                <div className="flex items-center justify-between border-t border-white/20 pt-8">
                  <div className="flex items-center">
                    <motion.div
                      animate={isAudioPlaying ? { rotate: 360 } : {}}
                      transition={{ duration: 2 }}
                    >
                      <Building className="w-6 h-6 text-cyan-200 mr-3" />
                    </motion.div>
                    <div>
                      <span className="text-white font-semibold block">
                        {testimonials[activeTestimonial].company}
                      </span>
                      <span className="text-white/60 text-sm">
                        {testimonials[activeTestimonial].location}
                      </span>
                    </div>
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
                      aria-label="Témoignage précédent"
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
                      aria-label="Témoignage suivant"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            <div className="flex justify-center space-x-3 mt-10" role="tablist" aria-label="Navigation des témoignages">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setActiveTestimonial(idx);
                    playAudioEffect();
                  }}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'bg-white w-8' : 'bg-white/30'}`}
                  whileHover={{ scale: 1.2 }}
                  role="tab"
                  aria-selected={idx === activeTestimonial}
                  aria-label={`Témoignage ${idx + 1}`}
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

          <div className="mt-20 grid md:grid-cols-4 gap-8">
            {[
              { name: 'Maroc Telecom', logo: 'MT', color: 'from-blue-600 to-blue-800' },
              { name: 'OCP Group', logo: 'OCP', color: 'from-green-600 to-green-800' },
              { name: 'Attijariwafa Bank', logo: 'AWB', color: 'from-red-600 to-red-800' },
              { name: 'Total Energies', logo: 'TE', color: 'from-yellow-600 to-yellow-800' }
            ].map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex items-center justify-center"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${client.color} flex items-center justify-center text-white font-bold text-xl`}>
                  {client.logo}
                </div>
                <span className="ml-4 text-white font-semibold">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="contact" 
        ref={formRef}
        className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
        aria-labelledby="contact-title"
      >
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
            }}
            aria-hidden="true"
          />
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
                  <div className="mb-10">
                    <div className="relative w-72 h-20">
                      <Image 
                        src="/logo-blue-ocean.png" 
                        alt="Blue Ocean Production - Studio Audiovisuel Professionnel Maroc"
                        width={288}
                        height={80}
                        className="object-contain w-full h-full invert brightness-200"
                      />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Studio de Production Audiovisuelle • Kénitra, Maroc</p>
                  </div>

                  <h2 id="contact-title" className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Transformons vos idées en <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">réalité audiovisuelle</span>
                  </h2>
                  <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    Studio de production audiovisuelle à Kénitra, Maroc. Discutons de votre projet vidéo corporate, shooting photo ou motion design lors d'une consultation gratuite. Notre équipe d'experts vous accompagne de la conception à la réalisation.
                  </p>

                  <div className="space-y-8">
                    {[
                      { 
                        icon: Phone, 
                        title: 'Téléphone Direct', 
                        text: '+212 600 000 000', 
                        subtext: 'Lun-Ven, 9h-18h • Réponse immédiate', 
                        sound: 'phone',
                        link: 'tel:+212600000000'
                      },
                      { 
                        icon: Mail, 
                        title: 'Email Professionnel', 
                        text: 'contact@blueocean.ma', 
                        subtext: 'Réponse garantie sous 24h ouvrées', 
                        sound: 'email',
                        link: 'mailto:contact@blueocean.ma'
                      },
                      { 
                        icon: MapPin, 
                        title: 'Studio Blue Ocean Production', 
                        text: 'Kénitra, Maroc', 
                        subtext: 'Intervention nationale : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir', 
                        sound: 'location',
                        link: 'https://maps.google.com/?q=Kénitra,Maroc'
                      }
                    ].map((item, idx) => (
                      <motion.a
                        key={idx}
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 5 }}
                        onClick={playAudioEffect}
                        className="flex items-start group cursor-pointer"
                        aria-label={`Contact: ${item.title}`}
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
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-12">
                    <h4 className="text-lg font-semibold text-white mb-6">Suivez notre studio</h4>
                    <div className="flex space-x-4">
                      {[
                        { 
                          icon: Facebook, 
                          color: 'from-blue-500 to-blue-600', 
                          label: 'Facebook Production Vidéo', 
                          sound: 'social',
                          link: 'https://facebook.com/blueoceanproduction'
                        },
                        { 
                          icon: Instagram, 
                          color: 'from-purple-500 to-pink-500', 
                          label: 'Instagram Behind The Scenes', 
                          sound: 'social',
                          link: 'https://instagram.com/blueoceanproduction'
                        },
                        { 
                          icon: Linkedin, 
                          color: 'from-blue-600 to-blue-700', 
                          label: 'LinkedIn Corporate', 
                          sound: 'social',
                          link: 'https://linkedin.com/company/blueoceanproduction'
                        },
                        { 
                          icon: Video, 
                          color: 'from-red-500 to-orange-500', 
                          label: 'YouTube Portfolio', 
                          sound: 'social',
                          link: 'https://youtube.com/blueoceanproduction'
                        }
                      ].map((social, idx) => (
                        <motion.a
                          key={idx}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={playAudioEffect}
                          className={`relative group w-14 h-14 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300`}
                          aria-label={`Suivez-nous sur ${social.label}`}
                        >
                          <social.icon className="w-7 h-7 text-white" />
                          <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {social.label}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl border border-blue-700/30">
                    <h4 className="text-lg font-semibold text-white mb-4">Pourquoi choisir Blue Ocean Production ?</h4>
                    <ul className="space-y-3">
                      {[
                        '✅ Équipement professionnel 4K HDR et drone',
                        '✅ Équipe d\'experts certifiés',
                        '✅ Processus qualité ISO 9001',
                        '✅ Garantie satisfait ou remboursé',
                        '✅ Délais contractuels garantis',
                        '✅ Support technique dédié'
                      ].map((item, idx) => (
                        <li key={idx} className="text-gray-300 text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-10 shadow-2xl">
                  <div className="flex items-center mb-10">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mr-4"
                      animate={isSubmitting ? { rotate: 360 } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Send className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Demande de Devis Gratuit</h3>
                      <p className="text-gray-400">Remplissez le formulaire pour un devis personnalisé de production audiovisuelle</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-8 p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl"
                        role="alert"
                        aria-label="Message envoyé avec succès"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                            <Check className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg">🎬 Demande envoyée avec succès !</div>
                            <div className="text-emerald-200">Nous vous avons envoyé un email de confirmation. Notre équipe vous contactera dans les 24h avec une proposition détaillée.</div>
                            <div className="text-sm text-emerald-300 mt-2">Référence: BOS-{Date.now().toString().slice(-8)}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl"
                        role="alert"
                        aria-label="Erreur lors de l'envoi"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mr-4">
                            <X className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg">⚠️ Erreur d'envoi</div>
                            <div className="text-red-200">Veuillez réessayer ou nous contacter directement par téléphone au +212 600 000 000</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-8" aria-label="Formulaire de demande de devis">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3">
                          Nom complet *
                        </label>
                        <motion.input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="Votre nom et prénom"
                          required
                          whileFocus={{ scale: 1.01 }}
                          aria-required="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-3">
                          Entreprise
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="Nom de votre entreprise au Maroc"
                          aria-label="Nom de l'entreprise"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                          Email professionnel *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="votre@entreprise.ma"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-3">
                          Téléphone WhatsApp *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                          placeholder="+212 XX XX XX XX"
                          required
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-3">
                        Type de projet audiovisuel *
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none"
                        required
                        aria-required="true"
                      >
                        <option value="" className="bg-gray-800">Sélectionnez votre projet vidéo/photo</option>
                        <option value="corporate" className="bg-gray-800">Vidéo Corporate / Institutionnelle</option>
                        <option value="publicite" className="bg-gray-800">Publicité TV / Spot publicitaire</option>
                        <option value="evenement" className="bg-gray-800">Couverture Événementielle / Live</option>
                        <option value="formation" className="bg-gray-800">Vidéo Formation / Tutorielle</option>
                        <option value="animation" className="bg-gray-800">Motion Design / Animation 2D-3D</option>
                        <option value="photo" className="bg-gray-800">Shooting Photo Professionnel</option>
                        <option value="autre" className="bg-gray-800">Autre projet audiovisuel</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3">
                        Détails de votre projet *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                        placeholder="Décrivez votre projet audiovisuel, objectifs, délais souhaités, budget approximatif..."
                        required
                        aria-required="true"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-2xl transition-all duration-500 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                      whileHover={!(isSubmitting || isLoading) ? { scale: 1.02 } : {}}
                      whileTap={!(isSubmitting || isLoading) ? { scale: 0.98 } : {}}
                      animate={isLoading ? { scale: [1, 1.02, 1] } : {}}
                      aria-label={isLoading ? "Envoi en cours..." : "Envoyer la demande de devis"}
                    >
                      <span className="relative flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            Obtenir mon devis gratuit
                            <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    </motion.button>

                    <div className="text-center text-gray-400 text-sm">
                      <p>
                        En soumettant ce formulaire, vous acceptez notre 
                        <a href="#" className="text-cyan-400 hover:text-cyan-300 ml-1">politique de confidentialité</a>.
                        Aucun spam, uniquement des réponses professionnelles.
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        ⚡ Réponse garantie sous 24h ouvrées • 📞 Support téléphonique disponible
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-white pt-20 pb-12" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex flex-col items-start space-y-4 mb-8">
                <div className="relative w-80 h-20">
                  <Image 
                    src="/logo-blue-ocean.png" 
                    alt="Blue Ocean Production - Studio Audiovisuel Professionnel Maroc"
                    width={320}
                    height={80}
                    className="object-contain w-full h-full invert brightness-200"
                    priority
                  />
                </div>
              </div>
              
              <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                Agence de production audiovisuelle professionnelle basée à Kénitra, Maroc. 
                Spécialisée en production vidéo corporate, shooting photo professionnel, motion design créatif et post-production avancée 
                pour les entreprises marocaines. Équipement 4K HDR, drone aérien et équipe d'experts certifiés.
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
                    aria-label="Suivez-nous sur les réseaux sociaux"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Services Audiovisuels',
                items: [
                  'Production Vidéo Corporate',
                  'Shooting Photo Professionnel',
                  'Motion Design & Animation',
                  'Post-Production Avancée',
                  'Stratégie Digital Vidéo'
                ]
              },
              {
                title: 'Studio Blue Ocean',
                items: [
                  'À propos de notre agence',
                  'Notre équipe d\'experts',
                  'Portfolio réalisations',
                  'Carrières & Recrutement',
                  'Espace Presse & Médias'
                ]
              },
              {
                title: 'Contact & Devis',
                items: [
                  'Demande de devis gratuit',
                  'Support technique vidéo',
                  'Consultation gratuite',
                  'Visite du studio Kénitra',
                  'FAQ Production Audiovisuelle'
                ]
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold mb-8">{column.title}</h4>
                <ul className="space-y-4" aria-label={`Liens ${column.title}`}>
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center group"
                        whileHover={{ x: 5 }}
                        onClick={playAudioEffect}
                        aria-label={item}
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
                &copy; {new Date().getFullYear()} Blue Ocean Production - Studio Audiovisuel Kénitra, Maroc. 
                <span className="block md:inline md:ml-2 mt-2 md:mt-0">Tous droits réservés.</span>
              </div>
              
              <div className="flex items-center space-x-8">
                {[
                  'Politique de confidentialité',
                  'Conditions d\'utilisation',
                  'Mentions légales',
                  'CGV Production Audiovisuelle'
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={playAudioEffect}
                    aria-label={item}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="mt-6 text-center text-gray-500 text-sm">
              <p>
                Blue Ocean Production - Siret: XXXXXXXX - 
                <span className="ml-2">Studio situé à Kénitra, région Rabat-Salé-Kénitra, Maroc</span>
              </p>
              <p className="mt-2">
                Intervention nationale : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir et toutes les régions du Maroc
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
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
        aria-label="Contacter par WhatsApp pour devis production vidéo"
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
            aria-label="Nouveaux messages"
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
            aria-label="Retour en haut de la page"
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

      {/* Audio Effects Toggle Button */}
      <motion.button
        onClick={() => setIsAudioPlaying(!isAudioPlaying)}
        className="fixed bottom-8 left-24 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isAudioPlaying ? "Désactiver les effets sonores" : "Activer les effets sonores"}
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

      <style jsx global>{`
        .theme-transition * {
          transition-duration: 0.2s !important;
        }
        
        /* Smooth transitions for all theme changes */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
      `}</style>
    </div>
  );
}