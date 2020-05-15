import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchText, setSearchText] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

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
      <Filter handleSearchChange={handleSearchChange} text={searchText} />
      <h3>Add a new</h3>
      <PersonForm handleChange={handleChange} handleSubmit={handleSubmit} handleNumChange={handleNumChange} newName={newName} newNum={newNum} />
      <h3>Numbers</h3>
      <Persons persons={personsFilter} />
    </div>
  )
}

export default App;