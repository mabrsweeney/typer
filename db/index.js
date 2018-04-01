const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'typer'
})

// SELECT id, sentence, difficulty, num_attempts FROM sentences WHERE id=${id};
// SELECT s.score, p.player_name FROM scores AS s JOIN players AS p ON s.pid=p.id WHERE s.sent_id=${id} ORDER BY CAST(sc.score AS unsigned) LIMIT 10;
const selectSentence = (id, callback) => {
  let challenge = {};
  connection.query(
    `SELECT id, sentence, difficulty, num_attempts FROM sentences WHERE id=${id}; `, 
    (err, results, fields) => {
    if(err) {
      callback(err, null);
    } else {
      challenge.sent_id = results[0].id;
      challenge.sentence = results[0].sentence;
      challenge.difficulty = results[0].difficulty;
      challenge.num_attempts = results[0].num_attempts;
      challenge.scores = [];
      connection.query(`SELECT s.score, p.player_name FROM scores AS s JOIN players AS p ON s.pid=p.id WHERE s.sent_id=${id} ORDER BY CAST(s.score AS unsigned) LIMIT 10;`,
      (scerr, scores, fields) => {
        if (scerr) {
            callback(null, challenge);
          } else {
            challenge.scores = scores;
            callback(null, challenge);
          }
        });
    }
  });
};

const insertTime = (score, callback) => {
  connection.query(`INSERT IGNORE INTO players (player_name) VALUES ("${score.player_name}");`, perr => {
    if(perr) {
      callback(perr);
    } else {
      connection.query(
        `INSERT INTO scores (score, pid, sent_id) SELECT "${score.score}" AS score, id as pid, ${score.sent_id} AS sent_id FROM players WHERE player_name="${score.player_name}";`, serr => {
            if (serr) {
              callback(serr);
            } else {
              callback(null);
            }
          }
        )
    }
  })
}

const insertSentence = (sentence, callback) => {
  connection.query(`INSERT INTO sentences (sentence, num_attempts, difficulty) VALUES ("${sentence}", 0, 0);`, (err) => {
    console.log(err);
    if (err){
     callback(err);
    } else {
      callback(null);
    } 
  })
}

module.exports.selectSentence = selectSentence;
module.exports.insertTime = insertTime;
module.exports.insertSentence = insertSentence;
