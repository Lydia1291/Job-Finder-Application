CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

INSERT INTO users (first_name, last_name) VALUES ('Lydia', 'Test');

INSERT INTO jobs (external_id, title, company, location, salary, url)
VALUES
  ('test-1', 'Junior Developer', 'Tech Corp', 'Shrewsbury', '30000', 'https://example.com/1'),
  ('test-2', 'Web Developer', 'Example Co', 'Telford', '35000', 'https://example.com/2'),
  ('test-3', 'Software Engineer', 'Techify', 'Birmingham', '40000', 'https://example.com/3');