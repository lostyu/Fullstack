import React from 'react';

const PersonForm = (props) => {
  const { handleChange, handleSubmit, handleNumChange, newName, newNum } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;