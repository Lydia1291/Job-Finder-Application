import { useState } from "react";

function JobCard({ title, company, location }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>{company}</p>
      <p>{location}</p>
      <button onClick={() => setSaved(!saved)}>
        {saved ? "Saved ✓" : "Save"}
      </button>
    </div>
  );
}

export default JobCard;