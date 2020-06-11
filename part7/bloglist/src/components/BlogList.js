import React, { useEffect } from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initBlog, addLike, removeBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initBlog())
  }, [dispatch])

  const handleLike = (id, blog) => {
    dispatch(addLike(id, blog))
    dispatch(setMessage(`add like ${blog.title}`))
  }

  const handleRemove = id => {
    if (window.confirm('delete?')) {
      dispatch(removeBlog(id))
      dispatch(setMessage('delete success'))
    }
  }

  const items = () => {
    return blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => handleLike(blog.id, blog)}
          removeBlog={() => handleRemove(blog.id)}
        />
      ))
  }

  return <div>{items()}</div>
}

export default BlogList
