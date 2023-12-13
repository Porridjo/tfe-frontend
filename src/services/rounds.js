import axios from "axios";

const baseUrl = 'http://localhost:5000/tournees/'

const token = localStorage.getItem('user');

const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const getAllRounds = () => {
    const request = axios.get(baseUrl, headers)
    return request
        .then(response => {
            console.log('promise fulfilled')
            return response.data
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

const getOneRound = (roundName) => {
    const request = axios.get(baseUrl.concat(`${roundName}`), headers)
    return request
        .then(response => {
            console.log('promise for round fulfilled')
            console.log('data recieved : ', response.data)
            return response.data
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

const deleteOneRound = (roundName) => {
    const request = axios.delete(baseUrl.concat(`${roundName}`), headers)
    return request
        .then(response => {
            console.log('promise fulfilled')
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

export default { getAllRounds, getOneRound, deleteOneRound }