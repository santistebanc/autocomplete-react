import React from 'react';

export default ({ data, onMouseDown = () => { } }) => (
  <div className={"suggestion-item"} onMouseDown ={onMouseDown}>{data}</div>
)