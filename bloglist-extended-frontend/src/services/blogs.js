import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (newObject) => {
  const idUrl = baseUrl + `/${newObject.id}`
  const response = await axios.put(idUrl, newObject)
  return response.data
}

const remove = async (newObject) => {
  const idUrl = baseUrl + `/${newObject.id}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(idUrl, config)
  return response.data
}

const getComments = async (id) => {
  const idUrl = baseUrl + `/${id}/comments`
  const response = await axios.get(idUrl)
  return response.data
}

const createComm = async (newObject) => {
  const idUrl = baseUrl + `/${newObject.blog}/comments`
  const response = await axios.post(idUrl, newObject)
  return response.data
}

export default {
  getAll,
  setToken,
  create,
  like,
  remove,
  getComments,
  createComm,
}
