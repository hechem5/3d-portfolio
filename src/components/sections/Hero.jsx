import { useState, useEffect, useCallback } from 'react';
import { heroData } from '../../constants';
import RippleGrid from '../reactbits/RippleGrid';
import FuzzyText from '../reactbits/FuzzyText';
import VariableProximity from '../reactbits/VariableProximity';
import { SECTION_ORDER } from '../../pages/Portfolio';

function scrollToNextSection() {
  const scrollY = window.scrollY + window.innerHeight / 2;
  for (let i = 0; i < SECTION_ORDER.length - 1; i++) {
    const el = document.getElementById(SECTION_ORDER[i]);
    if (el) {
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + window.scrollY;
      const elBottom = elTop + rect.height;
      if (scrollY >= elTop && scrollY < elBottom) {
        const next = document.getElementById(SECTION_ORDER[i + 1]);
        if (next) {
          if (window.lenis) {
            window.lenis.scrollTo(next, { duration: 1.2 });
          } else {
            next.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        return;
      }
    }
  }
  const about = document.getElementById('about');
  if (about) {
    if (window.lenis) {
      window.lenis.scrollTo(about, { duration: 1.2 });
    } else {
      about.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const typeWriter = useCallback(() => {
    const currentRole = heroData.roles[roleIndex];
    if (!isDeleting) {
      setDisplayText(currentRole.substring(0, displayText.length + 1));
      if (displayText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      setDisplayText(currentRole.substring(0, displayText.length - 1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % heroData.roles.length);
        return;
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const timer = setTimeout(typeWriter, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [typeWriter, isDeleting]);

  return (
    <section className="hero" id="hero">
      {/* RippleGrid — pure WebGL, mouse-reactive, zero flicker */}
      <div
        className="hero-canvas"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease'
        }}
      >
        {mounted && (
          <RippleGrid
            gridColor="#915EFF"
            rippleIntensity={0.12}
            gridSize={24}
            gridThickness={20}
            glowIntensity={0.25}
            vignetteStrength={2.5}
            mouseInteraction={true}
            mouseInteractionRadius={1.2}
            animationSpeed={0.3}
            opacity={1}
          />
        )}
      </div>

      {/* Deep vignette so text stays readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 75% 70% at 50% 50%, rgba(5,8,22,0.30) 0%, rgba(5,8,22,0.70) 65%, rgba(5,8,22,0.96) 100%)'
      }} />

      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>

        {/* FuzzyText for name — canvas auto-sizes, no layout shift */}
        <div className="hero-fuzzy-name">
          <FuzzyText
            baseIntensity={0.15}
            hoverIntensity={0.5}
            enableHover={true}
            color="#ffffff"
            fontSize="clamp(3rem, 8vw, 5.5rem)"
            fontWeight={700}
            fontFamily="Space Grotesk, sans-serif"
          >
            {heroData.name}
          </FuzzyText>
        </div>

        <div className="hero-title-wrapper">
          <span className="hero-title-static">I'm a</span>
          <span className="hero-title-dynamic">
            {displayText}
            <span className="hero-title-cursor" />
          </span>
        </div>
        <div className="hero-tagline">
          <VariableProximity
            label={heroData.tagline}
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 300, 'opsz' 9"
            toFontVariationSettings="'wght' 900, 'opsz' 40"
            containerRef={null}
            radius={100}
            falloff="linear"
          />
        </div>
        <div className="hero-cta">
          <button className="btn-primary" onClick={scrollToNextSection}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            Explore My Work
          </button>
          <a href="#contact" className="btn-outline" onClick={(e) => { 
            e.preventDefault(); 
            const el = document.getElementById('contact');
            if (el) {
              if (window.lenis) window.lenis.scrollTo(el, { duration: 1.2 });
              else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll arrow — always scrolls to the next section */}
      <div className="hero-scroll-indicator" onClick={scrollToNextSection} style={{ cursor: 'pointer' }}>
        <span>Scroll</span>
        <div className="scroll-dot-container">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  );
}
