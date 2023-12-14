import axios from "axios";

const baseUrl = 'http://localhost:5000/creches/'

let token
let headers

const getOneNursery = (nurseryName) => {
    token = JSON.parse(localStorage.getItem('user'))?.access_token
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

const updateNursery = (nurseryName, newArticles) => {

    const resultObject = {
        articles: {}
    };

    newArticles.forEach(element => {
        resultObject.articles[element.name] = element.quantity;
    });

    token = JSON.parse(localStorage.getItem('user'))?.access_token
    headers =  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const request = axios.post(baseUrl.concat(`${nurseryName}`), resultObject, headers)
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
    token = JSON.parse(localStorage.getItem('user'))?.access_token
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

export default { getOneNursery, updateNursery, updateNurseryStatut }