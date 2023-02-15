import * as api from '../api'

export const fetchAllUsers = () => async(dispatch) => {
    try {
        const {data} = await api.getAllUsers()
        dispatch({type: 'FETCH_USERS', payload: data})
    } catch (error) {
        console.log(error)
    }
}