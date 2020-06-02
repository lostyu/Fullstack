import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => {
    return state.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(createVote(id))
  }

  const addAnecdote = ev => {
    ev.preventDefault()
    const content = ev.target.content.value
    ev.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App
