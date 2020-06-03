const notificationReducer = (state = null, action) => {
  console.log('message:', action)
  switch (action.type) {
    case 'MESSAGE':
      return action.message
    case 'DEL_MESSAGE':
      return null
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

export const messageDel = () => {
  return {
    type: 'DEL_MESSAGE'
  }
}

export default notificationReducer
