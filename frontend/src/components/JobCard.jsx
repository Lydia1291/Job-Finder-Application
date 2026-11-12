// This file creates the jobcard that we are going to be showing the results of the job search on 
// It takes in the title, company, location, saved status, 
// and calls save.php to save the job to the database when the save button is clicked.

function JobCard({ title, company, location, saved, onToggleSave }) {
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p>{company}</p>
      <p>{location}</p>
      <button onClick={onToggleSave}>{saved ? "Saved" : "Save"}</button>
    </div>
  );
}

export default JobCard;