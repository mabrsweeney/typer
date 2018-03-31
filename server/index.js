const express = require('express');
const path = require('path');
const db = require('../db/index');
const app = express();
const port = 3000;

app.use('/challenge/:id', express.static(path.join(__dirname, '../client/public')));


//select s.sentence, t.time, p.name from sentences as s join times as t on t.sid=s.id join players as p on p.id=t.pid where p.id=8;
app.get('/', (req, res) => {
  res.status(200).redirect('/challenge/1');
});

app.get('/challenge/:id/sentence', (req, res) => {
  db.selectSentence(req.params.id, (err, result) => {
    if (err) res.sendStatus(500);
    res.send(result[0].sentence);
  })
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}...`);
})