const initialState = {
  createStatus: '',
  loggedIn: false,
  profileData: {}
}

const user = (state = initialState, action) => {
  console.log(action)
  if (action.error) return ({ ...state, error: action.error })

  switch (action.type) {
    case 'GET_USER':
      return Object.assign({}, state, {
        profileData: action.payload
      })
    case 'CREATE_USER':
      return Object.assign({}, state, {
        createStatus: action.payload
      })
    case 'LOGIN_USER':
      return {
        ...state,
        loggedIn: true
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        loggedIn: false
      }
    default:
      return state
  }
}

export default user
