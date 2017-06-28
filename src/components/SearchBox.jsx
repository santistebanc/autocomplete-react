import React from 'react';

export default (props) => (
  <div style={{ width: 'calc(100% - 8px)', height: '100%' }}>
    <input type="text" value={props.value} onChange={props.onChange} onBlur={props.onBlur} onFocus={props.onFocus}  onKeyDown={props.onKeyDown} style={{ width: '100%', height: '100%', padding: '8px 4px', border: 'solid 1px gray' }} />
  </div>
)