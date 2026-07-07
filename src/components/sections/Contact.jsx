import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const IconMapPin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

const IconMail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);

export default function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a177d019-9259-4091-9c72-0f6120f5572b",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <span className="section-subtitle">Get In Touch</span>
        <h2 className="heading-lg">Contact Me</h2>
      </div>

      <div className="contact-container">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="contact-info glass-card"
        >
          <h3 className="heading-md" style={{ marginBottom: '1.5rem' }}>Let's talk about your next project</h3>
          <p className="text-body" style={{ marginBottom: '2rem' }}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon"><IconMapPin /></div>
              <div>
                <h4 className="heading-sm">Location</h4>
                <p className="text-body">El Kef, Tunisia</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><IconMail /></div>
              <div>
                <h4 className="heading-sm">Email</h4>
                <a href="mailto:Hechem.klai@gmail.com" className="text-body">Hechem.klai@gmail.com</a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="contact-form-wrapper glass-card"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Your Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Your Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="What do you want to build?" className="form-input" required />
            </div>

            <button type="submit" className="btn-primary w-full flex-center" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
            </button>

            {status && (
              <div className="form-status" style={{ marginTop: '1rem', color: 'var(--accent-green)', textAlign: 'center', fontSize: '0.9rem' }}>
                {status.message}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
