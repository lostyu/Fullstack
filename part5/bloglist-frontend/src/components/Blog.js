import React, { useState } from 'react'
const Blog = ({ blog, addLike }) => {
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
    <div>
      <div style={blogStyle}>
        <p>{blog.title} <button onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button></p>
        <div style={show}>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={() => addLike(blog.id, blog)}>like</button></p>
          <p>{blog.author}</p>
        </div>

      </div>
    </div>
  )
}

export default Blog
