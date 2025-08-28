import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'triangle' | 'square';
}

export default function ParticleBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random particles - reduced count for cleaner look
  const particles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    // Remove triangles for cleaner aesthetic
    shape: ['circle', 'square'][Math.floor(Math.random() * 2)] as Particle['shape'],
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const renderShape = (shape: Particle['shape'], size: number) => {
    switch (shape) {
      case 'circle':
        return (
          <div 
            className="rounded-full bg-gradient-to-br from-primary/10 to-primary/5"
            style={{ width: size, height: size }}
          />
        );
      case 'triangle':
        // Using SVG for better rendering
        return (
          <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100"
            className="opacity-10"
          >
            <polygon 
              points="50,10 90,90 10,90" 
              fill="hsl(var(--primary) / 0.5)"
            />
          </svg>
        );
      case 'square':
        return (
          <div 
            className="rotate-45 bg-gradient-to-br from-primary/8 to-primary/3"
            style={{ width: size, height: size }}
          />
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* Animated gradient background - Fixed with proper overflow handling */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -inset-[10%] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-gradient-shift" />
        <div className="absolute -inset-[10%] bg-gradient-to-tl from-accent/10 via-transparent to-primary/10 animate-gradient-shift-reverse" />
        {/* Mesh gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.10),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => {
        const x = useTransform(
          mouseX,
          [0, 1],
          [particle.x - 5, particle.x + 5]
        );
        const y = useTransform(
          mouseY,
          [0, 1],
          [particle.y - 5, particle.y + 5]
        );

        return (
          <motion.div
            key={particle.id}
            className="absolute blur-md mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0.3, 0],
              scale: [0.8, 1.05, 1, 0.95],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              x: useTransform(x, (val) => `${val}%`),
              y: useTransform(y, (val) => `${val}%`),
            }}
          >
            <motion.div
              animate={{
                rotate: particle.shape === 'square' ? [0, 360] : 0,
                y: [-20, 20, -20],
              }}
              transition={{
                duration: particle.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {renderShape(particle.shape, particle.size)}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}