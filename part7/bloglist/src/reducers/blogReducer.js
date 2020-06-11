import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'LIKE':
      return state.map(item =>
        item.id === action.data.id ? action.data : item
      )
    case 'REMOVE':
      return state.filter(item => item.id !== action.data)
    default:
      return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const initBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const addLike = (id, blog) => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    delete newBlog.id
    const result = await blogService.put(id, newBlog)
    dispatch({
      type: 'LIKE',
      data: result
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.del(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export default blogReducer
