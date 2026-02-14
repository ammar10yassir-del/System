import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Fireworks } from './components/fireworks';
import videoSrc from './WhatsApp Video 2026-02-14 at 8.31.22 PM.mp4?url';

export default function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showFireworks, setShowFireworks] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleYesClick = () => {
    setYesClicked(true);
    setShowFireworks(true);
  };

  useEffect(() => {
    if (yesClicked && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [yesClicked]);

  const handleNoHover = () => {
    // Move the No button to a random position relative to its starting position
    // Calculate random offset (between 100-300px in any direction)
    const offsetX = (Math.random() - 0.5) * 400; // -200 to +200
    const offsetY = (Math.random() - 0.5) * 400; // -200 to +200
    
    setNoButtonPosition({ x: offsetX, y: offsetY });
    
    // Make Yes button bigger each time
    setYesButtonSize(prev => prev + 0.2);
  };

  if (yesClicked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center relative overflow-hidden">
        {showFireworks && <Fireworks />}
        
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-9xl mb-8"
          >
            💕
          </motion.div>

          <video 
            ref={videoRef}
            src={videoSrc} 
            autoPlay
            muted
            playsInline
            loop
            controls 
            className="mx-auto mb-8 rounded-lg shadow-md w-80 md:w-96 aspect-video"
          />

          <p className="text-3xl md:text-4xl text-gray-800 mb-8 px-4">
            I knew you'd say yes! ❤️
          </p>
          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex gap-4 justify-center text-6xl"
          >
            <Heart className="w-16 h-16 text-red-500 fill-red-500" />
            <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
            <Heart className="w-16 h-16 text-red-500 fill-red-500" />
          </motion.div>
          
          <p className="text-2xl text-gray-700 mt-8">
            Can't wait to celebrate Valentine's Day with you! 💝
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center max-w-2xl">
        {/* Cute Bear */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8"
        >
          <div className="text-9xl mb-4">
            🧸
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl"
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Question */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 px-4"
        >
        will you be my Valentine? 💝
        </motion.h1>

        {/* Buttons */}
        <div className="flex gap-6 justify-center items-center relative min-h-[120px]">
          {/* Yes Button - gets bigger */}
          <motion.button
            onClick={handleYesClick}
            animate={{ scale: yesButtonSize }}
            whileHover={{ scale: yesButtonSize}}
            whileTap={{ scale: yesButtonSize }}
            className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          >
            Yes 💕
          </motion.button>

          {/* No Button - moves away */}
          <motion.button
            ref={noButtonRef}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            animate={{
              x: noButtonPosition.x,
              y: noButtonPosition.y,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20}}
            className="bg-gray-300 text-gray-700 px-8 py-4 rounded-full text-xl font-bold shadow-lg relative"
          >
            No 😢
          </motion.button>
        </div>

        {/* Floating Hearts */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                opacity: 0.7
              }}
              animate={{
                y: -100,
                opacity: 0,
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.8,
              }}
              className="absolute text-4xl"
            >
              {i % 3 === 0 ? '💗' : i % 3 === 1 ? '💕' : '💖'}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}