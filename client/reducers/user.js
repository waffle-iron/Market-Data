const initialState = {
  createStatus: '',
  loggedIn: false,
  profileData: {}
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return Object.assign({}, state, {
        profileData: action.payload
      })
    case 'CREATE_USER':
      return Object.assign({}, state, {
        createStatus: action.payload || action.error
      })
    case 'LOGIN_USER':
      return {
        ...state,
        loggedIn: !state.loggedIn
      }
    case 'LOGOUT_USER':
      return state
    default:
      return state
  }
}

export default user
