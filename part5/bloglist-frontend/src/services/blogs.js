import axios from 'axios'
const baseUrl = '/api/blogs'

let token = window.localStorage.getItem('token') || null

const setToken = newToken => {
  token = `bearer ${newToken}`
  window.localStorage.setItem('token', token)
}

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)
  const { data } = await axios.post(baseUrl, blog, config)

  return data
}

const put = async (id, newBlog) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, newBlog)
  return data
}

const del = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}

export default { getAll, create, setToken, put, del }