import countries from './countries.json';
import React from 'react';

const getMatchSubstrings = (str, query) => {
  //method to match a string against an input query
  let match = []
  let fromIndex = 0;
  while (fromIndex !== -1) {
    const ind = str.indexOf(query, fromIndex)
    if (ind !== -1) {
      match.push({ length: query.length, offset: ind });
      fromIndex = ind + query.length;
    } else {
      break;
    }
  }
  return match;
}

const matchQuery = (array, query) => {
  //match a given query against an array of strings and sort them by a score
  let results = []
  if (query.length > 0) {
    array.forEach(it => {
      const dbName = it.toLowerCase();
      const queryName = query.trim().toLowerCase();
      const ind = dbName.indexOf(queryName);
      if (ind !== -1) {
        const score = ind / queryName.length * dbName.length;
        results.push({ title: (it == undefined ? "" : it), matchList: getMatchSubstrings(dbName, queryName), score: score })
      }
    });
  }
  return results.sort((a, b) => a.score - b.score);
}

const localFetchFunction = (query) => {
  //function for fetching data from local countries.json data
  return matchQuery(countries.map(c => c.name), query)
}

const googlePlacesFetchPromise = (query) => new Promise((resolve, reject) => {
  //promise for fetching data from Google Places API
  if (query.length == 0) return resolve([]);
  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions({ input: query.trim().toLowerCase() }, (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) return reject(status);
    return resolve(predictions.map(it => ({ title: it.description, matchList: it.matched_substrings })));
  });
})

const scrollIntoViewIfNeeded = (element) => {
  //calculate if the selected item is inside the scrollview of the suggestions-list
  const topPosition = element.offsetTop - element.parentNode.scrollTop;
  const bottomPosition = element.offsetTop + element.clientHeight - element.parentNode.scrollTop;
  const maxPosition = element.parentNode.clientHeight;
  if (bottomPosition > maxPosition) {
    element.scrollIntoView(false);
  } else if (topPosition < 0) {
    element.scrollIntoView(true);
  }
}

const getHighlightedTitle = (data) => {
  //generates the text to display on suggestions with highlighted match substrings
  let highlightedTitle = [];
  let pos = 0;
  data.matchList.forEach((m, i) => {
    highlightedTitle.push(<span key={i}>{data.title.slice(pos, m.offset)}</span>);
    highlightedTitle.push(<strong className="highlighted" key={i + "b"}>{data.title.slice(m.offset, m.offset + m.length)}</strong>);
    pos = m.offset + m.length;
  });
  highlightedTitle.push(<span key={"l"}>{data.title.slice(pos)}</span>);
  return highlightedTitle;
}

export { getMatchSubstrings, matchQuery, localFetchFunction, googlePlacesFetchPromise, scrollIntoViewIfNeeded, getHighlightedTitle }