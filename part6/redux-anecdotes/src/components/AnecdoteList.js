import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
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

const AnecdoteList = props => {
  // const dispatch = useDispatch()

  const vote = async anecdote => {
    const newObject = { ...anecdote, votes: anecdote.votes + 1 }
    // dispatch(createVote(anecdote.id, newObject))
    // dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
    props.createVote(anecdote.id, newObject)
    props.setNotification(`you voted ${anecdote.content}`, 5000)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => vote(anecdote)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(item => item.content.includes(state.filter)),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  createVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
