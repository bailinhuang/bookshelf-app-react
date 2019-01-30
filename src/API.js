export const API = 'http://10.28.6.4:8080/v2/book'

export const TOKEN = 'http://10.28.6.4:8080/v2/user/login'

const TOKEN_REFRESH_INTERVAL = 200000
const TOKEN_REFRESH_URL = 'http://10.28.6.4:8080/v2/user/renew' 

export const register = () => {
  
}

export const getToken = async (newusername, newpassword) => { 
  console.log(newusername)
  console.log(newpassword)
  let newBody = {
    username: newusername,
    password: newpassword
  }
  await fetch(TOKEN, {
    method: 'POST', 
    body: JSON.stringify(newBody), 
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => { 
      console.log('Success:', JSON.stringify(response.token)) 
      sessionStorage.setItem('auth-token', response.token) 
      sessionStorage.setItem('timeout', Date.now() + TOKEN_REFRESH_INTERVAL)  
    })
    .catch(error => console.error('Error:', error))
}

export const refreshToken = () => {   
  fetch(TOKEN_REFRESH_URL, {
    method: 'POST',  
    headers: {
      'Content-Type': 'application/json',
      'auth-token': window.sessionStorage.getItem('auth-token')
    }
  }).then(res => res.json())
    .then(response => { 
      console.log('Success in refresh token:', JSON.stringify(response.token)) 
      window.sessionStorage.setItem('auth-token', response.token)  
    })
    .catch(error => console.error('Error in refresh token:', error))
}
