import React from 'react';
import Suggestion from './Suggestion.jsx';

export default ({ list = [], visible, onSelect = () => { } }) => (
  <div className={"suggestions-list"} style={{ width: '100%', position: 'absolute', top: 0 }}>
    {list.map((suggestion, i) => (
      <Suggestion data={suggestion} key={i} onMouseDown={() => onSelect(suggestion)} />
    ))}
  </div>
)
