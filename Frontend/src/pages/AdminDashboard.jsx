import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0, totalCompanies: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        // Adjust endpoint to match your backend metrics route
        const res = await api.get('/admin/metrics');
        setStats(res.data || { totalUsers: 0, totalJobs: 0, totalCompanies: 0 });
      } catch (err) {
        console.error('Failed to load administrative metrics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) return <div className="text-slate-400 p-6">Loading admin metrics...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Platform Administration</h2>
        <p className="text-slate-400 text-sm mt-1">High-level overview of system metrics and aggregated usage.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <span className="text-slate-400 text-sm mb-1">Total Users Registered</span>
          <span className="text-4xl font-bold text-white tracking-tight">{stats.totalUsers}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <span className="text-slate-400 text-sm mb-1">Total Job Openings</span>
          <span className="text-4xl font-bold text-indigo-400 tracking-tight">{stats.totalJobs}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <span className="text-slate-400 text-sm mb-1">Corporate Profiles</span>
          <span className="text-4xl font-bold text-purple-400 tracking-tight">{stats.totalCompanies}</span>
        </div>
      </div>
      
      {/* System Status Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500">
        System services are running securely. Use the sidebar navigation to manage specific users or corporate profiles.
      </div>
    </div>
  );
}