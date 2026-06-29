import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

export default function EditProfile() {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [skills, setSkills] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get('/auth/profile');
        setName(res.data.name || '');
        setHeadline(res.data.profile?.headline || '');
        setSkills(res.data.profile?.skills ? res.data.profile.skills.join(', ') : '');
      } catch (err) {
        console.error('Error getting profile info', err);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('headline', headline);
    formData.append('skills', skills);
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }

    try {
      // Assuming your backend uses upload middleware and handles multipart form updates at PUT /auth/profile
      const res = await api.put('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Update locally cached user state context
      const token = localStorage.getItem('token');
      login(res.data, token);

      navigate('/candidate/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Update Profile Settings</h2>

        {error && (
          <div className="bg-rose-950/50 border border-rose-900 text-rose-400 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Professional Headline</label>
            <input 
              type="text" 
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g. Full-Stack Developer specializing in React and Node.js"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Skills (Comma separated)</label>
            <input 
              type="text" 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g. JavaScript, Python, PostgreSQL, AWS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Upload Resume (PDF)</label>
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 mt-6"
          >
            {loading ? 'Saving profile...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}