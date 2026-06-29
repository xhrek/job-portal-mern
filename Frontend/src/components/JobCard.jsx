import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start gap-4 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors">
              {job.title}
            </h3>

            <p className="text-sm font-medium text-indigo-400">
              {job.company?.name || job.companyName || "Company Name"}
            </p>
          </div>

          <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-medium border border-slate-700">
            {job.jobType || "Full-Time"}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            📍 {job.location || "Remote"}
          </span>

          {job.salary && (
            <span className="flex items-center gap-1">
              💰{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(job.salary)}
            </span>
          )}
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2">
          {job.description || "No description provided for this role."}
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
        <Link
          to={`/jobs/${job._id}`}
          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-center text-slate-200 text-sm font-medium rounded-xl transition-colors"
        >
          View Details
        </Link>

        <Link
          to={`/jobs/${job._id}`}
          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-center text-white text-sm font-medium rounded-xl transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}