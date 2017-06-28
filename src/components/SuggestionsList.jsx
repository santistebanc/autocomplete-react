import React from 'react';
import Suggestion from './Suggestion.jsx';

export default ({ list = [], visible, onClickItem = () => { }, selectedIndex = -1 }) => (
  <div className={"suggestions-list"} style={{ width: '100%', position: 'absolute', top: 0 }}>
    {list.map((suggestion, i) => (
      <Suggestion key={i} select={selectedIndex == i} data={suggestion} onMouseDown={() => onClickItem(suggestion)} />
    ))}
  </div>
)
