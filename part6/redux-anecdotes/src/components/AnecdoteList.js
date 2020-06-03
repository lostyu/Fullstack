import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { messageChange, messageDel } from '../reducers/notificationReducer'

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

  const vote = anecdote => {
    dispatch(createVote(anecdote.id))
    dispatch(messageChange(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(messageDel())
    }, 5000)
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
