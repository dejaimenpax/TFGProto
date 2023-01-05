import axios from 'axios'

const baseUrl = '/api/exercises'

const getAll = () => {
  return axios.get(baseUrl)
}

const erase = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const exerciseService = {
    getAll,
    erase,
    create,
    update
}

export default exerciseService