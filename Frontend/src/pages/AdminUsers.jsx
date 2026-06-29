import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Adjust endpoint to match your backend users directory route
      const res = await api.get('/admin/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to load user directory', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user account permanently?')) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert('Failed to delete user account.');
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin': return 'bg-rose-950/50 border-rose-800 text-rose-300';
      case 'Recruiter': return 'bg-indigo-950/50 border-indigo-800 text-indigo-300';
      default: return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  if (loading) return <div className="text-slate-400 p-6">Loading users directory...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Manage Users</h2>
        <p className="text-slate-400 text-sm mt-1">Directory containing all registered platform members.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-950/20 transition-colors">
                  <td className="p-4 font-medium text-white">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-800/60 text-xs px-3 py-1.5 rounded-xl font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}