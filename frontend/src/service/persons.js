import axios from 'axios'
const baseUrl = '/api/persons'


const getAll = () => {
   const request = axios.get(baseUrl)
   return request.then(response => response.data)
}

const create = nameObject => {
   const request =  axios.post(baseUrl,nameObject)
   return request.then(response => response.data)
}


const doDelete = (id) => {
   const request = axios.delete(`${baseUrl}/${id}`)
   return request.then(response => response.data)
}

const update = (id, nameObject) => {
   const request = axios.put(`${baseUrl}/${id}`, nameObject)
   return request.then(response => response.data)
}


export default { getAll, create, doDelete, update}