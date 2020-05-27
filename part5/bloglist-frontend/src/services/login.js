import axios from 'axios'
const baseUrl = '/api/login'

// jay 1111
const login = async credential => {
  const response = await axios.post(baseUrl, credential)
  return response.data
}

export default { login }