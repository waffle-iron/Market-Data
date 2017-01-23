import { browserHistory } from 'react-router'

const initialState = {
  dashboard: {},
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
      localStorage.setItem('user', JSON.stringify(action.payload))
      window.location.assign('/#/dashboard')

      return Object.assign({}, state, {
        loggedIn: true,
        userID: action.payload.userID,
        username: action.payload.username
      })
    case 'REGISTER_USER_FAIL':
      window.location.assign('/')
      return { ...state, error: action.error }
    case 'LOGIN_USER_SUCCESS':
      window.location.assign('/#/dashboard')

      return {
        ...state,
        loggedIn: true,
        userID: action.payload.id,
        username: action.payload.username
      }
    case 'LOGIN_USER_FAIL':
      window.location.assign('/')
      return { ...state, error: action.error }
    case 'LOGOUT_USER_SUCCESS':
      window.location.assign('/')

      return {
        ...state,
        loggedIn: false,
        userID: '',
        username: ''
      }
    case 'LOGOUT_USER_FAIL':
      return { ...state, error: action.error }
    case 'USER_AUTH_SUCCESS':
      return { ...state, loggedIn: true }
    case 'USER_AUTH_FAIL':
      return { ...state, loggedIn: false }
    case 'GET_USER_DASHBOARD_SUCCESS':
      return {
        ...state,
        dashboard: action.payload
      }
    case 'GET_USER_DASHBOARD_FAIL':
      return { ...state, loggedIn: false }
    default:
      return state
  }
}

export default user
