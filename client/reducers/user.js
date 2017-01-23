import { browserHistory } from 'react-router'

const initialState = {
  dashboard: {},
  loggedIn: false,
  username: '',
  profileData: {},
  error: ''
}

const user = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GET_USER':
      return { profileData: action.payload }
    case 'REGISTER_USER_SUCCESS':
      window.location.assign('/#/dashboard')
      return { ...state, loggedIn: true, username: action.payload.username }
    case 'REGISTER_USER_FAIL':
      window.location.assign('/')
      return { ...state, error: action.error }
    case 'LOGIN_USER_SUCCESS':
      window.location.assign('/#/dashboard')
      return { ...state, loggedIn: true, username: action.payload.username }
    case 'LOGIN_USER_FAIL':
      window.location.assign('/')
      return { ...state, error: action.error }
    case 'LOGOUT_USER_SUCCESS':
      window.location.assign('/')
      return { ...state, loggedIn: false, username: '' }
    case 'LOGOUT_USER_FAIL':
      return { ...state, error: action.error }
    case 'USER_AUTH_SUCCESS':
      return { ...state, loggedIn: true }
    case 'USER_AUTH_FAIL':
      return { ...state, loggedIn: false }
    case 'GET_USER_DASHBOARD_SUCCESS':
      return { ...state, dashboard: action.payload }
    case 'GET_USER_DASHBOARD_FAIL':
      return { ...state, loggedIn: false }
    default:
      return state
  }
}

export default user
