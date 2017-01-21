import { browserHistory } from 'react-router'

// const { id = null, username = null } = JSON.parse(localStorage.getItem('user'))

const initialState = {
  // loggedIn: id && username ? true : false,
  // userID: id,
  // username: username,
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
        userID: action.payload.userID,
        username: action.payload.username
      })
    case 'REGISTER_USER_FAIL':
      window.location.assign('/')
      return { ...state, error: action.error }
    case 'LOGIN_USER_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload))
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
      localStorage.setItem('user', JSON.stringify({ id: '', username: '' }))
      window.location.assign('/')

      return {
        ...state,
        loggedIn: false,
        userID: '',
        username: ''
      }
    case 'LOGOUT_USER_FAIL':
      return { ...state, error: action.error }
    case 'GET_USER_DASHBOARD_SUCCESS':
      return {
        ...state,
        dashboard: action.payload
      }
    case 'GET_USER_DASHBOARD_FAIL':
      return { ...state, dashboard: null }
    default:
      return state
  }
}

export default user
