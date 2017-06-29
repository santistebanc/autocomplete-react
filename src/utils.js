import countries from './countries.json';
import React from 'react';

const getMatchSubstringsAndScore = (str, query) => {
  let match = []
  let score = 0;
  let fromIndex = 0;
  while (fromIndex !== -1) {
    const ind = str.indexOf(query, fromIndex)
    if (ind !== -1) {
      score += (str.length - ind) * query.length / str.length;
      match.push({ length: query.length, offset: ind });
      fromIndex = ind + query.length;
    } else {
      break;
    }
  }
  return { match, score };
}

const localFetchPromise = (query) => new Promise((resolve, reject) => {
  let results = []
  if (query.length > 0) {
    countries.forEach(it => {
      const dbName = it.name.toLowerCase();
      const queryName = query.trim().toLowerCase();
      if (dbName.includes(queryName)) {
        const matchAndScore = getMatchSubstringsAndScore(dbName, queryName);
        results.push({ title: it.name, match: matchAndScore.match, score: matchAndScore.score })
      }
    });
  }
  resolve(results.sort((a, b) => b.score - a.score));
})

const googlePlacesFetchPromise = (query) => new Promise((resolve, reject) => {
  if (query.length == 0) return resolve([]);
  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions({ input: query.trim().toLowerCase() }, (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) return reject(status);
    return resolve(predictions.map(it => ({ title: it.description, match: it.matched_substrings })));
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
  let highlightedTitle = [];
  let pos = 0;
  data.match.forEach((m, i) => {
    highlightedTitle.push(<span key={i}>{data.title.slice(pos, m.offset)}</span>);
    highlightedTitle.push(<strong className="highlighted" key={i + "b"}>{data.title.slice(m.offset, m.offset + m.length)}</strong>);
    pos = m.offset + m.length;
  });
  highlightedTitle.push(<span key={"l"}>{data.title.slice(pos)}</span>);
  return highlightedTitle;
}

export { getMatchSubstringsAndScore, localFetchPromise, googlePlacesFetchPromise, scrollIntoViewIfNeeded, getHighlightedTitle }