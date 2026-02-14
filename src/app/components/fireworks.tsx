import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
}

export function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#FF1461', '#FF6B9D', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#FF69B4'];
    let fireworkId = 0;
    let particleId = 0;

    const createFirework = () => {
      const newFirework: Firework = {
        id: fireworkId++,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setFireworks(prev => [...prev, newFirework]);

      // Create particles for explosion
      setTimeout(() => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 30; i++) {
          newParticles.push({
            id: particleId++,
            x: newFirework.x,
            y: newFirework.y,
            color: newFirework.color,
            angle: (Math.PI * 2 * i) / 30,
            velocity: 2 + Math.random() * 2,
          });
        }
        setParticles(prev => [...prev, ...newParticles]);
      }, 100);

      // Remove firework after animation
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 1000);
    };

    const interval = setInterval(createFirework, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-200)); // Keep only recent particles
    }, 2000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Firework launches */}
      {fireworks.map((firework) => (
        <motion.div
          key={firework.id}
          initial={{ 
            left: `${firework.x}%`,
            top: '100%',
            opacity: 1,
          }}
          animate={{ 
            top: `${firework.y}%`,
            opacity: 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: firework.color }}
        />
      ))}

      {/* Particles explosion */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            left: `calc(${particle.x}% + ${Math.cos(particle.angle) * particle.velocity * 50}px)`,
            top: `calc(${particle.y}% + ${Math.sin(particle.angle) * particle.velocity * 50}px)`,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: particle.color }}
        />
      ))}

      {/* Heart particles */}
      {particles.filter((_, i) => i % 5 === 0).map((particle) => (
        <motion.div
          key={`heart-${particle.id}`}
          initial={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 1,
          }}
          animate={{
            left: `calc(${particle.x}% + ${Math.cos(particle.angle) * particle.velocity * 40}px)`,
            top: `calc(${particle.y}% + ${Math.sin(particle.angle) * particle.velocity * 40}px)`,
            opacity: 0,
            scale: [1, 1.5, 0],
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
