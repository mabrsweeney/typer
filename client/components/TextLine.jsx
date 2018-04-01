import React from 'react';
import Timer from './Timer';
import Scores from './Scores';
import Header from './Header';
import $ from 'jquery';

export default class TextLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: '',
      incorrect: 0,
      next: this.props.textHighscores[0].sentence,
      complete: '',
      ready: false,
      typeCount: 0,
      done: false,
      time: 0,
    }
    this.checkLetter = this.checkLetter.bind(this);
  }

  componentDidMount() {

    //Set background color based on difficulty of challenge
    const difficulty = this.props.textHighscores[0].difficulty;
    if (difficulty >= 30) {
      $('body').addClass('hardbg');
    } else if (difficulty < 30 && difficulty >= 20){
      $('body').addClass('mediumbg');
    } else {
      $('body').addClass('easybg');
    }

    const TL = this;
    document.body.addEventListener('keyup', function(event) {
      TL.checkLetter(event.key);
    });
  }


  checkLetter(key) {
    if (key === this.state.next[0] ) {
      const addition = this.state.next[0];
      const count = this.state.typeCount + 1;
      const newNext = this.state.next.substr(1);
      this.setState({
        correct: this.state.correct + addition,
        next: newNext
      })

      if (newNext.length === 0) {
        this.setState({
          complete: 'Complete!',
          done: true
        });
      }
    } else if(key.length === 1){
      this.setState({
        incorrect: this.state.incorrect + 1,
      });
    }
    if (this.state.typeCount === 0) {
      this.setState({
        ready: true
      });
    }
    this.setState({typeCount: this.state.typeCount+1});
  }

  render() {
    return (
      <div>
        <Header difficulty={this.props.textHighscores[0].difficulty}/>
        <div className="text-line-container" >
          <div className="text-area">
            <pre className="tl correct">{this.state.correct}</pre>
            <pre className="tl next">{this.state.next}</pre>
          </div>
          <p> Mistakes: {this.state.incorrect}</p>
          <Timer sid={this.props.textHighscores[0].id} start={Date.now()} ready={this.state.ready} done={this.state.done} saveTime={this.saveTime}/>
          <Scores className="scores" scores={this.props.textHighscores} />
        </div>
      </div>
    );
  }
}