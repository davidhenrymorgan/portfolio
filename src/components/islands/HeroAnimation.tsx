import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { GithubIcon, LinkedinIcon, Mail, FileText } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

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

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={itemVariants} className="mb-8">
          <Avatar className="h-32 w-32 mx-auto border-4 border-primary/20">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="text-2xl font-bold">{initials}</AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          Hi, I'm {name}
        </motion.h1>

        <motion.div 
          variants={itemVariants}
          className="h-12 md:h-16 mb-8 flex items-center justify-center"
        >
          <motion.p 
            key={currentRoleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-semibold text-muted-foreground"
          >
            {roles[currentRoleIndex]}
          </motion.p>
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
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
              {tech}
            </Badge>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <Button size="lg" className="gap-2">
            <FileText className="h-4 w-4" />
            View Projects
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Mail className="h-4 w-4" />
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
            className="hover:text-primary"
          >
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:text-primary"
          >
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:text-primary"
          >
            <a href={socialLinks.email}>
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}