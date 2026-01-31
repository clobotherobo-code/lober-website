import { motion } from 'framer-motion';
import { useState } from 'react';

const OpeningPage = ({ onComplete }) => {
  const [isZooming, setIsZooming] = useState(false);

  return (
    <div 
      onClick={() => !isZooming && setIsZooming(true)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#001d3d', // Biru tua request lu
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: "'Archivo Black', sans-serif"
      }}
    >
      <motion.div 
        animate={isZooming ? { scale: 80, opacity: 0, filter: "blur(10px)" } : { scale: 1 }}
        transition={{ duration: 1.2, ease: "easeIn" }}
        onAnimationComplete={() => isZooming && onComplete()}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* LOBER */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: 'white',
            fontSize: 'min(110px, 15vw)',
            fontWeight: '900',
            fontStyle: 'italic',
            lineHeight: '0.8',
            margin: 0,
            textTransform: 'uppercase',
            textShadow: '2px 2px 0 #ff0000, 4px 4px 0 #ff0000, 6px 6px 0 #ff0000'
          }}
        >
          LOBER
        </motion.h1>

        {/* the LOBSTER */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '12px',
            color: '#fbff00',
            fontStyle: 'italic',
            fontSize: 'min(24px, 4vw)',
            gap: '8px'
          }}
        >
          <span style={{ textTransform: 'lowercase' }}>the</span>
          <h2 style={{ margin: 0, textTransform: 'uppercase' }}>LOBSTER</h2>
        </motion.div>
      </motion.div>

      <motion.p 
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '40px', color: 'white', fontSize: '10px', letterSpacing: '5px' }}
      >
        CLICK TO ENTER
      </motion.p>
    </div>
  );
};

export default OpeningPage;