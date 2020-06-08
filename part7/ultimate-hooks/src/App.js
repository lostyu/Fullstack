import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = ev => {
    setValue('')
  }

  return {
    props: {
      type,
      value,
      onChange
    },
    reset
  }
}

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }

    fetchData()
  }, [baseUrl])

  const create = async resource => {
    const { data } = await axios.post(baseUrl, resource)
    return data
  }

  const service = {
    create
  }

  return [resources, service]
}

const App = () => {
  const [_notes, noteService] = useResource('http://localhost:3005/notes')
  const [_persons, personService] = useResource('http://localhost:3005/persons')
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState([])

  useEffect(() => {
    setNotes(_notes)
    setPersons(_persons)
  }, [_notes, _persons])

  const handleNoteSubmit = async event => {
    event.preventDefault()
    const new_note = await noteService.create({ content: content.props.value })
    content.reset()
    setNotes(notes.concat(new_note))
  }

  const handlePersonSubmit = async event => {
    event.preventDefault()
    const newPerson = await personService.create({
      name: name.props.value,
      number: number.props.value
    })
    name.reset()
    number.reset()
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.props} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.props} /> <br />
        number <input {...number.props} />
        <button>create</button>
      </form>
      {persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
