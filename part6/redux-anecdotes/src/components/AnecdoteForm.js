import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { messageChange, messageDel } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async ev => {
    ev.preventDefault()
    const content = ev.target.content.value
    ev.target.content.value = ''

    const createNew = await anecdoteService.create(content)

    dispatch(createAnecdote(createNew))
    dispatch(messageChange('you add success'))
    setTimeout(() => {
      dispatch(messageDel())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
