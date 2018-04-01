const faker = require('faker');
const fs = require('fs');

const getSentence = () => {
  return faker.lorem.sentence();
};
const getPlayer = () => {
  return faker.internet.userName();
};
const getScore = () => {
  let num = String(faker.random.number({min:1, max:60}));
  num += `.${faker.random.number({min:1, max:99})}`
  return num;

};

// (id INT PRIMARY KEY AUTO_INCREMENT, sentence VARCHAR(400),num_attempts INT,difficulty INT)
let sentences = '';
for (let i = 1; i <= 1000; i++) {
  sentences += `${getSentence()},0,0\n`
}
fs.writeFile('./db/sentences.csv', sentences, (err) => {
  if (err) throw err;
  console.log('Sentences complete!');
});

// (id INT PRIMARY KEY AUTO_INCREMENT, player_name VARCHAR(50) UNIQUE)
let players = '';
for (let i = 1; i <= 100; i++) {
  players += `${getPlayer()}\n`
}
fs.writeFile('./db/players.csv', players, (err) => {
  if (err) throw err;
  console.log('Players complete!');
});

// (score VARCHAR(6), pid INT, sent_id INT)
let scores = '';
for (let i = 1; i <= 10000; i++) {
  scores += `${getScore()},${faker.random.number({min:1, max:100})},${faker.random.number({min:1, max:1000})}\n`
}
fs.writeFile('./db/scores.csv', scores, (err) => {
  if (err) throw err;
  console.log('Scores complete!');
});
