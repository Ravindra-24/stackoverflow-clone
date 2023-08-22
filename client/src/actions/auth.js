import { toast } from 'react-toastify'
import * as api from '../api'
import { setCurrentUser } from './currentUser'

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(authData)
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
        toast.success('Signed up successfully')
        navigate('/')
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.logIn(authData)
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
        toast.success('Logged in successfully')
        navigate('/')
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
}