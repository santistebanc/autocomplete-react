import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>AutoComplete</h1>
        <input type="text" style={{padding: 10}}/>
      </div>);
  }
}