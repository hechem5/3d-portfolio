import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { PDFViewer } from '@react-pdf/renderer';
import { CVDocument } from '../components/cv/CVDocument';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cvData, setCvData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: '',
    languages: '',
    skills: [],
    keyProjects: [],
    experience: [],
    education: [],
    certifications: []
  });
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  // JSON Import State
  const [jsonImport, setJsonImport] = useState('');
  const [jsonError, setJsonError] = useState('');

  useEffect(() => {
    // Initial fetch on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchCVData();
    });

    // Only fetch data when specifically signing in to avoid wiping unsaved work on token refreshes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN') {
        fetchCVData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCVData = async () => {
    const { data, error } = await supabase.from('cv_data').select('content').eq('id', 1).single();
    if (data) {
      setCvData({
        name: data.content.name || '',
        role: data.content.role || '',
        email: data.content.email || '',
        phone: data.content.phone || '',
        location: data.content.location || '',
        linkedin: data.content.linkedin || '',
        summary: data.content.summary || '',
        languages: data.content.languages || '',
        skills: data.content.skills || [],
        keyProjects: data.content.keyProjects || [],
        experience: data.content.experience || [],
        education: data.content.education || [],
        certifications: data.content.certifications || []
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
      const { data, error } = await supabase.from('cv_data').update({ content: cvData }).eq('id', 1).select();
      if (error) throw error;
      if (!data || data.length === 0) {
        alert('ERROR: The database silently blocked the save! This usually means Row Level Security (RLS) is blocking you, or row ID 1 does not exist.');
      } else {
        alert('CV Saved Successfully to Database!');
      }
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

  const handleJsonImport = () => {
    try {
      if (!jsonImport.trim()) return;
      
      // Sanitize: remove markdown backticks if user accidentally copied them
      let cleanJson = jsonImport.trim();
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.substring(7);
      }
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.substring(3);
      }
      if (cleanJson.endsWith('```')) {
        cleanJson = cleanJson.substring(0, cleanJson.length - 3);
      }
      cleanJson = cleanJson.trim();

      const parsed = JSON.parse(cleanJson);
      
      // Merge with default schema to ensure arrays exist and UI doesn't crash
      setCvData({
        name: parsed.name || '',
        role: parsed.role || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        location: parsed.location || '',
        linkedin: parsed.linkedin || '',
        summary: parsed.summary || '',
        languages: parsed.languages || '',
        skills: parsed.skills || [],
        keyProjects: parsed.keyProjects || [],
        experience: parsed.experience || [],
        education: parsed.education || [],
        certifications: parsed.certifications || []
      });
      
      setJsonError('');
      setJsonImport(''); // Clear it after success
      alert('JSON loaded into form! Review your changes and click Save CV Data when ready.');
    } catch (e) {
      setJsonError('Invalid JSON format. Please ensure you copied exactly the { ... } object without any text before or after it.');
    }
  };

  const addArrayItem = (field, emptyItem) => {
    setCvData(prev => ({ ...prev, [field]: [...(prev[field] || []), emptyItem] }));
  };

  const updateArrayItem = (field, index, key, value) => {
    setCvData(prev => {
      const arr = [...(prev[field] || [])];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [field]: arr };
    });
  };

  const removeArrayItem = (field, index) => {
    setCvData(prev => {
      const arr = [...(prev[field] || [])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  if (!session) {
    return (
      <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 className="heading-md" style={{ marginBottom: '2rem' }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="email" placeholder="Email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="section admin-override" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', maxWidth: '1600px', margin: '0 auto' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="section-subtitle">Dashboard</span>
          <h2 className="heading-lg">Manage CV</h2>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Sign Out</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: FORM */}
        <div style={{ display: 'grid', gap: '2rem' }}>
        
        {/* JSON Import Tool */}
        <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #915EFF' }}>
          <h3 className="heading-sm" style={{ marginBottom: '1rem', color: '#915EFF' }}>Advanced: Import JSON</h3>
          <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Paste a valid CV JSON object here to instantly populate the form below. 
          </p>
          <textarea 
            className="form-input" 
            placeholder='{ "name": "Hechem", "role": "Developer"... }'
            value={jsonImport}
            onChange={(e) => { setJsonImport(e.target.value); setJsonError(''); }}
            style={{ minHeight: '120px', fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical' }}
          />
          {jsonError && <p style={{ color: '#FF006E', fontSize: '0.85rem', marginTop: '0.5rem' }}>{jsonError}</p>}
          <button 
            onClick={handleJsonImport} 
            className="btn-primary" 
            style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.85rem', width: 'fit-content' }}
          >
            Load into Form
          </button>
        </div>

        {/* Basic Info */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#00E5FF' }}>Basic Info & Contact</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" value={cvData.name} onChange={(e) => updateField('name', e.target.value)} />
              </div>
              <div>
                <label className="form-label">Professional Role</label>
                <input type="text" className="form-input" value={cvData.role} onChange={(e) => updateField('role', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Email</label>
                <input type="text" className="form-input" value={cvData.email} onChange={(e) => updateField('email', e.target.value)} />
              </div>
              <div>
                <label className="form-label">Phone</label>
                <input type="text" className="form-input" value={cvData.phone} onChange={(e) => updateField('phone', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Location (e.g. El Kef, Tunisia)</label>
                <input type="text" className="form-input" value={cvData.location} onChange={(e) => updateField('location', e.target.value)} />
              </div>
              <div>
                <label className="form-label">LinkedIn URL</label>
                <input type="text" className="form-input" value={cvData.linkedin} onChange={(e) => updateField('linkedin', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="form-label">Languages (e.g. English (C1) • French (B1))</label>
              <input type="text" className="form-input" value={cvData.languages} onChange={(e) => updateField('languages', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Summary</label>
              <textarea className="form-input" style={{ minHeight: '100px', resize: 'vertical' }} value={cvData.summary} onChange={(e) => updateField('summary', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 className="heading-sm" style={{ marginBottom: '1.5rem', color: '#00E5FF' }}>Technical Skills</h3>
          <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Format for classic layout: "Category: Skill 1, Skill 2" (e.g., "Languages: Java, Python")</p>
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
              type="text" className="form-input" placeholder="e.g. Languages: Java, Python..." 
              value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
            <button onClick={addSkill} className="btn-primary" style={{ padding: '0 1.5rem' }}>Add</button>
          </div>
        </div>

        {/* Key Projects */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="heading-sm" style={{ color: '#00E5FF', margin: 0 }}>Key Projects</h3>
            <button onClick={() => addArrayItem('keyProjects', { title: '', subtitle: '', location: '', date: '', points: [] })} className="btn-primary" style={{ padding: '0.25rem 1.5rem', fontSize: '0.9rem' }}>+ Add Project</button>
          </div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {cvData.keyProjects.map((proj, i) => (
              <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative' }}>
                <button onClick={() => removeArrayItem('keyProjects', i)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FF006E', cursor: 'pointer' }}>Delete</button>
                <div style={{ display: 'grid', gap: '1rem', paddingRight: '3rem' }}>
                  <input type="text" className="form-input" placeholder="Project Title (e.g. PixelHR — Full HR Platform)" value={proj.title} onChange={(e) => updateArrayItem('keyProjects', i, 'title', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Subtitle (e.g. Final Year Project, ISI)" value={proj.subtitle} onChange={(e) => updateArrayItem('keyProjects', i, 'subtitle', e.target.value)} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input type="text" className="form-input" placeholder="Location (e.g. Kef)" value={proj.location} onChange={(e) => updateArrayItem('keyProjects', i, 'location', e.target.value)} />
                    <input type="text" className="form-input" placeholder="Dates (e.g. 2025 - 2026)" value={proj.date} onChange={(e) => updateArrayItem('keyProjects', i, 'date', e.target.value)} />
                  </div>
                  <textarea 
                    className="form-input" 
                    placeholder="Bullet points (put each point on a new line)" 
                    value={(proj.points || []).join('\n')}
                    onChange={(e) => updateArrayItem('keyProjects', i, 'points', e.target.value.split('\n').filter(p => p.trim() !== ''))}
                    style={{ minHeight: '100px', resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}
            {cvData.keyProjects.length === 0 && <p style={{ color: 'var(--secondary)' }}>No key projects added yet.</p>}
          </div>
        </div>

        {/* Experience */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="heading-sm" style={{ color: '#00E5FF', margin: 0 }}>Experience</h3>
            <button onClick={() => addArrayItem('experience', { title: '', company: '', date: '', points: [] })} className="btn-primary" style={{ padding: '0.25rem 1.5rem', fontSize: '0.9rem' }}>+ Add Job</button>
          </div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {cvData.experience.map((exp, i) => (
              <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative' }}>
                <button onClick={() => removeArrayItem('experience', i)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FF006E', cursor: 'pointer' }}>Delete</button>
                <div style={{ display: 'grid', gap: '1rem', paddingRight: '3rem' }}>
                  <input type="text" className="form-input" placeholder="Job Title (e.g. Software Engineering Intern)" value={exp.title} onChange={(e) => updateArrayItem('experience', i, 'title', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Company Name" value={exp.company} onChange={(e) => updateArrayItem('experience', i, 'company', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Dates (e.g. 2026)" value={exp.date} onChange={(e) => updateArrayItem('experience', i, 'date', e.target.value)} />
                  <textarea 
                    className="form-input" 
                    placeholder="Bullet points (put each point on a new line)" 
                    value={(exp.points || []).join('\n')}
                    onChange={(e) => updateArrayItem('experience', i, 'points', e.target.value.split('\n').filter(p => p.trim() !== ''))}
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
            <button onClick={() => addArrayItem('education', { degree: '', school: '', date: '', subtitle: '' })} className="btn-primary" style={{ padding: '0.25rem 1.5rem', fontSize: '0.9rem' }}>+ Add School</button>
          </div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {cvData.education.map((edu, i) => (
              <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative' }}>
                <button onClick={() => removeArrayItem('education', i)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FF006E', cursor: 'pointer' }}>Delete</button>
                <div style={{ display: 'grid', gap: '1rem', paddingRight: '3rem' }}>
                  <input type="text" className="form-input" placeholder="Degree (e.g. Licence (BSc) in Software Engineering)" value={edu.degree} onChange={(e) => updateArrayItem('education', i, 'degree', e.target.value)} />
                  <input type="text" className="form-input" placeholder="School (e.g. ISI Kef, El Kef, Tunisia)" value={edu.school} onChange={(e) => updateArrayItem('education', i, 'school', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Dates (e.g. Sep 2022 - Jun 2026)" value={edu.date} onChange={(e) => updateArrayItem('education', i, 'date', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Subtitle/Honours (e.g. Graduated with Honours)" value={edu.subtitle} onChange={(e) => updateArrayItem('education', i, 'subtitle', e.target.value)} />
                </div>
              </div>
            ))}
            {cvData.education.length === 0 && <p style={{ color: 'var(--secondary)' }}>No education added yet.</p>}
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="heading-sm" style={{ color: '#00E5FF', margin: 0 }}>Certifications & Awards</h3>
            <button onClick={() => addArrayItem('certifications', { title: '', issuer: '', date: '', points: [] })} className="btn-primary" style={{ padding: '0.25rem 1.5rem', fontSize: '0.9rem' }}>+ Add Cert</button>
          </div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {cvData.certifications.map((cert, i) => (
              <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', position: 'relative' }}>
                <button onClick={() => removeArrayItem('certifications', i)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#FF006E', cursor: 'pointer' }}>Delete</button>
                <div style={{ display: 'grid', gap: '1rem', paddingRight: '3rem' }}>
                  <input type="text" className="form-input" placeholder="Title (e.g. EF SET English Certificate)" value={cert.title} onChange={(e) => updateArrayItem('certifications', i, 'title', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Issuer (e.g. EF SET)" value={cert.issuer} onChange={(e) => updateArrayItem('certifications', i, 'issuer', e.target.value)} />
                  <input type="text" className="form-input" placeholder="Date (e.g. July 2026)" value={cert.date} onChange={(e) => updateArrayItem('certifications', i, 'date', e.target.value)} />
                  <textarea 
                    className="form-input" 
                    placeholder="Bullet points (put each point on a new line)" 
                    value={(cert.points || []).join('\n')}
                    onChange={(e) => updateArrayItem('certifications', i, 'points', e.target.value.split('\n').filter(p => p.trim() !== ''))}
                    style={{ minHeight: '100px', resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}
            {cvData.certifications.length === 0 && <p style={{ color: 'var(--secondary)' }}>No certifications added yet.</p>}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'sticky', bottom: '2rem', zIndex: 10 }}>
          <button onClick={handleSave} className="btn-primary" disabled={saving} style={{ padding: '1rem 3rem', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(82, 39, 255, 0.4)' }}>
            {saving ? 'Saving...' : 'Save CV Data'}
          </button>
        </div>

        </div> {/* END LEFT COLUMN */}

        {/* RIGHT COLUMN: LIVE PDF PREVIEW */}
        <div className="glass-card" style={{ position: 'sticky', top: '100px', height: 'calc(100vh - 120px)', padding: '1rem', overflow: 'hidden' }}>
          <h3 className="heading-sm" style={{ marginBottom: '1rem', color: '#00E5FF' }}>Live Preview</h3>
          <PDFViewer style={{ width: '100%', height: 'calc(100% - 3rem)', border: 'none', borderRadius: '8px' }}>
            <CVDocument data={cvData} />
          </PDFViewer>
        </div>

      </div>
    </div>
  );
}
