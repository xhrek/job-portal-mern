import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ title, location });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-slate-900/80 backdrop-blur border border-slate-800 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-xl">
      <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800/50">
        <span className="text-slate-500">🔍</span>
        <input 
          type="text" 
          placeholder="Job title, keywords, or company" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-sm"
        />
      </div>
      
      <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800/50">
        <span className="text-slate-500">📍</span>
        <input 
          type="text" 
          placeholder="City, state, or remote" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-sm"
        />
      </div>

      <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm">
        Find Jobs
      </button>
    </form>
  );
}