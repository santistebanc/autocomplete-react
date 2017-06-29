import React from 'react';
import Suggestion from './Suggestion.jsx';

export default ({ list = [], visible, onClickItem = () => { }, selectedIndex = -1, highlightMatch = true }) => (
  <div className={"suggestions-list"} style={{ width: '100%', position: 'absolute', top: 0, boxSizing: 'border-box' }}>
    {list.map((suggestion, i) => (
      <Suggestion key={i} select={selectedIndex == i} data={suggestion} onMouseDown={() => onClickItem(suggestion)} highlightMatch={highlightMatch} />
    ))}
  </div>
)
