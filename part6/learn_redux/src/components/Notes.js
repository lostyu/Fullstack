import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services//notes'

const Note = ({ note, handleClidk }) => {
  return (
    <li key={note.id} onClick={handleClidk}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const toggleImportant = async note => {
    const newNote = { ...note, important: !note.important }
    await noteService.update(note.id, newNote)
    dispatch(toggleImportanceOf(note.id))
  }

  return (
    <ul>
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          handleClidk={() => toggleImportant(note)}
        />
      ))}
    </ul>
  )
}

export default Notes
