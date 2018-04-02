import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Timer from './Timer';
import Scores from './Scores';
import Header from './Header';

export default class TextLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: '',
      incorrect: 0,
      next: '',
      ready: false,
      typeCount: 0,
      done: false,
      sent_id: 0,
      scores: [],
      difficulty: 0,
    };
    this.checkLetter = this.checkLetter.bind(this);
    this.checkListener = this.checkListener.bind(this);
  }

  componentDidMount() {
    // Set background color based on difficulty of challenge
    const TL = this;
    axios.get(`/challenge/${window.location.href.split('/')[4]}/sentence`)
      .then((response) => {
        console.log(response);
        const { data } = response;
        const { difficulty } = data;
        TL.setState({
          next: data.sentence,
          difficulty: data.difficulty,
          sent_id: data.sent_id,
          scores: data.scores,
        });


        window.addEventListener('keyup', TL.checkListener);
      }).catch((err) => { console.log(err); });
    if (this.state.difficulty >= 30) {
      $('body').addClass('hardbg');
    } else if (this.state.difficulty < 30 && this.state.difficulty >= 20) {
      $('body').addClass('mediumbg');
    } else {
      $('body').addClass('easybg');
    }
  }

  checkListener(event) {
    this.checkLetter(event.key);
  }

  checkLetter(key) {
    if (key === this.state.next[0]) {
      const addition = this.state.next[0];
      const count = this.state.typeCount + 1;
      const newNext = this.state.next.substr(1);
      this.setState({
        correct: this.state.correct + addition,
        next: newNext,
      });
      if (newNext.length === 0) {
        this.setState({
          done: true,
        });
        window.removeEventListener('keyup', this.checkListener);
      }
    } else if (key.length === 1) {
      this.setState({
        incorrect: this.state.incorrect + 1,
      });
    }
    if (this.state.typeCount === 0) {
      this.setState({
        ready: true,
      });
    }
    this.setState({ typeCount: this.state.typeCount + 1 });
  }

  render() {
    return (
      <div>
        <Header difficulty={this.state.difficulty} />
        <div className="text-line-container" >
          <div className="text-area">
            <pre className="tl correct">{this.state.correct}</pre>
            <pre className="tl next">{this.state.next}</pre>
          </div>
          <div className="info-container">
            <p> Mistakes: {this.state.incorrect}</p>
            <Timer
              sid={this.state.sent_id}
              start={Date.now()}
              ready={this.state.ready}
              done={this.state.done}
              saveTime={this.saveTime}
            />
          </div>
          <Scores className="scores" scores={this.state.scores} />
        </div>
      </div>
    );
  }
}
