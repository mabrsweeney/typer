CREATE DATABASE IF NOT EXISTS typer;

USE typer;

DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS sentences;
DROP TABLE IF EXISTS players;

CREATE TABLE sentences (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  sentence VARCHAR(400),
  num_attempts INT,
  difficulty INT
);

CREATE TABLE players (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  player_name VARCHAR(50) UNIQUE
);

CREATE TABLE scores (
  score FLOAT(4,2), 
  pid INT, 
  sent_id INT, 
  FOREIGN KEY (sent_id) REFERENCES sentences(id), 
  FOREIGN KEY (pid) REFERENCES players(id)
);