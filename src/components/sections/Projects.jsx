import { motion } from 'framer-motion';
import { projects } from '../../constants';
import ElectricBorder from '../reactbits/ElectricBorder';
import { GridScan } from '../reactbits/GridScan';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const IconGithub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
);

const IconExternalLink = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
);

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      {/* ReactBits GridScan — fills the entire section as background */}
      <div className="projects-gridscan-bg">
        <GridScan
          enableWebcam={false}
          showPreview={false}
          linesColor="#5227FF"
          scanColor="#5227FF"
          scanOpacity={0.35}
          gridScale={0.08}
          lineThickness={1}
          lineStyle="solid"
          lineJitter={0.08}
          scanDirection="down"
          scanDuration={3.0}
          scanDelay={2.0}
          scanGlow={0.8}
          scanSoftness={3}
          enablePost={false}
          bloomIntensity={0.4}
          bloomThreshold={0.1}
          bloomSmoothing={0.5}
          chromaticAberration={0.001}
          noiseIntensity={0.005}
        />
      </div>

      {/* Content sits above the GridScan background */}
      <div className="section projects-inner">
        <div className="section-header">
          <span className="section-subtitle">My Work</span>
          <h2 className="heading-lg">Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={index}
            >
              <ElectricBorder
                color="#5227FF"
                speed={0.6}
                chaos={0.1}
                borderRadius={24}
              >
                <div className="project-card-inner">
                  <div className="project-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 className="project-name">{project.name}</h3>
                      <a 
                        href={project.live_link !== "#" ? project.live_link : undefined}
                        target={project.live_link !== "#" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        style={{ cursor: project.live_link !== "#" ? "pointer" : "default", display: 'block', position: 'relative', zIndex: 20, padding: '4px' }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={project.live_link !== "#" ? "rgba(82, 39, 255, 0.8)" : "rgba(82, 39, 255, 0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    </div>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="project-tag"
                          style={{
                            color: tag.color,
                            borderColor: `${tag.color}50`,
                            background: `${tag.color}10`,
                          }}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
