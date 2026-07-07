import { certificates } from '../../constants';
import ThreeDSlider from '../reactbits/ThreeDSlider';

export default function Certificates() {
  return (
    <section className="section" id="certificates">
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <span className="section-subtitle">Achievements</span>
        <h2 className="heading-lg">Certificates & Awards</h2>
      </div>

      <div className="hero-scroll-indicator" style={{ position: 'relative', margin: '0 auto 2rem auto', bottom: 'auto', left: 'auto', transform: 'none', pointerEvents: 'none' }}>
        <span style={{ fontSize: '0.65rem' }}>Scroll</span>
        <div className="scroll-dot-container">
          <div className="scroll-dot" />
        </div>
      </div>

      <div style={{ 
        width: '100vw', 
        position: 'relative', 
        left: '50%', 
        right: '50%', 
        marginLeft: '-50vw', 
        marginRight: '-50vw'
      }}>
        <ThreeDSlider 
          items={certificates}
          speedWheel={0.03}
          speedDrag={-0.10}
        />
      </div>
    </section>
  );
}
