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

export const createVote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'ADD',
    data: anecdote
  }
}

export const initializeAnecdote = anecdotes => {
  return {
    type: 'INIT_ANECDOTE',
    data: anecdotes
  }
}

export default reducer
