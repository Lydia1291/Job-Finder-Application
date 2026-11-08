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
          />
        ))}
    </div>
  );
}

export default App;