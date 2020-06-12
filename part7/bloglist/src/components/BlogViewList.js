import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import blogService from '../services/blogs'

const BlogViewList = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(res => {
      setBlogs(res)
    })
  }, [])

  return (
    <table className="table">
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BlogViewList
