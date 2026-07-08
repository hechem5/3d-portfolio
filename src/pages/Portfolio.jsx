import { useEffect } from 'react';
import Lenis from 'lenis';
import useStore from '../store';
import Loader from '../components/Loader';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Certificates from '../components/sections/Certificates';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';
import Dock from '../components/reactbits/Dock';
import SplashCursor from '../components/reactbits/SplashCursor';
import CursorDot from '../components/CursorDot';
import GradualBlur from '../components/reactbits/GradualBlur';

// Dock nav icons as inline SVGs
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const IconBriefcase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const IconLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const IconAward = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);

const DOCK_ITEMS = [
  { icon: <IconHome />, label: 'Home', id: 'hero' },
  { icon: <IconUser />, label: 'About', id: 'about' },
  { icon: <IconCode />, label: 'Skills', id: 'skills' },
  { icon: <IconBriefcase />, label: 'Experience', id: 'experience' },
  { icon: <IconLayers />, label: 'Projects', id: 'projects' },
  { icon: <IconAward />, label: 'Certificates', id: 'certificates' },
  { icon: <IconMail />, label: 'Contact', id: 'contact' },
];

export const SECTION_ORDER = ['hero', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];

function App() {
  const { setActiveSection } = useStore();

  useEffect(() => {
    // Force browser to start at the top on every reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    window.lenis = lenis; // Expose globally for scrollTo

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Full Page Snapping logic via Wheel
    const sections = SECTION_ORDER;
    let isScrolling = false;
    let currentIdx = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      let nextIdx = currentIdx + dir;
      
      if (nextIdx < 0) nextIdx = 0;
      if (nextIdx >= sections.length) nextIdx = sections.length - 1;

      if (nextIdx !== currentIdx) {
        currentIdx = nextIdx;
        isScrolling = true;
        const target = document.getElementById(sections[currentIdx]);
        if (target) {
          lenis.scrollTo(target, { 
            duration: 1.2,
            onComplete: () => {
              setTimeout(() => isScrolling = false, 50); // slight debounce
            }
          });
        } else {
          isScrolling = false;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    const handleScroll = () => {
      let current = '';
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            currentIdx = i;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };
    
    lenis.on('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      lenis.destroy();
      delete window.lenis;
    };
  }, [setActiveSection]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Splash cursor — beautiful fluid sim */}
      <SplashCursor 
        COLOR="#915EFF" 
        RAINBOW_MODE={false}
        SPLAT_RADIUS={0.3}
        DENSITY_DISSIPATION={2}
      />
      <CursorDot />
      <Loader />
      
      {/* Top and Bottom scrolling blur overlays */}
      <GradualBlur position="top" height="100px" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none' }} />
      <GradualBlur position="bottom" height="150px" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none' }} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      {/* Dock navigation */}
      <div className="dock-wrapper">
        <Dock
          items={DOCK_ITEMS.map((item) => ({
            icon: item.icon,
            label: item.label,
            onClick: () => scrollTo(item.id),
          }))}
          magnification={60}
          distance={120}
          panelHeight={56}
          baseItemSize={40}
          spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
        />
      </div>
    </>
  );
}

export default App;
