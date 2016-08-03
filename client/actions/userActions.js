import axios from 'axios'

const axiosConfig = {
    baseURL: 'http://localhost:8080/'
}

const userProfileSuccess = (payload) => {
    return { type: 'GET_USER', payload }
}

const userProfileFail = (error) => {
    return { type: 'GET_USER', error }
}

export const getUserProfile = (username) => {
    const endPoint = `/v1/user/${username}`

    return dispatch => {
        axios.get(endPoint, axiosConfig)
            .then(response => dispatch(userProfileSuccess(response.data)))
            .catch(error => dispatch(userProfileFail(error.data)))
    }
}

const createUserSuccess = (payload) => {
    return { type: 'CREATE_USER', payload }
}

const createUserFail = (error) => {
    return { type: 'CREATE_USER', error }
}

export const createUser = (userData) => {
    const endPoint = '/v1/user/create'

    return dispatch => {
        axios.post(endPoint, userData, axiosConfig)
            .then(response => dispatch(createUserSuccess(response.data)))
            .catch(error => dispatch(createUserFail(error.data)))
    }
}
