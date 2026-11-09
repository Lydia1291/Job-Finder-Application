// This file is what creates my database
// It creates three tables: users, jobs, and job_applications.


// The users table stores information about the users of the application, including their first and last names.
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


// The jobs table stores information about the jobs that are available,
// including their title, company, location, salary, and description.
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  external_id VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  location VARCHAR(255),
  salary VARCHAR(100),
  url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


// The job_applications table stores information about the jobs that users have saved or applied to.
// It has a composite primary key of user_id and job_id, which means that each user can only have one entry for each job.
CREATE TABLE job_applications (
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  status ENUM('saved','applied','interviewing','successful','declined')
    NOT NULL DEFAULT 'saved',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, job_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

// Insert a test user into the users table
// Later on, this will be replaced with a real user login system.
INSERT INTO users (first_name, last_name) VALUES ('Lydia', 'Test');

// Insert some test jobs into the jobs table
INSERT INTO jobs (external_id, title, company, location, salary, url)
VALUES
  ('test-1', 'Junior Developer', 'Tech Corp', 'Shrewsbury', '30000', 'https://example.com/1'),
  ('test-2', 'Web Developer', 'Example Co', 'Telford', '35000', 'https://example.com/2'),
  ('test-3', 'Software Engineer', 'Techify', 'Birmingham', '40000', 'https://example.com/3');