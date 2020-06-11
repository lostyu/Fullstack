let timer = null

const notificationReducer = (state = { type: 'success' }, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data
    case 'CLEAR_MESSAGE':
      return {}
    default:
      return state
  }
}

export const setMessage = (message, type = 'success', timeout = 5000) => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        message,
        type
      }
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      })
    }, timeout)
  }
}

export const clearMessage = () => {
  return async dispatch => {
    clearTimeout(timer)
    dispatch({
      type: 'CLEAR_MESSAGE'
    })
  }
}

export default notificationReducer
