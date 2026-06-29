import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {/* The Outlet renders whatever child route is currently active */}
        <Outlet />
      </main>
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} ApexSeek Job Portal. All rights reserved.
      </footer>
    </div>
  );
}