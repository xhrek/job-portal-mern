import { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function DashboardLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation links based on role
  const getLinks = () => {
    if (user?.role === 'Candidate') {
      return [
        { path: '/candidate/dashboard', label: 'Overview', icon: '📊' },
        { path: '/candidate/profile', label: 'My Profile', icon: '👤' },
        { path: '/candidate/saved-jobs', label: 'Saved Jobs', icon: 'saved' },
        { path: '/candidate/applications', label: 'My Applications', icon: '📋' },
      ];
    }
    if (user?.role === 'Recruiter') {
      return [
        { path: '/recruiter/dashboard', label: 'Overview', icon: '📊' },
        { path: '/recruiter/jobs', label: 'My Posted Jobs', icon: '💼' },
        { path: '/recruiter/jobs/create', label: 'Post New Job', icon: '➕' },
        { path: '/recruiter/companies', label: 'Companies', icon: '🏢' },
      ];
    }
    if (user?.role === 'Admin') {
      return [
        { path: '/admin/dashboard', label: 'Overview', icon: '📊' },
        { path: '/admin/users', label: 'Manage Users', icon: '👥' },
        { path: '/admin/companies', label: 'Manage Companies', icon: '🏢' },
      ];
    }
    return [];
  };

  const links = getLinks();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between p-4 md:p-6">
        <div className="space-y-8">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 hidden md:block">
            ApexSeek Portal
          </Link>

          {/* User Info */}
          <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-medium text-indigo-400 uppercase tracking-wider">{user?.role}</p>
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-slate-400 hover:bg-slate-950 hover:text-white'
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="pt-6 mt-6 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/20 transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 flex items-center justify-between">
          <span className="font-semibold text-slate-200 capitalize">{user?.role} Dashboard</span>
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">Back to Home</Link>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}