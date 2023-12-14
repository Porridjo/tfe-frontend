import axios from "axios";

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://tfe-group10-dev.azurewebsites.net/tournees/' : 'http://localhost:5000/tournees/';

let token
let headers

const getAllRounds = () => {
    if (!token){
        token = JSON.parse(localStorage.getItem('user')).access_token
    }
    headers =  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const request = axios.get(baseUrl, headers)
    return request
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

const getOneRound = (roundName) => {
    if (!token){
        token = JSON.parse(localStorage.getItem('user')).access_token
    }
    headers =  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const request = axios.get(baseUrl.concat(`${roundName}`), headers)
    return request
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

const deleteOneRound = (roundName) => {
    if (!token){
        token = JSON.parse(localStorage.getItem('user')).access_token
    }
    headers =  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const request = axios.delete(baseUrl.concat(`${roundName}`), headers)
    return request
        .then(response => {
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

const createOneRound = (newRound) => {
    if (!token){
        token = JSON.parse(localStorage.getItem('user')).access_token
    }
    headers =  {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }
  const postHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      
    }
  }
  const request = axios.post(baseUrl, newRound, headers)
    return request
        .then(response => {
        })
        .catch(error => {
            console.log('fail :', error)
        })

}

export default { getAllRounds, getOneRound, deleteOneRound, createOneRound }