CREATE DATABASE IF NOT EXISTS typer;

USE typer;

CREATE TABLE IF NOT EXISTS sentences (id INT PRIMARY KEY, sentence VARCHAR(200));

CREATE TABLE IF NOT EXISTS players (id INT PRIMARY KEY, name VARCHAR(50));

CREATE TABLE  times (
  time VARCHAR(7), 
  pid INT, 
  sid INT, 
  FOREIGN KEY (sid) REFERENCES sentences(id), 
  FOREIGN KEY (pid) REFERENCES players(id)
);