import axios from "axios"

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://tfe-group10-dev.azurewebsites.net/articles/' : 'http://localhost:5000/articles/';

let token
let headers

const getAllArticles = () => {
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

const addOneArticle = (article) => {
  if (!token){
    token = JSON.parse(localStorage.getItem('user')).access_token
  }
  const postHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    
  }
  const request = axios.post(baseUrl, article, postHeader)
  return request
      .then(response => {
          return response.data[0]
      })
      .catch(error => {
          console.log('fail :', error)
      })
}

const deleteOneArticle = (articleName) => {
  if (!token){
    token = JSON.parse(localStorage.getItem('user')).access_token
  }
  headers =  {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const request = axios.delete(baseUrl.concat(`${articleName}`), headers)
  return request
      .then(response => {
      })
      .catch(error => {
          console.log('fail :', error)
      })
}

export default { getAllArticles, addOneArticle, deleteOneArticle }