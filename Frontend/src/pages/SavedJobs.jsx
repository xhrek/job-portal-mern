import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import api from '../api/axios';

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        // Assuming your backend exposes a route like GET /saved-jobs
        const res = await api.get('/saved-jobs');
        // Map the populated structure assuming structure sends back an array holding { _id, job: {...} } or direct job objects
        const jobsList = res.data.map(item => item.job || item).filter(Boolean);
        setSavedJobs(jobsList);
      } catch (err) {
        console.error('Failed to load saved jobs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (loading) return <div className="text-slate-400 p-6">Loading saved listings...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Saved Jobs</h2>
        <p className="text-slate-400 text-sm mt-1">Your bookmarked positions ready for review.</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center shadow-lg">
          <p className="text-slate-500 font-medium">You have no saved jobs yet.</p>
          <p className="text-slate-600 text-xs mt-1">Bookmark positions from the main listings to see them appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}