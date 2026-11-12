// a file to decide which page shows, the job search page or the saved jobs page.

import { Routes, Route, Link } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import SavedJobsPage from "./pages/SavedJobsPage";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">All Jobs</Link> | <Link to="/SavedJobs">See Saved Jobs</Link>
      </nav>

      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/SavedJobs" element={<SavedJobsPage />} />
      </Routes>
    </div>
  );
}

export default App;