import JobCard from "./components/JobCard";

function App() {
  return (
    <div>
      <h1>Job Tracker</h1>
      <JobCard title="Junior Developer" company="Acme Ltd" />
      <JobCard title="Web Developer" company="Example Co" />
    </div>
  );
}

export default App;