import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store';
import Orb from './reactbits/Orb';
import CircularText from './reactbits/CircularText';

export default function Loader() {
  const { isLoaded, setIsLoaded } = useStore();

  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000; // 4 seconds
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
        }, 500); 
      }
    }, 50);

    return () => clearInterval(interval);
  }, [setIsLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#120F17', 
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* ReactBits Orb Component Background */}
          <motion.div 
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Orb hue={0} hoverIntensity={0.10} rotateOnHover={false} />
          </motion.div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-heading, sans-serif)',
                fontWeight: 800,
                textShadow: '0 0 10px rgba(255,255,255,0.3)',
              }}
            >
              <CircularText 
                text="K L A I - H E C H E M - " 
                spinDuration={7} 
                radius={60}
              />
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
