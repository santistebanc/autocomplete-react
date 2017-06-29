import React from 'react';

export default (props) => (
  <div style={{ width: '100%', height: '100%' }}>
    <input type="text" {...props} style={{ width: '100%', height: '100%', padding: '8px 8px', boxSizing: 'border-box' }} />
  </div>
)