import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  // const dispatch = useDispatch()

  const addAnecdote = async ev => {
    ev.preventDefault()
    const content = ev.target.content.value
    ev.target.content.value = ''

    // dispatch(createAnecdote(content))
    // dispatch(setNotification('you add success', 5000))

    props.createAnecdote(content)
    props.setNotification('you add success', 5000)
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

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
