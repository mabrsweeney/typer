const faker = require('faker');
const fs = require('fs');

const getSentence = () => {
  return faker.lorem.sentence();
};
const getPlayer = () => {
  return faker.internet.userName();
};
const getTime = () => {
  let num = String(faker.random.number(99));
  num += `.${faker.random.number(99)}`
  return num;

};

//create 1000 sentences, 100 users, and 10000 times
let sentences = '';
for (let i = 1; i <= 1000; i++) {
  sentences += `${i}, ${getSentence()}\n`
}
fs.writeFile('./db/sentences.csv', sentences, (err) => {
  if (err) throw err;
  console.log('Sentences complete!');
});

let players = '';
for (let i = 1; i <= 100; i++) {
  players += `${i}, ${getPlayer()}\n`
}
fs.writeFile('./db/players.csv', players, (err) => {
  if (err) throw err;
  console.log('Players complete!');
});

let times = '';
for (let i = 1; i <= 10000; i++) {
  times += `${getTime()}, ${i % 100}, ${i % 1000}\n`
}
fs.writeFile('./db/times.csv', times, (err) => {
  if (err) throw err;
  console.log('Times complete!');
});
