import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);

      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async () => {
    try {
      const res = await API.post(
        "/applications/apply",
        {
          jobId: job._id,
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Application Failed"
      );
    }
  };

  if (!job) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{job.title}</h1>

      <p>
        <strong>Company:</strong> {job.company}
      </p>

      <p>
        <strong>Location:</strong> {job.location}
      </p>

      <p>
        <strong>Salary:</strong> ₹
        {job.salary?.toLocaleString()}
      </p>

      <p>
        <strong>Description:</strong>
      </p>

      <p>{job.description}</p>

      <br />

      <button onClick={applyJob}>
        Apply Now
      </button>

      <button
        style={{ marginLeft: "10px" }}
      >
        Save Job
      </button>
    </div>
  );
}

export default JobDetails;