import axios from "axios"

const baseUrl = 'http://localhost:5000/articles/'

const token = JSON.parse(localStorage.getItem('user'))?.access_token;

const headers = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const getAllArticles = () => {
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

const addOneArticle = (article) => {
  const postHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    
  }
  const request = axios.post(baseUrl, article, postHeader)
  return request
      .then(response => {
          console.log('promise fulfilled')
          return response.data[0]
      })
      .catch(error => {
          console.log('fail :', error)
      })
}

const deleteOneArticle = (articleName) => {
  const request = axios.delete(baseUrl.concat(`${articleName}`), headers)
  return request
      .then(response => {
          console.log('promise fulfilled')
      })
      .catch(error => {
          console.log('fail :', error)
      })
}

export default { getAllArticles, addOneArticle, deleteOneArticle }