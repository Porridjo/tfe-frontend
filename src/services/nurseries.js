import axios from "axios";

const baseUrl = 'http://localhost:5000/creches/'

let token
let headers

const getOneNursery = (nurseryName) => {
    if (!token){
        token = JSON.parse(localStorage.getItem('user')).access_token
    }
    headers =  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const request = axios.get(baseUrl.concat(`${nurseryName}`), headers)
    return request
        .then(response => {
            console.log('promise for nursery fulfilled')
            return response.data
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

const updateNurseryStatut = (nurseryName, statut) => {
    if (!token){
        token = JSON.parse(localStorage.getItem('user')).access_token
    }
    headers =  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const request = axios.post(baseUrl.concat(`changerstatut/${nurseryName}`), statut, headers)
    return request
        .then(response => {
            console.log('promise for nursery fulfilled')
            return response.data
        })
        .catch(error => {
            console.log('fail :', error)
        })
}

export default { getOneNursery, updateNurseryStatut }