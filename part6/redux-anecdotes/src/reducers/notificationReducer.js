const notificationReducer = (state = 'success', action) => {
  console.log('message:', action)
  switch (action.type) {
    case 'MESSAGE':
      return action.message
    default:
      return state
  }
}

export const messageChange = message => {
  return {
    type: 'MESSAGE',
    message
  }
}

export default notificationReducer
