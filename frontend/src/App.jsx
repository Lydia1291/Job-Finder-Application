// This file is the main entry point for the React application. 
// It fetches job data from the backend and displays it using the JobCard component. 
// It also handles saving and unsaving jobs by sending requests to the backend.


// Importing React hooks and the JobCard component
import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";

// This is the main App component that fetches job data and displays it.
function App() {
  // useState is something that allows us to store data in a component and update it when needed.
  // Whats happening here is that we are creating a state variable called jobs and a function called setJobs that allows us to update the jobs variable.
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  // This is grabbing the jobs from jobs.php and setting the jobs state variable to the data that is returned.
  useEffect(() => {
    // this is a fetch request to the backend to get the jobs from the database.
    // It is using the fetch API to make a GET request to the jobs.php file. 
    // The response is then converted to JSON and set to the jobs state variable.
    // If there is an error, it sets the error state variable to a message.
    fetch("http://localhost:8080/jobs.php")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch(() => setError("Could not load jobs"));
  }, []);

  // This function is called when the user clicks the save button on a job card.
  // It sends a POST request to the save.php file with the job ID and whether the job is being saved or unsaved.
  // What then happens is that save.php will update the database and return a response.
  // If the response is ok, it updates the jobs state variable to reflect the change. 
  // If there is an error, it sets the error state variable to a message.
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

  // This is the JSX that is rendered to the screen.
  // This tells the page what it should look like 
  // On each card, it passes the title, company, location, saved status, and the toggleSave function to call when a button is clicked.

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