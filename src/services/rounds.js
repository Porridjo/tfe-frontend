import axios from "axios";

const baseUrl = 'http://localhost:5000/tournees'

const getAllRounds = () => {
    const request = axios.get(baseUrl)
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
    const request = axios.get(baseUrl.concat(`/${roundName}`))
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
    const request = axios.delete(baseUrl.concat(`/${roundName}`))
    return request
        .then(response => {
            console.log('promise fulfilled')
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

export default { getAllRounds, getOneRound, deleteOneRound }