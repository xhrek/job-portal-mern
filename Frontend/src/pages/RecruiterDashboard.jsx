import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function RecruiterDashboard() {
  const [stats, setStats] = useState({ totalJobs: 0, totalApplicants: 0 });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const [dashRes, jobsRes] = await Promise.all([
          api.get('/dashboard/recruiter'),
          api.get('/jobs/recruiter') // Hits your backend recruiter route mapping
        ]);
        setStats(dashRes.data || { totalJobs: 0, totalApplicants: 0 });
        setJobs(jobsRes.data?.slice(0, 5) || []);
      } catch (error) {
        console.error('Error fetching recruiter dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, []);

  if (loading) return <div className="text-slate-400 p-6">Loading dashboard...</div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <span className="text-slate-400 text-sm mb-1">Active Jobs Posted</span>
          <span className="text-4xl font-bold text-white tracking-tight">{stats.totalJobs}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <span className="text-slate-400 text-sm mb-1">Total Applications Received</span>
          <span className="text-4xl font-bold text-indigo-400 tracking-tight">{stats.totalApplicants}</span>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Ready to hire top talent?</h3>
          <p className="text-slate-400 text-sm mt-1">Create a new job posting and link it to your verified company profile.</p>
        </div>
        <Link to="/recruiter/jobs/create" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl text-center shadow-lg transition-all">
          Post a Job
        </Link>
      </div>

      {/* Recent Jobs Feed */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Your Recent Job Postings</h3>
        
        {jobs.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 text-center text-slate-500">
            You haven't posted any jobs yet. <Link to="/recruiter/jobs/create" className="text-indigo-400">Post your first job.</Link>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="divide-y divide-slate-800">
              {jobs.map((job) => (
                <div key={job._id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-950/40 transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                      <span>📍 {job.location}</span>
                      <span>•</span>
                      <span>💼 {job.jobType}</span>
                      {job.salary && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">
                            {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR',
                              maximumFractionDigits: 0
                            }).format(job.salary)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link 
                    to={`/recruiter/jobs/${job._id}/applicants`} 
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl font-medium transition-colors text-center sm:w-auto w-full"
                  >
                    View Applicants
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}