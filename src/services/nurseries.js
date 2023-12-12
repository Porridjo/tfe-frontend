import axios from "axios";

const baseUrl = 'http://localhost:5000/creches'

const getOneNursery = (nurseryName) => {
    const request = axios.get(baseUrl.concat(`/${nurseryName}`))
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
    const request = axios.post(baseUrl.concat(`/changerstatut/${nurseryName}`), statut)
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