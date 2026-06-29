import { useState, useEffect } from 'react';
import jobPilotLogo from './assets/jobpilot-logo.png';
import './App.css';

// Mock Data for the Job Portal
const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Frontend React Developer',
    company: 'Tata Consultancy Services',
    location: 'Bengaluru',
    type: 'Full-time',
    salary: '₹8,50,000 - ₹10,50,000',
  },
  {
    id: 2,
    title: 'Full Stack MERN Developer',
    company: 'Infosys',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹10,00,000 - ₹14,00,000',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Zoho Corporation',
    location: 'Chennai',
    type: 'Part-time',
    salary: '₹800 - ₹1,500 / hr',
  },
  {
    id: 4,
    title: 'Software Engineer',
    company: 'Wipro',
    location: 'Pune',
    type: 'Full-time',
    salary: '₹6,00,000 - ₹8,50,000',
  },
];

export default function App() {
  const [jobs] = useState(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === 'All' || job.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="portal-header">
        <div className="brand">
          <img
            src={jobPilotLogo}
            className="jobpilot-logo"
            alt="JobPilot Logo"
          />
          <h1>JobPilot</h1>
        </div>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* Search & Filter */}
      <section className="search-filter-section">
        <input
          type="text"
          placeholder="Search jobs by title or company..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="filter-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </section>

      {/* Job Listings */}
      <main className="job-listings-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <h3>{job.title}</h3>

                <span
                  className={`badge ${
                    job.type === 'Full-time'
                      ? 'fulltime'
                      : 'parttime'
                  }`}
                >
                  {job.type}
                </span>
              </div>

              <p className="company-name">{job.company}</p>

              <div className="job-card-footer">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
              </div>

              <button
                className="apply-btn"
                onClick={() =>
                  alert(
                    `Applying for ${job.title} at ${job.company}!`
                  )
                }
              >
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h2>No Jobs Found</h2>
            <p>Try searching with different keywords.</p>
          </div>
        )}
      </main>
    </div>
  );
}