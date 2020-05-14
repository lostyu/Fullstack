import React from 'react';

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.handleSearchChange} value={props.text} />
    </div>
  )
}

export default Filter;