import React from 'react';

const Scores = (props) => {
  return (<table><tbody><tr><th>Time</th><th>Player</th></tr>{props.scores.map((score, key) => {
    return (<tr key={key}><td>{score.score}</td><td>{score.player_name}</td></tr>);
  })}</tbody></table>)
}

export default Scores;
