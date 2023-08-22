import { toast } from 'react-toastify'
import * as api from '../api'

export const fetchAllUsers = () => async(dispatch) => {
    try {
        const {data} = await api.getAllUsers()
        dispatch({type: 'FETCH_USERS', payload: data})

    } catch (error) {
        toast.error('Error fetching users')
        console.log(error)
    }
}

export const updateProfile = (id, updateData) => async(dispatch) => {
    try {
        const {data} = await api.updateProfile(id, updateData)
        dispatch({type: 'UPDATE_CURRENT_USER', payload: data})
        toast.success('Profile updated successfully')
    } catch (error) {
        toast.error('Error updating profile')
        console.log(error)
    }
}