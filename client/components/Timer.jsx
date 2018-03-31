import React from 'react';
import ReactDom from 'react-dom';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      running: false,
      start: this.props.start
    }
    this.tick = this.tick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.running && nextProps.ready) {
      this.startTimer();
    }
    if (nextProps.done) {
      clearInterval(this.timer);
    }
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
    return (<div>{seconds}</div>);
  }
}