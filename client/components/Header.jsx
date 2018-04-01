import React from 'react';
import axios from 'axios';

const setBG = (difficulty) => {
  if (difficulty >= 30) {
    return 'hard-header';
  } else if (difficulty < 30 && difficulty >= 20){
    return 'medium-header';
  } 
  return 'easy-header';
}

const submitChallenge = () => {
  const newChallenge = prompt(
    `Enter a new challenge:
  (Max length: 500 characters)`);
  axios.post('/submit/challenge', {challenge: newChallenge})
  .then(response => console.log('Success'))
  .catch(err => console.log('Error'));
}

const Header = (props) => {
  return (<div className={`header ${setBG(props.difficulty)}`}>
  <h1 className="title">Typer Challenge</h1>
  <button className="link-button" onClick={submitChallenge}>Create A Challenge</button>
  <a className="link-button" href={`http://localhost:3000/challenge/${Math.floor(Math.random() * 1000)}`}>Random Challenge</a>
  </div>)
}

export default Header;