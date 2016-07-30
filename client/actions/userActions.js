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
    return dispatch => {
        const endPoint = `/user/${username}`

        axios.get(endPoint, axiosConfig)
            .then(response => dispatch(userProfileSuccess(response.data)))
            .catch(error => dispatch(userProfileFail(error.data)))
    }
}
