import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services//notes'

const Note = ({ note, handleClidk }) => {
  return (
    <li key={note.id} onClick={handleClidk}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = props => {
  console.log(props)
  // const dispatch = useDispatch()
  // const notes = useSelector(({ filter, notes }) => {
  //   if (filter === 'ALL') {
  //     return notes
  //   }
  //   return filter === 'IMPORTANT'
  //     ? notes.filter(note => note.important)
  //     : notes.filter(note => !note.important)
  // })

  // const notesToShow = () => {}

  // const toggleImportant = async note => {
  //   const newNote = { ...note, important: !note.important }
  //   await noteService.update(note.id, newNote)
  //   dispatch(toggleImportanceOf(note.id))
  // }

  const toggleImportant = async note => {
    const newNote = { ...note, important: !note.important }
    await noteService.update(note.id, newNote)
    props.toggleImportanceOf(note.id)
  }

  return (
    <ul>
      {props.notes.map(note => (
        <Note
          key={note.id}
          note={note}
          handleClidk={() => toggleImportant(note)}
        />
      ))}
    </ul>
  )
}

const mapStateToProps = state => {
  if (state.filter === 'ALL') {
    return { notes: state.notes }
  }
  return {
    notes:
      state.filter === 'IMPORTANT'
        ? state.notes.filter(note => note.important)
        : state.notes.filter(note => !note.important)
  }
}

const mapDispatchToProps = {
  toggleImportanceOf
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)

export default ConnectedNotes
