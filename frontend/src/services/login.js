import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/login'

const login = async (credentials) => {
  const { data } = await axios.post(BASE_URL, credentials)
  return data
}

export default { login }
