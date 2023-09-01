import { toast } from 'react-toastify'
import * as api from '../api'
import { setCurrentUser } from './currentUser'

export const signup = (authData, navigate,setProgress, setLoading) => async (dispatch) => {
    try {
        setProgress(40)
        const {data} = await api.signUp(authData)
        setProgress(60)
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
        setProgress(80)
        toast.success('Signed up successfully')
        setProgress(100)
        navigate('/')
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
        setProgress(100)
    }finally{
        setLoading(false)
    }
}

export const login = (authData, navigate,setProgress, serLoading) => async (dispatch) => {
    try {
        setProgress(40)
        const {data} = await api.logIn(authData)
        setProgress(60)
        dispatch({type:'AUTH', data})
        setProgress(80)
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
        setProgress(100)
        toast.success('Logged in successfully')
        navigate('/')
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
        setProgress(100)
    }finally{
        serLoading(false)
    }
}