import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";

function App() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/jobs.php")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(() => setError("Could not load jobs"));
  }, []);

  function toggleSave(job) {
    const newSaved = !job.saved;

    fetch("http://localhost:8080/save.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: job.id, saved: newSaved }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setJobs(
          jobs.map((j) => (j.id === job.id ? { ...j, saved: newSaved } : j))
        );
      })
      .catch(() => setError("Could not save job"));
  }

  return (
    <div>
      <h1>Job Tracker</h1>
      {error && <p>{error}</p>}
      {Array.isArray(jobs) &&
        jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            saved={job.saved}
            onToggleSave={() => toggleSave(job)}
          />
        ))}
    </div>
  );
}

export default App;