import React, { useState, useEffect } from 'react';

import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  const hook = () => {
    personService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }

  useEffect(hook, [])

  const handleSubmit = (ev) => {

    ev.preventDefault()

    if (!check()) {
      return false;
    }

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const p = persons.find((person => person.name === newName))
        const changePerson = { ...p, number: newNum }

        personService
          .update(p.id, changePerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== p.id ? person : response))
            setNewName('')
            setNewNum('')

            setType('success')
            setMessage(`update ${changePerson.name} number is ${changePerson.number}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)

          })

        return false;
      } else {
        return false;
      }
    }

    const _newPerson = {
      name: newName,
      number: newNum
    }

    personService
      .create(_newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')

        setType('success')
        setMessage(`Added ${_newPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
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

    return true;
  }

  const handleDel = (id) => {
    const p = persons.find((person => person.id === id))
    if (window.confirm(`Delete ${p.name}?`)) {
      personService.del_person(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))

        setType('success')
        setMessage(`删除${p.name}成功`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)


      }).catch(error => {

        setPersons(persons.filter(p => p.id !== id))

        setType('error')
        setMessage(`未找到id为${p.name}的数据`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      })
    }

  }

  const personsFilter = persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter handleSearchChange={handleSearchChange} text={searchText} />
      <h3>Add a new</h3>
      <PersonForm handleChange={handleChange} handleSubmit={handleSubmit} handleNumChange={handleNumChange} newName={newName} newNum={newNum} />
      <h3>Numbers</h3>
      <Persons persons={personsFilter} handleDel={handleDel} />
    </div>
  )
}

export default App;