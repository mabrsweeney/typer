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

//create 1000 sentences, 100 users, and 10000 times
let sentences = '';
for (let i = 1; i <= 1000; i++) {
  sentences += `${getSentence()}\n`
}
fs.writeFile('./db/sentences.csv', sentences, (err) => {
  if (err) throw err;
  console.log('Sentences complete!');
});

let players = '';
for (let i = 1; i <= 100; i++) {
  players += `${getPlayer()}\n`
}
fs.writeFile('./db/players.csv', players, (err) => {
  if (err) throw err;
  console.log('Players complete!');
});
let scores = '';
for (let i = 1; i <= 10000; i++) {
  scores += `${getScore()},${faker.random.number({min:1, max:100})},${faker.random.number({min:1, max:1000})}\n`
}
fs.writeFile('./db/scores.csv', scores, (err) => {
  if (err) throw err;
  console.log('Scores complete!');
});
