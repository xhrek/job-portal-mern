import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications');
        setApplications(res.data || []);
      } catch (err) {
        console.error('Failed to load job applications', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-950/40 border-emerald-800 text-emerald-300';
      case 'Reviewing':
        return 'bg-indigo-950/40 border-indigo-800 text-indigo-300';
      case 'Interviewing':
        return 'bg-amber-950/40 border-amber-800 text-amber-300';
      case 'Rejected':
        return 'bg-rose-950/40 border-rose-800 text-rose-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  if (loading) return <div className="text-slate-400 p-6">Loading applications...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold text-white">My Applications</h2>
        <p className="text-slate-400 text-sm mt-1">Track the progress of jobs you have applied for.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center shadow-lg">
          <p className="text-slate-500 font-medium mb-4">You have not submitted any applications yet.</p>
          <Link to="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
            Browse Open Jobs
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800/60">
            {applications.map((app) => (
              <div key={app._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-950/30 transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-white">
                      {app.job?.title || 'Job Listing'}
                    </h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-400 font-medium">
                    {app.job?.company?.name || 'Company Name'}
                  </p>
                  <p className="text-xs text-slate-500">
                    Applied on: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3 self-end sm:self-center">
                  {app.job && (
                    <Link 
                      to={`/jobs/${app.job._id}`} 
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs px-4 py-2.5 rounded-xl font-medium transition-colors"
                    >
                      View Listing
                    </Link>
                  )}
                  {app.resumeUrl && (
                    <a 
                      href={app.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-slate-950 hover:bg-slate-900 text-indigo-400 border border-slate-800 text-xs px-4 py-2.5 rounded-xl font-medium transition-colors inline-flex items-center gap-1.5"
                    >
                      📄 Submitted Resume
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}