import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function CreateCompany() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/companies', { name, description, website, location });
      navigate('/recruiter/companies');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register company profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Register Company Profile</h2>
          <Link to="/recruiter/companies" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl transition-colors">
            Cancel
          </Link>
        </div>

        {error && (
          <div className="bg-rose-950/50 border border-rose-900 text-rose-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g. TechCorp Solutions"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Website URL</label>
            <input 
              type="text" 
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g. https://techcorp.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Headquarters / Location</label>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g. San Francisco, CA"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Company Description</label>
            <textarea 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Brief summary describing what the company builds or specializes in..."
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Registering...' : 'Register Company'}
          </button>
        </form>
      </div>
    </div>
  );
}