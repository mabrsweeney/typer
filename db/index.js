const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'typer'
})

var selectSentence = function(id, callback) {
  connection.query(`SELECT sentence FROM sentences WHERE id = ${id};`, function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectSentence = selectSentence;
