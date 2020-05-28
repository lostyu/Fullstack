import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
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

    createBlog(blog)
    setBlog(defaultBlog)
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={blog.title}
            name="title"
            onChange={updateField}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blog.author}
            name="author"
            onChange={updateField}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blog.url}
            name="url"
            onChange={updateField}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm