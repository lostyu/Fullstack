import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(item => item.content.includes(filter))
  })
  const dispatch = useDispatch()

  const vote = async anecdote => {
    const newObject = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(createVote(anecdote.id, newObject))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => vote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
