import React, { Component } from 'react'

let API = 'http://10.28.6.4:8080/book'
API = 'https://jsonplaceholder.typicode.com/todos'
export default class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount = () => {
    fetch(API, {
      method: 'GET', 
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'customer': 'bailin'
      }
    }).then((res) => {
      res = res.json()
      console.log(res)
    })
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))


      // .then(
      //   (result) => {
      //     console.log(result.items)
      //     this.setState({
      //       isLoaded: true,
      //       items: result.items
      //     });
      //   },
      //   (error) => {
      //     this.setState({
      //       isLoaded: true,
      //       error
      //     });
      //   }
      // )

  } 


  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>{this.state.items}</p> 
      </div>
    )
  }
} 