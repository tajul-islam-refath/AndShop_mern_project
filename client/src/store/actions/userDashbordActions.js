import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {
    LOAD_USER_SUCCESS,
    // User dashbords types
    GET_USER_DASHBORD_INFO_REQUEST,
    GET_USER_DASHBORD_INFO_SUCCESS,
    GET_USER_DASHBORD_INFO_FAIL,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,
    GET_USER_ADDRESSES_REQUEST,
    GET_USER_ADDRESSES_SUCCESS,
    GET_USER_ADDRESSES_FAIL,
    DASHBORD_RESET,
    DASHBORD_CLEAR_ERRORS

} from '../Types/userTypes'


export const getUserIfno = () => async(dispatch) => {
    try {
        dispatch({ type: GET_USER_INFO_REQUEST })

        const { data } = await axios.get("/api/user/me")
        dispatch({
            type: GET_USER_INFO_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: GET_USER_INFO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update profile
export const updateProfile = (userData) => async(dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_INFO_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('/api/user/me/update', userData, config)

        const user = jwt_decode(data.token)

        dispatch({
            type: UPDATE_USER_INFO_SUCCESS,
            payload: user
        })

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: user
        })


        window.localStorage.removeItem("token")
        window.localStorage.setItem("token", JSON.stringify(data.token))

    } catch (error) {

        dispatch({
            type: UPDATE_USER_INFO_FAIL,
            payload: error.response.data.message ?
                error.response.data.message : error.response.data.errors
        })
    }
}

export const dashbordClearError = () => dispatch => {
    dispatch({ type: DASHBORD_CLEAR_ERRORS })
}