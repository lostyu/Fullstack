import React, { useState } from 'react'
const Blog = ({ blog, user, addLike, removeBlog }) => {
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

  const delBtn = () => {
    if (blog.user) {
      if (blog.user.id === user.id) {
        return <button onClick={() => removeBlog(blog.id)}>remove</button>
      } else {
        return null
      }
    }
  }

  return (
    <div className="testDiv">
      <div style={blogStyle}>
        <p>{blog.title} <button onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button></p>
        <div className="testHide" style={show}>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button className="testBtn" onClick={() => addLike(blog.id, blog)}>like</button></p>
          <p>{blog.author}</p>
          {delBtn()}
        </div>

      </div>
    </div>
  )
}

export default Blog
