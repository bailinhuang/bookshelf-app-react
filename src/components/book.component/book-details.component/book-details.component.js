import React from 'react'
import { withRouter } from "react-router-dom"
import { API } from '../../../API'
// import LogoutButton from '../../../login-page/logout-button/logoutButton';

class BookDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      author: ""
    }
  }

  componentDidMount = () => {
    let book = JSON.parse(localStorage.getItem(this.props.match.params.id))
    this.setState({
      name: book.name,
      author: book.author
    })

  }

  editBook = () => {
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
        'customer': 'bailin'
      }
    }).then(res => res.json())
      .then(response => {
        localStorage.setItem(this.props.match.params.id, JSON.stringify(data))
        this.setState({
          name: bookName,
          author: authorName
        })
        console.log('Success:', JSON.stringify(response))
      })
      .catch(error => console.error('Error:', error));
  }

  render() { 
    return (
      <div>
        <div>
          <h1>Details</h1>
        </div>
        <h2>{this.state.name}</h2>
        <h3>{this.state.author}</h3>
        <div className="details-container">
        </div>
        <div>
          <label>Name</label>
          <input id="input-name"></input>
          <label>Author</label>
          <input id="input-author"></input>
          <button onClick={() => this.editBook()}>Edit Book</button>
        </div>
        <div>
          <button onClick={() => {
            this.props.history.push('/bookshelf')
            this.props.deleteBook(this.props.match.params.id)
          }}>Delete</button>
        </div>
      </div>
    )
  }
}


export default withRouter(BookDetails)