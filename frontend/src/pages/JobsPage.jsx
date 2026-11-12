// This page 1
// This page shows the results of the job search, and allows the user to save jobs to their saved jobs list.
import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";

function JobsPage() {
  // our 2 arrays, one for the jobs, and one for the error message if there is one.
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  // fetching the jobs from the backend, and setting the jobs array to the data we get back.
  useEffect(() => {
    fetch("http://localhost:8080/jobs.php")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(() => setError("Could not load jobs"));
  }, []);

  // when the user clicks the save button, we send a POST request to save.php with the job id and the new saved status.
  function toggleSave(job) {
    const newSaved = !job.saved;

    // send the job id and new saved status to the backend to save it in the database.
    // sends it as a JSON so that the backend can read it since we are using React that expects JSON to be sent and received.
    fetch("http://localhost:8080/save.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: job.id, saved: newSaved }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setJobs(
        // the map function goes through the jobs array and updates the saved status of the job that was clicked, 
        // and returns a new array with the updated job.
          jobs.map((j) => (j.id === job.id ? { ...j, saved: newSaved } : j))
        );
      })
      .catch(() => setError("Could not save job"));
  }

  // the JSX that renders the page, it shows the error message if there is one, 
  // and maps through the jobs array to show a JobCard for each job.
  return (
    <div>
      <h1>Job Tracker</h1>
      <p> Here, you can see the jobs within the database </p>
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
       <p> Eventually, there will be a search bar here </p>
    </div>
  );
}

export default JobsPage;