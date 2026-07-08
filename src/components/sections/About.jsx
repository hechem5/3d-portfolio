import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { aboutData } from '../../constants';
import ProfileCard from '../reactbits/ProfileCard';
import profileImg from '../../assets/profile.png';
import { supabase } from '../../lib/supabase';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CVDocument } from '../cv/CVDocument';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconRocket = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);

export default function About() {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    async function fetchCV() {
      const { data } = await supabase.from('cv_data').select('content').eq('id', 1).single();
      if (data) setCvData(data.content);
    }
    fetchCV();
  }, []);

  return (
    <section className="section" id="about">
      <div className="section-header">
        <span className="section-subtitle">Introduction</span>
        <h2 className="heading-lg">About Me</h2>
      </div>

      <div className="about-layout">
        {/* Left — big profile card */}
        <motion.div
          className="about-profile-col"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
        >
          <ProfileCard
            avatarUrl={profileImg}
            miniAvatarUrl={profileImg}
            name="Hechem Klai"
            title="Software Engineer"
            handle="@hechem-klai"
            status="Available for Work"
            contactText="LinkedIn"
            onContactClick={() => window.open('https://www.linkedin.com/in/hechem-klai/', '_blank')}
            innerGradient="linear-gradient(145deg, rgba(145,94,255,0.25) 0%, rgba(0,212,255,0.12) 100%)"
            behindGlowColor="#7b3fff"
            behindGlowSize="35%"
            enableTilt={true}
          />
        </motion.div>

        {/* Right — bio + stats grid */}
        <div className="about-info-col">
          {/* Bio card */}
          <motion.div
            className="glass-card about-bio-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
          >
            <p style={{ color: 'var(--secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
              {aboutData.bio}
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#00ff88', display: 'inline-block',
                boxShadow: '0 0 8px #00ff88'
              }} />
              <span style={{ color: '#00ff88', fontSize: '0.875rem' }}>{aboutData.availability}</span>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="about-stats-grid">
            {aboutData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card about-stat-card"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index + 2}
              >
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </motion.div>
            ))}

            {/* Download CV Button */}
            {cvData ? (
              <PDFDownloadLink 
                document={<CVDocument data={cvData} />} 
                fileName="Hechem_Klai_CV.pdf"
                style={{ textDecoration: 'none', gridColumn: 'span 2' }}
              >
                {({ loading }) => (
                  <motion.div
                    className="glass-card about-stat-card"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={aboutData.stats.length + 2}
                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(145, 94, 255, 0.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  >
                    <div className="about-stat-value">CV</div>
                    <div className="about-stat-label">{loading ? 'Generating PDF...' : 'Download Resume'}</div>
                  </motion.div>
                )}
              </PDFDownloadLink>
            ) : (
              <motion.div
                className="glass-card about-stat-card"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={aboutData.stats.length + 2}
                style={{ cursor: 'wait', transition: 'all 0.3s ease', gridColumn: 'span 2' }}
              >
                <div className="about-stat-value">CV</div>
                <div className="about-stat-label">Loading Data...</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
