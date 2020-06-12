import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import userService from '../services/users'
import { Table } from 'react-bootstrap'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(res => {
      setUsers(res)
    })
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
