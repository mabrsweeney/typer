USE typer;

LOAD DATA LOCAL INFILE '/Users/matthewsweeney/typer/db/players.csv' INTO TABLE players LINES TERMINATED BY '\n' (player_name);
LOAD DATA LOCAL INFILE '/Users/matthewsweeney/typer/db/sentences.csv' INTO TABLE sentences COLUMNS TERMINATED BY ',' LINES TERMINATED BY '\n' (sentence, num_attempts, difficulty);
LOAD DATA LOCAL INFILE '/Users/matthewsweeney/typer/db/scores.csv' INTO TABLE scores COLUMNS TERMINATED BY ',' LINES TERMINATED BY '\n' (score, pid, sent_id);

DELIMITER ;;
DROP PROCEDURE IF EXISTS updateWeights;
CREATE PROCEDURE updateWeights()
  BEGIN
    DECLARE counts INT DEFAULT 1;
    DECLARE attempted INT DEFAULT 1;
    DECLARE sumTotal FLOAT(5,2) DEFAULT 0.0;
    update_weights: WHILE counts <= 1000 DO
      SET attempted = (SELECT count(score) FROM scores WHERE sent_id=counts);
      SET sumTotal = (SELECT sum(score) FROM scores WHERE sent_id=counts);
      UPDATE sentences SET num_attempts = attempted, difficulty = (sumTotal / attempted) WHERE id=counts;
      SET counts = (counts + 1);
    END WHILE update_weights;
  END;;
DELIMITER ;
CALL updateWeights();