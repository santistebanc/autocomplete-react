import React from 'react';
import AutoComplete from './AutoComplete.jsx';
import { localFetchPromise, googlePlacesFetchPromise} from '../utils.js';

export default class extends React.Component {
  render() {
    return (
      <div>
        <section className="header">
          <h1>AutoComplete</h1>
        </section>
        <section className="content">
          <div className="panel">
            <h4>Countries from Local JSON File</h4>
            <AutoComplete fetch={localFetchPromise} placeholder="type name of a country" />
            <br />
            <h4>Google Places API</h4>
            <AutoComplete fetch={googlePlacesFetchPromise} placeholder="type name of a place" />
          </div>
        </section>
        <section className="footer">
          <p>by Carlos Santisteban</p>
        </section>
      </div>);
  }
}