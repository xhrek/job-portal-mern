import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../../api/dashboardApi';
import StatsCard from '../../components/dashboard/StatsCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import Loader from '../../components/common/Loader';

const CandidateDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fallback or Mock data wrapper if your endpoint is pending
        const res = await dashboardApi.getCandidateMetrics();
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed fetching dashboard metrics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-sm text-gray-500">Here's a look at your application status tracker.</p>
      </div>

      {/* Grid Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Applications" count={metrics?.totalApplied || 0} type="primary" />
        <StatsCard title="Interviews Scheduled" count={metrics?.interviewsCount || 0} type="success" />
        <StatsCard title="Saved Postings" count={metrics?.savedJobsCount || 0} type="warning" />
      </div>

      {/* Feed Area */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Applications Status updates</h2>
        <div className="divide-y divide-gray-100">
          {metrics?.recentActivities?.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          )) || <p className="text-gray-400 py-4 text-center">No recent application history found.</p>}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;