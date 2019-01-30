import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './login.component.css'
import { getToken, refreshGetToken } from '../../API'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  authenticate = () => {
    let username = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value
    if (username !== "") {
      window.sessionStorage.setItem('user', username)
      window.sessionStorage.setItem('password', password)
      getToken(username, password).then(this.setState({redirect: true})) 
    }
  }

  render() {

    if (this.state.redirect) { 
      this.props.history.push('/bookshelf')
    }

    return (
      <div>
        <div className="login-form">
          <h1>Welcome</h1>
          <p className="big-font">Username</p>
          <input id="username-input"></input>
          <p className="big-font">Password</p>
          <input id="password-input"></input>
        </div>
        <div>
          <button className="button-med" onClick={() => this.authenticate()}>Login</button>
        </div>
      </div>

    )
  }
}
export default withRouter(Login)
