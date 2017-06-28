import React from 'react';

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

export default ({ data, onMouseDown = () => { }, select = false }) => (
  <div ref={node => { if (node && select) scrollIntoViewIfNeeded(node) }} className={"suggestion-item " + (select ? "selected" : "")} onMouseDown={onMouseDown}>{data}</div>
)