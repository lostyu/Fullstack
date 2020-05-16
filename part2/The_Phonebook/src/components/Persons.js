import React from 'react';

const Persons = (props) => {
  return (
    <>
      {
        props.persons.map(person => (
          <p key={person.id}>{person.name} - {person.number} <button onClick={() => props.handleDel(person.id)}>delete</button></p>
        ))
      }
    </>
  )
}

export default Persons;