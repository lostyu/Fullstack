import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const NewBlogForm = ({ refProps }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const defaultBlog = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(defaultBlog)

  const updateField = ev => {
    setBlog({
      ...blog,
      [ev.target.name]: ev.target.value
    })
  }

  const handleCreate = ev => {
    ev.preventDefault()

    dispatch(createBlog(blog))
    setBlog(defaultBlog)
    refProps.current.toggleVisible()

    dispatch(setMessage(`a new blog added! by ${user.username}`))
  }

  return (
    <div className="testDiv">
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={blog.title}
            name="title"
            onChange={updateField}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={blog.author}
            name="author"
            onChange={updateField}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={blog.url}
            name="url"
            onChange={updateField}
          />
        </div>
        <button id="test-btn" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
