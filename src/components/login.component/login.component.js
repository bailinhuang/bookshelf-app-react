import React, { Component } from 'react' 
import { withRouter } from "react-router-dom";
import './login.component.css' 

class Login extends Component {

  render() {
    let authenticate = () => {
      let username = document.getElementById("username-input").value
      console.log(username)
      if (username !== "") {  
        window.sessionStorage.setItem('user', username) 
        this.props.history.push('/bookshelf') 
      }
    }

    return (
      <div>
        <div className="login-form">
          <h1>Welcome</h1>
          <p className="big-font">Enter your username</p>
          <input id="username-input"></input>
        </div>
        <div>
          <button className="button-med" onClick={() => authenticate()}>Login</button>
        </div>
      </div>

    )
  }
} 
export default withRouter(Login)
 