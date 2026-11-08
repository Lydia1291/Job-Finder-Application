function JobCard({ title, company, location, saved, onToggleSave }) {
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>{company}</p>
      <p>{location}</p>
      <button onClick={onToggleSave}>{saved ? "Saved ✓" : "Save"}</button>
    </div>
  );
}

export default JobCard;