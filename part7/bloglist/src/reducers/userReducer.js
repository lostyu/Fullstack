import blogService from '../services/blogs'

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.data
    case 'REMOVE_USER':
      return initialState
    default:
      return state
  }
}

export const addUser = user => {
  return async dispatch => {
    try {
      dispatch({
        type: 'ADD_USER',
        data: user
      })
    } catch (error) {
      console.log(error)
    }
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    await blogService.setToken(user.token)
  }
}

export const removeUser = () => {
  window.localStorage.removeItem('loggedUser')
  return async dispatch => {
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

export default userReducer
