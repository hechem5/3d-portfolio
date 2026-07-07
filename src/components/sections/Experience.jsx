import { Timeline } from '../ui/Timeline';
import { experiences } from '../../constants';

const IconBriefcase = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);

export default function Experience() {
  const timelineData = experiences.map((exp, index) => ({
    title: exp.date,
    content: (
      <div className="timeline-item-modern" style={{
        '--hover-color': exp.color,
        background: 'rgba(21, 16, 48, 0.4)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '24px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        <style>{`
          .timeline-item-modern:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px -10px var(--hover-color);
            border-color: var(--hover-color) !important;
          }
        `}</style>
        {/* Soft background glow based on the company color */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${exp.color}30 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 className="timeline-role" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>{exp.title}</h3>
              <p className="timeline-company" style={{ color: exp.color, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
                <IconBriefcase /> {exp.company}
              </p>
            </div>
          </div>
          <ul className="timeline-points" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {exp.points.map((point, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '0.75rem', lineHeight: 1.6 }}>
                <span style={{ color: exp.color, marginTop: '2px' }}>▹</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }));

  return (
    <section className="section" id="experience" style={{ padding: '0', paddingTop: '6rem' }}>
      <div className="section-header" style={{ paddingLeft: '2rem', paddingRight: '2rem', marginBottom: '0' }}>
        <span className="section-subtitle">My Journey</span>
        <h2 className="heading-lg">Work Experience</h2>
      </div>

      <div style={{ width: '100%', marginTop: '-2rem' }}>
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
