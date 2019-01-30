import React, { Component } from 'react'
import Book from '../book.component/book.component'
import { API } from '../../API'
import LogoutButton from '../logout-button.component/logout-button.component'
import './bookshelf.component.css'

// API = 'https://jsonplaceholder.typicode.com/todos'
export default class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerID: window.sessionStorage.getItem('user'),
      username: window.sessionStorage.getItem('user'),
      password: window.sessionStorage.getItem('password'),
      token: window.sessionStorage.getItem('auth-token'),
      books: []
    };
  }

  componentDidMount = () => {
    console.log('token: ' + window.sessionStorage.getItem('auth-token'))
    // const x = new Promise( window.sessionStorage.getItem('auth-token')).then(this.fetchBooks(this.state.customerID))
    this.fetchBooks(this.state.customerID)
  }

  addBook = () => {
    let bookName = document.getElementById('book-name').value
    let authorName = document.getElementById('book-author').value
    let newBook = {
      name: bookName,
      author: authorName
    }
    fetch(API, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(newBook), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        'username': this.state.username,
        'password': this.state.password,
        'auth-token': window.sessionStorage.getItem('auth-token'),
      }
    }).then(res => res.json())
      .then(response => {
        window.sessionStorage.setItem(this.props.match.params.id, JSON.stringify(newBook))
        this.fetchBooks(this.state.customerID)
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
      this.fetchBooks(this.state.customerID)
    })
      .catch(error => console.error('Error:', error));
  }

  fetchBooks = async () => {
    let newToken = window.sessionStorage.getItem('auth-token')
    await fetch(API, {
      method: 'GET',
      headers: {
        'username': this.state.username,
        'password': this.state.password,
        'auth-token': newToken
      }
    })
      .then((response) => {
        console.log(response)
        console.log(newToken)
        return response.json()
      })
      .then(
        data => {
          data.forEach(book => {
            localStorage.setItem(book.id, JSON.stringify(book))
          })
          this.setState({ books: data })
        }
      )
  }

  render() {
    console.log(this.state.books)
    let bookList = this.state.books.map(book => <Book id={book.id} name={book.name} author={book.author} deleteBook={this.deleteBook} />)
    let name = window.sessionStorage.getItem('user')
    return (
      <div>
        <div>
          <LogoutButton />
        </div>
        <div className="container">
          <h1>Welcome {name}</h1>
          <div className="book-input-form">
            <label className="med-width">Name</label>
            <input id="book-name" className="med-width"></input>
            <label className="med-width">Author</label>
            <input id="book-author" className="med-width"></input>
            <button onClick={() => this.addBook()}>Add Book</button>
          </div>
        </div>
        <div className="shelf">{bookList}</div>
      </div>
    )
  }
} 