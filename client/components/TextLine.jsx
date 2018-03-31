import React from 'react';
import ReactDom from 'react-dom';
import Timer from './Timer';
export default class TextLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: '',
      incorrect: 0,
      next: this.props.text.substr(1),
      complete: '',
      ready: false,
      typeCount: 0,
      done: false
    }
    this.checkLetter = this.checkLetter.bind(this);
  }

  componentDidMount() {
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
      <div className="text-line-container" >
        <div className="text-area">
          <pre className="tl correct">{this.state.correct}</pre>
          <pre className="tl next">{this.state.next}</pre>
        </div>
        <p> Mistakes: {this.state.incorrect}</p>
        <Timer start={Date.now()} ready={this.state.ready} done={this.state.done}/>
        <div>{this.state.complete}</div>
      </div>
    );
  }
}