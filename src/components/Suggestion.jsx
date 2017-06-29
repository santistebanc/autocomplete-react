import React from 'react';
import { scrollIntoViewIfNeeded, getHighlightedTitle } from '../utils.js';

export default ({ data, onMouseDown = () => { }, select = false }) => (
  <div ref={node => { if (node && select) scrollIntoViewIfNeeded(node) }} className={"suggestion-item " + (select ? "selected" : "")} onMouseDown={onMouseDown}>{getHighlightedTitle(data)}</div>
)