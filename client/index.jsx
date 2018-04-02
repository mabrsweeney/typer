import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import TextLine from './components/TextLine';
import styles from './public/styles.css';

axios.get(`/challenge/${window.location.href.split('/')[4]}/sentence`).then((response) => {
  ReactDom.render(<TextLine textHighscores={response.data} />, document.getElementById('text-line'));
});
