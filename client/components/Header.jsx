import React from 'react';

const Header = () => {
  return (<div className="header">
  <h1 className="title">Typer Challenge</h1>
  <a className="link-button">Create A Challenge</a>
  <a className="link-button" href={`http://localhost:3000/challenge/${Math.floor(Math.random() * 1000)}`}>Random Challenge</a>
  </div>)
}

export default Header;