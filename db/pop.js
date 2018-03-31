use typer;
LOAD DATA LOCAL INFILE '/Users/matthewsweeney/typer/db/players.csv' INTO TABLE players LINES TERMINATED BY '\n' (player_name);
LOAD DATA LOCAL INFILE '/Users/matthewsweeney/typer/db/sentences.csv' INTO TABLE sentences LINES TERMINATED BY '\n' (sentence);
LOAD DATA LOCAL INFILE '/Users/matthewsweeney/typer/db/scores.csv' INTO TABLE scores COLUMNS TERMINATED BY ',' LINES TERMINATED BY '\n' (score, pid, sent_id);