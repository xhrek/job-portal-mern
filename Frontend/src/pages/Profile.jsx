import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setProfileData(res.data);
      } catch (err) {
        console.error('Failed to fetch profile details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="text-slate-400 p-6">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-start border-b border-slate-800 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{profileData?.name || user?.name}</h2>
            <p className="text-slate-400 text-sm mt-0.5">{profileData?.email || user?.email}</p>
          </div>
          <Link 
            to="/candidate/profile/edit" 
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-400 tracking-wider uppercase mb-2">Professional Headline</h3>
            <p className="text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              {profileData?.profile?.headline || 'No professional headline added yet.'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-400 tracking-wider uppercase mb-2">Skills</h3>
            {profileData?.profile?.skills && profileData.profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profileData.profile.skills.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1.5 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 text-sm italic">No skills listed.</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-400 tracking-wider uppercase mb-2">Uploaded Resume</h3>
            {profileData?.profile?.resumeUrl ? (
              <a 
                href={profileData.profile.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-indigo-400 px-5 py-3 rounded-xl text-sm font-medium transition-all"
              >
                📄 View / Download Resume
              </a>
            ) : (
              <p className="text-slate-500 text-sm italic">No resume PDF uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}