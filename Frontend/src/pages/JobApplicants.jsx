import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function JobApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await api.get(`/jobs/${jobId}/applicants`);
        setApplications(res.data.applications || []);
        setJobTitle(res.data.jobTitle || 'Job Listing');
      } catch (err) {
        console.error('Failed to load applicants', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await api.patch(`/applications/${appId}/status`, { status: newStatus });
      // Update local state smoothly
      setApplications(prev => 
        prev.map(app => app._id === appId ? { ...app, status: newStatus } : app)
      );
    } catch (err) {
      alert('Failed to update application status.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-emerald-950 border-emerald-800 text-emerald-300';
      case 'Reviewing': return 'bg-indigo-950 border-indigo-800 text-indigo-300';
      case 'Interviewing': return 'bg-amber-950 border-amber-800 text-amber-300';
      case 'Rejected': return 'bg-rose-950 border-rose-800 text-rose-300';
      default: return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  if (loading) return <div className="text-slate-400 p-6">Loading applicants...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Applicants for: "{jobTitle}"</h2>
          <p className="text-slate-400 text-sm mt-1">Review candidate profiles, resumes, and manage their status.</p>
        </div>
        <Link to="/recruiter/jobs" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl font-medium transition-colors">
          Back to My Jobs
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center shadow-lg">
          <p className="text-slate-500 font-medium">No candidates have applied to this position yet.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800/60">
            {applications.map((app) => (
              <div key={app._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-950/30 transition-colors">
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-white">{app.candidate?.name || 'Anonymous Candidate'}</h3>
                  <p className="text-sm text-indigo-400 font-medium">{app.candidate?.email || 'No email provided'}</p>
                  
                  {/* Candidate Skills Showcase */}
                  {app.candidate?.profile?.skills && app.candidate.profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {app.candidate.profile.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 pt-2">
                    Applied on: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-3">
                  <div className="flex items-center gap-2">
                    {app.resumeUrl && (
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-slate-950 hover:bg-slate-900 text-indigo-400 border border-slate-800 text-xs px-4 py-2.5 rounded-xl font-medium transition-colors inline-flex items-center gap-1.5"
                      >
                        📄 View Attached PDF
                      </a>
                    )}
                    <span className={`text-xs px-3 py-2.5 rounded-xl font-medium border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Admin Controller Status Pipeline */}
                  <div className="flex gap-1.5 self-start sm:self-end bg-slate-950 p-1 rounded-xl border border-slate-800">
                    {['Applied', 'Reviewing', 'Interviewing', 'Accepted', 'Rejected'].map((statusOption) => (
                      <button
                        key={statusOption}
                        onClick={() => handleStatusChange(app._id, statusOption)}
                        disabled={app.status === statusOption}
                        className={`text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                          app.status === statusOption 
                            ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 cursor-default' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        {statusOption}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}