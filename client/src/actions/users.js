import { toast } from 'react-toastify'
import * as api from '../api'
import { setCurrentUser } from './currentUser'

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
        const storedProfile = JSON.parse(localStorage.getItem("profile"));
        if (storedProfile?.result?._id === id) {
            const updatedProfile = {
                ...storedProfile,
                result: {
                    ...storedProfile.result,
                    ...data,
                },
            };
            localStorage.setItem("profile", JSON.stringify(updatedProfile));
            dispatch(setCurrentUser(updatedProfile));
        }
        toast.success('Profile updated successfully')
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Error updating profile')
        console.log(error)
    }
}
