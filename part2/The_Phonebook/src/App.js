import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (ev) => {

    ev.preventDefault()

    if (!checkPersonName()) {
      return false;
    }

    const _newPerson = {
      name: newName
    }
    setPersons(persons.concat(_newPerson))
    setNewName('')
  }

  const handleChange = (ev) => {
    setNewName(ev.target.value)
  }

  const checkPersonName = () => {
    if (newName === '') {
      return false;
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return false;
    }

    return true;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  )
}

export default App;