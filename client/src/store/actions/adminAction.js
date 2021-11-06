import axios from "axios"

import {
    CATEGORY_GET_REQUEST,
    CATEGORY_GET_SUCCESS,
    CATEGORY_GET_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_ERRORS_CLEAR
} from "../Types/adminTypes"


// get all categorys
export const getAllCategory = () => async(dispatch) => {
        try {

            dispatch({ type: CATEGORY_GET_REQUEST })

            const { data } = await axios.get("/api/category/get-categorys")

            dispatch({
                type: CATEGORY_GET_SUCCESS,
                payload: data.categorys
            })

        } catch (err) {
            dispatch({
                type: CATEGORY_GET_FAIL,
                payload: err.response.data.message
            })
        }
    }
    // create category
export const createCategory = (formData) => async(dispatch) => {
    try {

        dispatch({ type: CATEGORY_CREATE_REQUEST })

        await axios.post("/api/category/create-category", formData)

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