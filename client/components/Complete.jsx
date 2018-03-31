import React from 'react';

export default class Complete extends React.Component {
  constructor(props) {
    super(props)
    this.state ={name: ''};
    this.updateName = this.updateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateName(e) {
    e.preventDefault();
    this.setState({ name: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.postScore(this.state.name);
  }

  render() {
    if(this.props.done) {
      return (
        <div>
          <h1>Complete!</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" name="name" placeholder="Enter Player Name..." onChange={e => this.updateName(e)}/>
            <input type="submit" />
          </form>
        </div>);
    } else {
      return null;
    }
  }
}