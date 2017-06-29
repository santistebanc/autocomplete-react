import React from 'react';

export default (props) => (
  <div style={{ width: '100%', height: '100%' }}>
    <input type="text" value={props.value} onChange={props.onChange} onBlur={props.onBlur} onFocus={props.onFocus}  onKeyDown={props.onKeyDown} placeholder={props.placeholder} style={{ width: '100%', height: '100%', padding: '8px 8px', boxSizing: 'border-box' }} />
  </div>
)