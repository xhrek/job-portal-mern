import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

const CandidateLayout = () => {
  // Navigation Links specific to Candidate view
  const candidateLinks = [
    { name: 'Dashboard', path: '/candidate/dashboard' },
    { name: 'Browse Jobs', path: '/candidate/jobs' },
    { name: 'My Applications', path: '/candidate/applications' },
    { name: 'Profile Settings', path: '/candidate/profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar links={candidateLinks} role="Candidate" />
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <main className="p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;