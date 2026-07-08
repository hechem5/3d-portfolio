import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cvData, setCvData] = useState(null);
  const [saving, setSaving] = useState(false);

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
      // Format JSON with 2 spaces for the textarea
      setCvData(JSON.stringify(data.content, null, 2));
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
      const parsedData = JSON.parse(cvData);
      const { error } = await supabase.from('cv_data').update({ content: parsedData }).eq('id', 1);
      if (error) throw error;
      alert('CV Saved Successfully!');
    } catch (err) {
      alert('Error saving CV: Make sure the JSON is valid. ' + err.message);
    }
    setSaving(false);
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
    <div className="section admin-override" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="heading-lg">CV Data Editor</h2>
        <button onClick={() => supabase.auth.signOut()} className="btn-secondary" style={{ padding: '0.5rem 1.5rem' }}>Sign Out</button>
      </div>

      <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--secondary)' }}>Edit the raw JSON data for your dynamic CV below. Be careful not to break the JSON syntax (missing quotes or commas).</p>
        
        <textarea 
          value={cvData || ''} 
          onChange={(e) => setCvData(e.target.value)}
          style={{
            width: '100%',
            height: '60vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#00E5FF',
            fontFamily: 'monospace',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            resize: 'vertical'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button onClick={handleSave} className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save CV Data'}
          </button>
        </div>
      </div>
    </div>
  );
}
