import React from 'react';
import Complete from './Complete';
import axios from 'axios';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      running: false,
      start: this.props.start,
      done: false
    }
    this.tick = this.tick.bind(this);
    this.postScore = this.postScore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.running && nextProps.ready) {
      this.startTimer();
    }
    if (nextProps.done) {
      this.setState({done: true})
      clearInterval(this.timer);
    }
  }

  postScore(name) {    
    var elapsed = Math.round(this.state.elapsed / 100);
    var seconds = (elapsed / 10).toFixed(1);    
    axios.post('/challenge/time', {
      score: seconds,
      player_name: name,
      sent_id: this.props.sid
    }).then( response => console.log('Success!'))
    .catch( error => console.log('Error!'));
  }

  tick() {
    this.setState({
      elapsed: new Date() - this.state.start});
  }

  startTimer() {
    this.setState({running: true});
    this.timer = setInterval(this.tick, 99);
  }


  render() {
    var elapsed = Math.round(this.state.elapsed / 100);
    var seconds = (elapsed / 10).toFixed(1);    
    return (
      <div className="timer">
        <div>{seconds}</div>
        <Complete done={this.state.done} postScore={this.postScore}/>
      </div>
    );
  }
}