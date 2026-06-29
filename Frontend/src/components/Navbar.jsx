import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Removed 'Route' from here
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          ApexSeek
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/jobs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Find Jobs
          </Link>
          
          {user ? (
            <div className="flex items-center gap-6">
              {/* --- CANDIDATE ONLY LINKS --- */}
              {user.role === 'Candidate' && (
                <>
                  <Link to="/candidate/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/my-applications" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Applied Jobs
                  </Link>
                  <Link to="/saved-jobs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Saved Jobs
                  </Link>
                </>
              )}

              {/* --- RECRUITER ONLY LINKS --- */}
              {user.role === 'Recruiter' && (
                <>
                  {/* Fixed: Swapped <Route> for <Link> */}
                  <Link to="/recruiter/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/recruiter/jobs/create" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Post a Job
                  </Link>
                  <Link to="/recruiter/companies" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Companies
                  </Link>
                </>
              )}

              {/* --- ADMIN ONLY LINKS --- */}
              {user.role === 'Admin' && (
                <>
                  <Link to="/admin/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Admin Panel
                  </Link>
                  <Link to="/admin/users" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Manage Users
                  </Link>
                </>
              )}

              {/* Shared Profile Link */}
              <Link to="/profile" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors border-l border-slate-800 pl-4">
                👤 Profile
              </Link>

              <button 
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2 px-4 rounded-lg transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log in
              </Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}