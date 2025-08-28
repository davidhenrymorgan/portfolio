import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Github, Linkedin, Mail, FileText, ChevronDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

interface HeroAnimationProps {
  name?: string;
  roles?: string[];
  avatarUrl?: string;
  initials?: string;
}

export default function HeroAnimation({ 
  name = "Your Name", // TODO: Replace with your actual name
  roles = ["Full-Stack Developer", "Web Designer", "Software Engineer", "Marketing Specialist"], // TODO: Replace with your roles
  avatarUrl = "/profile.jpg", // TODO: Replace with your profile image
  initials = "YN" // TODO: Replace with your initials
}: HeroAnimationProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const typingSpeed = useRef(100);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
          typingSpeed.current = 100 + Math.random() * 50; // Variable typing speed
        } else {
          // Pause at the end before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
          typingSpeed.current = 50;
        } else {
          // Move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed.current);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  // TODO: Replace these with your actual tech stack
  const techStack = ["React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", "PostgreSQL"];
  
  // TODO: Update these links with your actual social profiles
  const socialLinks = {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:your.email@example.com"
  };

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ParticleBackground />
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 py-20 relative"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            variants={itemVariants} 
            className="mb-8 relative inline-block group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl scale-110 group-hover:scale-125 transition-transform duration-500" />
            <Avatar className="h-32 w-32 mx-auto border-4 border-primary/20 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 animate-glow-pulse">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="text-2xl font-bold">{initials}</AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent"
          >
            Hi, I'm {name}
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="h-12 md:h-16 mb-8 flex items-center justify-center"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-4xl font-semibold text-muted-foreground">
                {currentText}
              </span>
              <span className="inline-block w-1 h-8 md:h-12 bg-primary animate-typing-cursor" />
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {/* TODO: Replace with your actual bio/description */}
            Passionate about creating beautiful, functional web experiences and solving complex problems with elegant solutions.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            <Button 
              size="lg" 
              className="gap-2 group"
              onClick={scrollToProjects}
            >
              <FileText className="h-4 w-4 group-hover:rotate-3 transition-transform" />
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 group"
              onClick={scrollToContact}
            >
              <Mail className="h-4 w-4 group-hover:rotate-3 transition-transform" />
              Contact Me
            </Button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary hover:scale-110 transition-all duration-300"
            >
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary hover:scale-110 transition-all duration-300"
            >
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-primary hover:scale-110 transition-all duration-300"
            >
              <a href={socialLinks.email}>
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.button
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToNext}
              aria-label="Scroll to next section"
            >
              <ChevronDown className="h-8 w-8 animate-bounce-down" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}