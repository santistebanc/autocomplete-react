import React from 'react';
import AutoComplete from './AutoComplete.jsx';
import countries from '../countries.json';

const localFetchPromise = (query) => new Promise((resolve, reject) => {
  const results = countries.filter(it => it.name.toLowerCase().includes(query.trim().toLowerCase()));
  resolve(results.map(it => it.name));
})

const googlePlacesFetchPromise = (query) => new Promise((resolve, reject) => {
  if (query.length == 0) return resolve([]);
  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions({ input: query.trim().toLowerCase() }, (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) return reject(status);
    return resolve(predictions.map(it => it.description));
  });
})

export default class extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: 400, margin: 'auto' }}>
        <h1>AutoComplete</h1>
        <h4>Countries from Local JSON File</h4>
        <AutoComplete fetch={localFetchPromise} />
        <br />
        <h4>Google Places API</h4>
        <AutoComplete fetch={googlePlacesFetchPromise} />
      </div>);
  }
}