import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cvData, setCvData] = useState({
    name: '',
    role: '',
    skills: [],
    experience: [],
    education: []
  });
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchCVData();
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchCVData();
    });
  }, []);

  const fetchCVData = async () => {
    const { data, error } = await supabase.from('cv_data').select('content').eq('id', 1).single();
    if (data) {
      setCvData({
        name: data.content.name || '',
        role: data.content.role || '',
        skills: data.content.skills || [],
        experience: data.content.experience || [],
        education: data.content.education || []
      });
    } else {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('cv_data').update({ content: cvData }).eq('id', 1);
      if (error) throw error;
      alert('CV Saved Successfully!');
    } catch (err) {
      alert('Error saving CV: ' + err.message);
    }
    setSaving(false);
  };

  const updateField = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      updateField('skills', [...cvData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateField('skills', cvData.skills.filter(s => s !== skillToRemove));
  };

  const addExperience = () => {
    updateField('experience', [...cvData.experience, { title: '', company: '', date: '', points: [] }]);
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...cvData.experience];
    newExp[index][field] = value;
    updateField('experience', newExp);
  };

  const removeExperience = (index) => {
    updateField('experience', cvData.experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    updateField('education', [...cvData.education, { degree: '', school: '', date: '' }]);
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...cvData.education];
    newEdu[index][field] = value;
    updateField('education', newEdu);
  };

  const removeEducation = (index) => {
    updateField('education', cvData.education.filter((_, i) => i !== index));
  };

  if (!session) {
    return (
      <div className="section flex-center admin-override" style={{ minHeight: '100vh' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '3rem', maxWidth: '400px', width: '100%' }}>
          <h2 className="heading-md" style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="form-label">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
            </div>
            {error && <p style={{ color: '#FF006E', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="section admin-override" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="heading-lg">CV Data Editor</h2>
        <button onClick={() => supabase.auth.signOut()} className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Sign Out</button>
      </div>

      <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Basic Info */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#00E5FF' }}>Basic Info</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" value={cvData.name} onChange={(e) => updateField('name', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Professional Role</label>
              <input type="text" className="form-input" value={cvData.role} onChange={(e) => updateField('role', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#00E5FF' }}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {cvData.skills.map((skill, i) => (
              <div key={i} style={{ 
                background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.2)',
                padding: '0.25rem 0.75rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'
              }}>
                {skill}
                <button onClick={() => removeSkill(skill)} style={{ background: 'none', border: 'none', color: '#FF006E', cursor: 'pointer', fontWeight: 'bold' }}>×</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" className="form-input" placeholder="Add a skill..." 
              value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
            <button onClick={addSkill} className="btn-secondary">Add</button>
          </div>
        </div>

        {/* Experience */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="heading-sm" style={{ color: '#00E5FF', margin: 0 }}>Experience</h3>
            <button onClick={addExperience} className="btn-secondary" style={{ padding: '0.25rem 1rem', fontSize: '0.9rem' }}>+ Add Job</button>
          </div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {cvData.experience.map((exp, i) => (
              <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative' }}>
                <button onClick={() => removeExperience(i)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FF006E', cursor: 'pointer' }}>Delete</button>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem', paddingRight: '3rem' }}>
                  <input type="text" className="form-input" placeholder="Job Title (e.g. Frontend Engineer)" value={exp.title} onChange={(e) => updateExperience(i, 'title', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Company Name" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Dates (e.g. Jan 2022 - Present)" value={exp.date} onChange={(e) => updateExperience(i, 'date', e.target.value)} />
                  <textarea 
                    className="form-input" 
                    placeholder="Bullet points (put each point on a new line)" 
                    value={(exp.points || []).join('\n')}
                    onChange={(e) => updateExperience(i, 'points', e.target.value.split('\n').filter(p => p.trim() !== ''))}
                    style={{ minHeight: '100px', resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}
            {cvData.experience.length === 0 && <p style={{ color: 'var(--secondary)' }}>No experience added yet.</p>}
          </div>
        </div>

        {/* Education */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="heading-sm" style={{ color: '#00E5FF', margin: 0 }}>Education</h3>
            <button onClick={addEducation} className="btn-secondary" style={{ padding: '0.25rem 1rem', fontSize: '0.9rem' }}>+ Add School</button>
          </div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {cvData.education.map((edu, i) => (
              <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative' }}>
                <button onClick={() => removeEducation(i)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FF006E', cursor: 'pointer' }}>Delete</button>
                <div style={{ display: 'grid', gap: '1rem', paddingRight: '3rem' }}>
                  <input type="text" className="form-input" placeholder="Degree (e.g. BS Computer Science)" value={edu.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)} />
                  <input type="text" className="form-input" placeholder="School Name" value={edu.school} onChange={(e) => updateEducation(i, 'school', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Dates (e.g. 2018 - 2022)" value={edu.date} onChange={(e) => updateEducation(i, 'date', e.target.value)} />
                </div>
              </div>
            ))}
            {cvData.education.length === 0 && <p style={{ color: 'var(--secondary)' }}>No education added yet.</p>}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'sticky', bottom: '2rem', zIndex: 10 }}>
          <button onClick={handleSave} className="btn-primary" disabled={saving} style={{ padding: '1rem 3rem', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(82, 39, 255, 0.4)' }}>
            {saving ? 'Saving...' : 'Save CV Data'}
          </button>
        </div>

      </div>
    </div>
  );
}
