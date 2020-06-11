import React, { useState } from 'react'
const Blog = ({ blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const show = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div className="testDiv2">
      <div style={blogStyle}>
        <p>
          {blog.title}{' '}
          <button onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button>
        </p>
        <div className="testHide" style={show}>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button className="testBtn" onClick={addLike}>
              like
            </button>
          </p>
          <p>{blog.author}</p>

          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
