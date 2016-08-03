const initialState = {
    profileData: {},
    createStatus: ''
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
        default:
            return state
    }
}

export default user
