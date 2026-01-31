import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningPage from './components/Openingpage';

function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  
  // LOGIC MUSIK (Playlist 5 Lagu m4a)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const playlist = [
    { title: "LOBER RADIANCE", src: "/track1.m4a" },
    { title: "HYPER CLAW MODE", src: "/track2.m4a" },
    { title: "CAFFEINE SURGE", src: "/track3.m4a" },
    { title: "DEEP SEA RADIO", src: "/track4.m4a" },
    { title: "WILLPOWER RED", src: "/track5.m4a" }
  ];

  const caAddress = "0x1234567890abcdef1234567890abcdef12345678"; 
  const images = ['m1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg', 'm5.jpg', 'm6.jpg', 'm7.jpg', 'm8.jpg'];

  // Handle Mouse Events (Cursor Lobster)
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Sync Audio Fix (Load & Play)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  // Handle Scroll Lock
  useEffect(() => {
    const overflowStyle = showOpening ? 'hidden' : 'auto';
    document.body.style.overflow = overflowStyle;
    document.documentElement.style.overflow = overflowStyle;
  }, [showOpening]);

  const togglePlay = () => {
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#001d3d', minHeight: '100vh', width: '100%', color: 'white', cursor: 'none' }}>
      <audio ref={audioRef} src={playlist[currentTrack].src} onEnded={nextTrack} preload="auto" />

      {/* CUSTOM CURSOR 🦞 */}
      {!showOpening && (
        <motion.div
          style={{
            position: 'fixed', left: 0, top: 0, zIndex: 10000,
            pointerEvents: 'none', fontSize: '32px',
            filter: 'drop-shadow(0 0 8px rgba(255,0,0,0.6))',
            x: mousePos.x - 16, y: mousePos.y - 16,
          }}
          animate={{ scale: isClicked ? 0.7 : 1 }}
        >
          🦞
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {showOpening ? (
          <OpeningPage key="opening" onComplete={() => setShowOpening(false)} />
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            
            {/* RADIO PLAYER */}
            <motion.div drag dragConstraints={{ left: -300, right: 0, top: 0, bottom: 500 }} style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, backgroundColor: 'rgba(0, 8, 20, 0.95)', padding: '20px', borderRadius: '20px', border: '2px solid #ff0000', minWidth: '260px', cursor: 'grab' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#fbff00', letterSpacing: '2px' }}>RADIO LOBER</p>
              <p style={{ margin: '5px 0 15px 0', fontSize: '13px' }}>{playlist[currentTrack].title}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <button onClick={prevTrack} style={{ background: 'none', border: 'none', color: 'white', cursor: 'none', fontSize: '20px' }}>⏮</button>
                <button onClick={togglePlay} style={{ backgroundColor: '#ff0000', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'none' }}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={nextTrack} style={{ background: 'none', border: 'none', color: 'white', cursor: 'none', fontSize: '20px' }}>⏭</button>
              </div>
            </motion.div>

            {/* HERO SECTION */}
            <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
              <h1 style={{ fontSize: 'clamp(60px, 15vw, 150px)', fontStyle: 'italic', textShadow: '5px 5px 0 #ff0000', color: 'white', margin: 0, lineHeight: '0.8' }}>LOBER</h1>
              <p style={{ color: '#fbff00', letterSpacing: '8px', marginTop: '20px' }}>THE LOBSTER IS ARRIVING</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: '50px' }}>
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }} 
                  onClick={handleCopy} 
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '0 20px', borderRadius: '12px', height: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '280px', cursor: 'none' }}
                >
                  <p style={{ color: '#fbff00', fontSize: '9px', margin: '0' }}>CONTRACT ADDRESS</p>
                  <p style={{ color: 'white', fontSize: '11px', fontFamily: 'monospace', margin: 0 }}>{copied ? "COPIED!" : caAddress}</p>
                </motion.div>
                <motion.a 
                  whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(255,255,255,0.6)' }} 
                  href="https://x.com" target="_blank" 
                  style={{ backgroundColor: 'white', color: 'black', height: '60px', width: '220px', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', cursor: 'none' }}
                >
                  X COMMUNITY
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(0,251,255,0.6)' }} 
                  href="https://dexscreener.com" target="_blank" 
                  style={{ backgroundColor: '#00fbff', color: 'black', height: '60px', width: '220px', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', cursor: 'none' }}
                >
                  DEXSCREENER
                </motion.a>
              </div>
            </section>

            {/* LORE SECTION */}
            <section style={{ padding: '120px 20px', backgroundColor: '#001226', textAlign: 'center', borderTop: '4px solid #ff0000', borderBottom: '4px solid #ff0000' }}>
              <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                <h2 style={{ color: '#ff0000', fontSize: '40px', fontStyle: 'italic', marginBottom: '30px' }}>THE ORIGIN</h2>
                <p style={{ color: 'white', fontSize: '20px', lineHeight: '1.8', fontStyle: 'italic', letterSpacing: '1px' }}>
                  "Lober wasn’t born red, he turned red through sheer, concentrated willpower. 
                  Legend says he stumbled upon a sunken shipment of caffeinated energy drinks and ancient radio parts. 
                  After consuming both, his nervous system achieved a state of <span style={{ color: '#fbff00' }}>'Hyper-Claw Awareness.'</span>"
                </p>
              </div>
            </section>

            {/* GALLERY SECTION (Background Cerah Cyan) */}
            <section style={{ padding: '100px 20px', backgroundColor: '#00fbff', minHeight: '100vh' }}>
              <h2 style={{ color: '#001d3d', textAlign: 'center', fontSize: '45px', marginBottom: '60px', fontStyle: 'italic' }}>
                <span style={{ color: '#ff0000' }}>LOBER</span> GALLERY
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '35px', maxWidth: '1300px', margin: '0 auto' }}>
                {images.map((img, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.05, rotate: 1 }} style={{ borderRadius: '15px', overflow: 'hidden', border: '6px solid #001d3d', height: '420px', backgroundColor: 'white', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
                    <img src={`/${img}`} alt="Lober Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                ))}
              </div>
            </section>

            <footer style={{ color: 'white', padding: '100px', textAlign: 'center', backgroundColor: '#001d3d', letterSpacing: '2px' }}>
              © 2026 LOBER PROJECT - CONCENTRATED WILLPOWER
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;