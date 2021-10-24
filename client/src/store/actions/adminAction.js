import axios from "axios"

import {
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_ERRORS_CLEAR
} from "../Types/adminTypes"



// create category
export const createCategory = (formData) => async(dispatch) => {
    try {

        dispatch({ type: CATEGORY_CREATE_REQUEST })

        const { data } = await axios.post("/api/category/create-category", formData)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response.data.message
        })
    }
}
export const categoryErrorsClear = () => dispatch => {
    dispatch({ type: CATEGORY_ERRORS_CLEAR })
}