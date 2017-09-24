import { Dispatch } from 'redux'

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds: any) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user: any) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message: any) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export interface Creds {
    username: string,
    password: string
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds: Creds) {
    let formData = new FormData()

    formData.append('username', creds.username)
    formData.append('password', creds.password)

    let config: RequestInit = {
        method: 'POST',
        /*headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },*/
        mode: 'cors',
        //body: `username=${creds.username}&password=${creds.password}`
        body: formData
    }

    return (dispatch: Dispatch<any>) => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds))

        return fetch('http://localhost:8080/sessions/create', config)
            .then(response => response.json()
                .then(json => ({ json, response }))
            ).then(({ json, response }) => {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginError(json.message))
                    return Promise.reject(json)
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', json.idToken)
                    localStorage.setItem('access_token', json.accessToken)
                    // Dispatch the success action
                    dispatch(receiveLogin(json))
                }
            }).catch(err => console.log("Error: ", err))
    }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Logs the user out
export function logoutUser() {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        dispatch(receiveLogout())
    }
}