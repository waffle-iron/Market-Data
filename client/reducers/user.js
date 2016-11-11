import { browserHistory } from 'react-router'

const initialState = {
  loggedIn: false,
  userID: '',
  username: '',
  profileData: {},
  error: ''
}

const user = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GET_USER':
      return Object.assign({}, state, {
        profileData: action.payload
      })
    case 'REGISTER_USER_SUCCESS':
      window.location.assign('/#/dashboard')
      return Object.assign({}, state, {
        username: action.payload.username
      })
    case 'REGISTER_USER_FAIL':
      window.location.assign('/')
      return { ...state, error: action.error }
    case 'LOGIN_USER_SUCCESS':
      window.location.assign('/#/dashboard')
      return {
        ...state,
        userID: action.payload.id,
        username: action.payload.username
      }
    case 'LOGIN_USER_FAIL':
      window.location.assign('/')
      return { ...state, error: action.error }
    case 'LOGOUT_USER':
      return {
        ...state,
        userID: '',
        username: ''
      }
    default:
      return state
  }
}

export default user
