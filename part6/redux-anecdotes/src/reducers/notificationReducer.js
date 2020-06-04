let timer = null

const notificationReducer = (state = null, action) => {
  console.log('message:', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, timeout = 5000) => {
  return async dispatch => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, timeout)

    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer
