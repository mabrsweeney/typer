const express = require('express');
const path = require('path');
const db = require('../db/index');
const bp = require('body-parser');

const app = express();
const port = 3000;

app.use(bp.json());

app.use('/challenge/:id', express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
  res.status(200).redirect('/challenge/1');
});

app.get('/challenge/:id/sentence', (req, res) => {
  db.selectSentence(req.params.id, (err, result) => {
    if (err) res.sendStatus(501);
    res.send(result);
  })
});

app.post('/challenge/time', (req, res) => {
  db.insertTime(req.body, err => {
    if (err) {
      res.sendStatus(502)
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}...`);
})