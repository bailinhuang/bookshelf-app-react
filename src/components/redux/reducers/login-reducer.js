const initialState = {
  username: '',
  password: '',
  customer: '',
  token: ''
}

const LOGIN = "LOGIN"
const REFRESH = "REFRESH"
const LOGOUT = "LOGOUT"

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      
      return Object.assign(
        {},
        state, {
          token: 'action.username'
        });
    case LOGOUT:
      return Object.assign(
        {},
        state, {
          username: ""
        });
    default:
      return state
  }
}