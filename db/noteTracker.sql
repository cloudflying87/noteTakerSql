DROP DATABASE IF EXISTS notetracker_db;
CREATE DATABASE notetracker_db;
USE notetracker_db;

CREATE TABLE notes(
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  text VARCHAR(500),
  PRIMARY KEY (id)
);

INSERT INTO notes (title,text) VALUES ('Create Database','Step 1 in the process of building on the note tracker'),('Note 2','Creating some notes to test with')