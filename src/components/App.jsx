import React from 'react';
import AutoComplete from './AutoComplete.jsx';
import countries from '../countries.json';

const localFetchPromise = (query) => new Promise((resolve, reject) => {
  resolve(countries.filter(it => it.name.toLowerCase().includes(query.trim().toLowerCase())));
})

export default class extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: 400, margin: 'auto' }}>
        <h1>AutoComplete</h1>
        <AutoComplete fetch={localFetchPromise} />
      </div>);
  }
}