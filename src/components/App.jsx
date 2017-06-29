import React from 'react';
import AutoComplete from './AutoComplete.jsx';
import { localFetchFunction, googlePlacesFetchPromise } from '../utils.js';

export default class extends React.Component {
  state = { localSubmitMessage: "", googleSubmitMessage: "" }
  handleLocalSubmit = (text) => {
    this.setState({ localSubmitMessage: <span className="submit-message">show results for: <i>{text}</i></span> })
  }
  handleGoogleSubmit = (text) => {
    this.setState({ googleSubmitMessage: <span className="submit-message">show results for: <i>{text}</i></span> })
  }
  render() {
    return (
      <div>
        <section className="header">
          <h1>AutoComplete</h1>
        </section>
        <section className="content">
          <div className="panel">
            <h4>Colors from static Array</h4>
            <AutoComplete data={['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown']} placeholder="type the name of a color" />
            <br />
            <br />
            <h4>Countries from Local JSON File</h4>
            <AutoComplete data={localFetchFunction} placeholder="type the name of a country" onSubmit={this.handleLocalSubmit} />
            {this.state.localSubmitMessage}
            <br />
            <br />
            <h4>Google Places API</h4>
            <AutoComplete data={googlePlacesFetchPromise} placeholder="type the name of a place" onSubmit={this.handleGoogleSubmit} />
            {this.state.googleSubmitMessage}
            <br />
          </div>
        </section>
        <section className="footer">
          <p><a href="http://santistebanc.tk/">by Carlos Santisteban</a></p>
        </section>
      </div>);
  }
}