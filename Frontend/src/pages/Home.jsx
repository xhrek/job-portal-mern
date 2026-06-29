import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import api from '../api/axios';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchParams = {}) => {
    try {
      setLoading(true);
      // Fetch latest jobs from your Express backend
      const response = await api.get('/jobs', { params: searchParams });
      // Limiting to 6 for a clean grid preview on the homepage
      setJobs(response.data.slice(0, 6)); 
    } catch (error) {
      console.error('Error fetching jobs from server:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    fetchJobs(searchData);
  };

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Branding Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">dream tech job</span> today
        </h1>
        <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto">
          Discover thousands of job listings or grow your remote engineering team with top-tier talent.
        </p>
        
        <div className="flex justify-center pt-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Recent Job Openings</h2>
        
        {loading ? (
          <div className="text-center text-slate-400 py-12 font-medium">Loading live positions...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-slate-500 py-12 bg-slate-900/40 rounded-2xl border border-slate-800/50">
            No jobs found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}