import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get('/companies/my-companies');
        setCompanies(res.data || []);
      } catch (err) {
        console.error('Failed to load registered companies', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <div className="text-slate-400 p-6">Loading companies...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Registered Companies</h2>
          <p className="text-slate-400 text-sm mt-1">Manage corporate profiles associated with your job postings.</p>
        </div>
        <Link to="/recruiter/companies/create" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-lg">
          ➕ Register Company
        </Link>
      </div>

      {companies.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center shadow-lg">
          <p className="text-slate-500 font-medium mb-4">You have not registered any companies yet.</p>
          <Link to="/recruiter/companies/create" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
            Register your first company profile
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-full hover:border-indigo-500/30 transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt={company.name} className="w-12 h-12 rounded-xl object-cover border border-slate-800" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold text-slate-400">
                      {company.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-semibold text-white truncate">{company.name}</h3>
                    <p className="text-xs text-indigo-400 font-medium">📍 {company.location}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-3">{company.description}</p>
              </div>

              {company.website && (
                <a 
                  href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-slate-400 hover:text-indigo-400 pt-4 mt-4 border-t border-slate-800/60 truncate block"
                >
                  🌐 {company.website}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}