import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const BlogViewList = ({ blogs }) => {
  // const [blogs, setBlogs] = useState([])

  // useEffect(() => {
  //   blogService.getAll().then(res => {
  //     setBlogs(res)
  //   })
  // }, [])

  return (
    <Table striped bordered hover>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default BlogViewList
