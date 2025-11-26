import React, { useState, useCallback } from 'react';
import BootSequence from './components/BootSequence';
import Navigation from './components/Navigation';
import Background from './components/Background';
import Welcome from './sections/Welcome';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import RobotWidget from './components/RobotWidget';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  const handleBootComplete = useCallback(() => {
    console.log("Boot complete, setting loading to false");
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!loading && (
        <Background>
          <Navigation />
          <main style={{ paddingTop: '80px', color: 'white', position: 'relative' }}>
            
            {/* Core Sections */}
            <Welcome />
            <Hero />

            {/* 3D Robot placed beside DNA / Hero zone */}
            <RobotWidget />

            <Skills />
            <Projects />
            <Contact />

          </main>
        </Background>
      )}
    </>
  );
}

export default App;
