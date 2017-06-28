import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './styles.css';
import 'babel-polyfill'; //used to allow async/await syntax

ReactDOM.render(<App />, document.getElementById('root'));