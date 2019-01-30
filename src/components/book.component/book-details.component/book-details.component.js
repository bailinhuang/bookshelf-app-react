import React from 'react'
import { withRouter } from "react-router-dom"
import './book-details.component.css'
import { API } from '../../../API'
import LogoutButton from '../../logout-button.component/logout-button.component';

class BookDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: sessionStorage.getItem('auth-token')
    }
  }

  componentDidMount = () => {
    let token = sessionStorage.getItem('auth-token')
    if (token === null) {
      console.log(token)
      this.props.history.push('/')
    }
    else {
      let book = JSON.parse(localStorage.getItem(this.props.match.params.id))
      this.setState({
        name: book.name,
        author: book.author
      })
    }
  }

  editBook = () => {
    console.log(window.sessionStorage.getItem('auth-token'))
    let bookName = document.getElementById('input-name').value
    if (bookName === "") {
      bookName = this.state.name
    }
    let authorName = document.getElementById('input-author').value
    if (authorName === "") {
      authorName = this.state.author
    }
    let data = {
      name: bookName,
      author: authorName,
      id: this.props.match.params.id
    }
    fetch(API + '/' + this.props.match.params.id, {
      method: 'PUT',
      body: JSON.stringify({
        name: bookName,
        author: authorName,
        id: this.props.match.params.id
      }),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': window.sessionStorage.getItem('auth-token'),
      }
    }).then(res => res.json())
      .then(response => {
        window.sessionStorage.setItem(this.props.match.params.id, JSON.stringify(data))
        this.setState({
          name: bookName,
          author: authorName
        })
        console.log('Success:', JSON.stringify(response))
      })
      .catch(error => console.error('Error:', error));
  }


  deleteBook = (id) => {
    fetch(API + '/' + id, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'customer': this.state.customerID
      }
    }).then(response => {
      console.log(response)
    })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div>
        <LogoutButton />
        <div className="details-container">
          <h1>Details</h1>
          <h2>{this.state.name}</h2>
          <h3>{this.state.author}</h3>
          <div className="details-container">
          </div>
          <div className="input-form">
            <label>Name</label>
            <input id="input-name"></input>
            <label>Author</label>
            <input id="input-author"></input>
            <button onClick={() => this.editBook()}>Edit Book</button>
          </div>
          <div>
            {/* <button onClick={() => {
            this.props.history.push('/bookshelf')
            this.deleteBook(this.props.match.params.id)
          }}>Delete</button> */}
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(BookDetails)