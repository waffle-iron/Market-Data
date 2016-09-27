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

const loginUserSuccess = (payload) => {
    return { type: 'LOGIN_USER', payload }
}

const loginUserFail = (error) => {
    return { type: 'LOGIN_USER', error }
}

export const loginUser = (userData) => {
    const endPoind = '/v1/user/login'

    return dispatch => {
        axios.post(endPoint, userData, axiosConfig)
            .then(response => dispatch(loginUserSuccess(response.data)))
            .catch(error => dispatch(loginUserFail(error.data)))
    }
}

export const getPortfolio = () => {
    const endPoint = `/v1/user/portfolio`

    return dispatch => {
        // To be finished
    }
}
