import React, { useState } from 'react';

const Search = (props) => {

  return (
    <div>
      filter shown with <input onChange={props.handleSearchChange} value={props.text} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchText, setSearchText] = useState('')

  const handleSubmit = (ev) => {

    ev.preventDefault()

    if (!check()) {
      return false;
    }

    const _newPerson = {
      name: newName,
      number: newNum
    }
    setPersons(persons.concat(_newPerson))
    setNewName('')
    setNewNum('')
  }

  const handleChange = (ev) => {
    setNewName(ev.target.value)
  }

  const handleNumChange = ev => {
    setNewNum(ev.target.value)
  }

  const handleSearchChange = ev => {
    setSearchText(ev.target.value)
  }

  const check = () => {
    if (newName === '') {
      return false;
    }

    if (newNum === '') {
      return false;
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return false;
    }



    return true;
  }


  const personsFilter = persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} text={searchText} />
      <h2>Add a new</h2>
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
      <h2>Numbers</h2>
      {personsFilter.map(person => (
        <p key={person.name}>{person.name} - {person.number}</p>
      ))}
    </div>
  )
}

export default App;