function JobCard({ title, company }) {
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>{company}</p>
    </div>
  );
}

export default JobCard;