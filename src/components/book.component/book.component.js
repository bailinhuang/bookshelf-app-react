import React, { Component } from 'react' 
import './book.component.css'
import { withRouter } from "react-router-dom"

class Book extends Component {

  redirectDetails = () => {
    let url = '/book-details/' + this.props.id
    this.props.history.push(url)
  }

  render() { 
    console.log(this.props)
    return (
      <div className="container-counter">
        <h3>{this.props.name}</h3> 
        <h4>{this.props.author}</h4>
        <button onClick={() => this.redirectDetails()}>Details</button>
        <button onClick={() => this.props.deleteBook(this.props.id)}>Delete</button>
      </div>
    )
  }
}

export default withRouter(Book) 