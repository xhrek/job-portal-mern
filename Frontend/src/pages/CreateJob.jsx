import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CreateJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Full-Time');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecruiterCompanies = async () => {
      try {
        // Fetch recruiter's created companies to populate dropdown select
        const res = await api.get('/companies/my-companies');
        setCompanies(res.data);
        if (res.data.length > 0) setCompany(res.data[0]._id);
      } catch (err) {
        console.error('Failed to load companies', err);
      }
    };
    fetchRecruiterCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Convert comma-separated string array into an array of strings
    const requirementsArray = requirements.split(',').map(req => req.trim()).filter(Boolean);

    try {
      await api.post('/jobs', {
        title,
        description,
        requirements: requirementsArray,
        salary,
        location,
        jobType,
        company
      });
      navigate('/recruiter/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job posting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Post a New Job Opening</h2>

        {error && (
          <div className="bg-rose-950/50 border border-rose-900 text-rose-400 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Job Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g. Senior Frontend Engineer"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
            <select 
              value={company} 
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              required
            >
              {companies.map(comp => (
                <option key={comp._id} value={comp._id}>{comp.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="E.g. New York, NY or Remote"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Salary Range</label>
              <input 
                type="text" 
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="E.g. $120,000 - $140,000" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Job Type</label>
            <select 
              value={jobType} 
              onChange={(e) => setJobType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Job Description</label>
            <textarea 
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Describe the responsibilities and expectations..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Requirements (Comma separated)</label>
            <input 
              type="text" 
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="E.g. React, Node.js, TypeScript"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 mt-6"
          >
            {loading ? 'Publishing job...' : 'Publish Job Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
