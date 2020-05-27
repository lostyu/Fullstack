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

export default { getAll, create, setToken }