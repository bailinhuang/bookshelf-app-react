import React from 'react' 
import { withRouter } from "react-router-dom";
import './logout-button.component.css'

class LogoutButton extends React.Component {
  render() {

    const logout = () => {
      window.sessionStorage.setItem('user', null)
      this.props.history.push('/') 
    }

    return (
      <div className="button-container">
        <button onClick={() => logout()
        }>Logout</button>
      </div>
    )
  }
}
 
export default withRouter(LogoutButton)