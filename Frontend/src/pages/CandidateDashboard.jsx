import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function CandidateDashboard() {
  const [metrics, setMetrics] = useState({ appliedCount: 0, shortlistedCount: 0, rejectedCount: 0 });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetches candidate specific data from your applications route
        const [metricsRes, appsRes] = await Promise.all([
          api.get('/dashboard/candidate-metrics'),
          api.get('/applications/my-applications')
        ]);
        
        setMetrics(metricsRes.data || { appliedCount: 0, shortlistedCount: 0, rejectedCount: 0 });
        setApplications(appsRes.data || []);
      } catch (err) {
        console.error('Failed to load candidate dashboard analytics.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted': return 'bg-emerald-950/50 border-emerald-800 text-emerald-400';
      case 'Rejected': return 'bg-rose-950/50 border-rose-800 text-rose-400';
      case 'Interviewing': return 'bg-indigo-950/50 border-indigo-800 text-indigo-400';
      default: return 'bg-amber-950/50 border-amber-800 text-amber-400'; // Pending
    }
  };

  if (loading) return <div className="text-slate-400 p-6">Loading your dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
          <p className="text-slate-400 text-sm mt-1">Track your job applications, profile views, and recruitment statuses.</p>
        </div>
        <Link to="/jobs" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg text-center">
          🔍 Explore New Jobs
        </Link>
      </div>

      {/* Analytics KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <span className="text-slate-400 text-sm font-medium">Applied Positions</span>
          <span className="text-4xl font-bold text-white tracking-tight mt-2">{metrics.appliedCount}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <span className="text-slate-400 text-sm font-medium">Shortlisted / Interviews</span>
          <span className="text-4xl font-bold text-indigo-400 tracking-tight mt-2">{metrics.shortlistedCount}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <span className="text-slate-400 text-sm font-medium">Archived Applications</span>
          <span className="text-4xl font-bold text-slate-500 tracking-tight mt-2">{metrics.rejectedCount}</span>
        </div>
      </div>

      {/* Applications Tracking Table Segment */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-base font-semibold text-white">Your Application History</h3>
          <span className="text-xs text-indigo-400 font-medium bg-indigo-950/40 px-2.5 py-1 rounded-full border border-indigo-900/40">Live Status</span>
        </div>

        {applications.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium">
            <p>You haven't submitted any applications yet.</p>
            <Link to="/jobs" className="text-indigo-400 hover:text-indigo-300 text-sm mt-2 inline-block">
              Find your dream job now →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-950/40 text-slate-400 border-b border-slate-800">
                  <th className="p-4 font-semibold">Role Title</th>
                  <th className="p-4 font-semibold">Company Name</th>
                  <th className="p-4 font-semibold">Applied Date</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Offer Remuneration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-950/10 transition-colors">
                    <td className="p-4 font-medium text-white">{app.job?.title || 'Software Engineer'}</td>
                    <td className="p-4 text-slate-400">{app.job?.company?.name || app.job?.companyName || 'Tech Enterprise'}</td>
                    <td className="p-4 text-xs text-slate-400">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusBadge(app.status)}`}>
                        {app.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium text-slate-200">
                      {app.job?.salary ? (
                        new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0
                        }).format(app.job.salary)
                      ) : (
                        'Not Disclosed'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}