import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const item = state.find(obj => obj.id === action.data.id)
      const changedItem = { ...item, votes: item.votes + 1 }
      return state.map(s => (s.id !== action.data.id ? s : changedItem))
    case 'ADD':
      return [...state, action.data]
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const createVote = (id, newObject) => {
  return async dispatch => {
    await anecdoteService.update(id, newObject)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'ADD',
      data: anecdote
    })
  }
}

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export default reducer
