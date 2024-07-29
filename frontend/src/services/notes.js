import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/notes'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const { data } = await axios.get(BASE_URL)
  return data
}

const create = async (note) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const { data } = await axios.post(BASE_URL, note, config)
  return data
}

const update = async (id, note) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const { data } = await axios.put(`${BASE_URL}/${id}`, note, config)
  return data
}

export default { getAll, create, update, setToken }
