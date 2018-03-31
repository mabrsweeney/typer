const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'typer'
})

//select s.sentence, t.time, p.name from sentences as s join times as t on t.sid=s.id join players as p on p.id=t.pid where p.id=8;
const selectSentence = (id, callback) => {
  connection.query(
    `SELECT s.id, s.sentence, sc.score, p.player_name FROM sentences AS s JOIN scores AS sc ON sc.sent_id=s.id JOIN players AS p ON p.id=sc.pid WHERE s.id=${id} ORDER BY CAST(sc.score AS unsigned);`, 
    (err, results, fields) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
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

module.exports.selectSentence = selectSentence;
module.exports.insertTime = insertTime;
