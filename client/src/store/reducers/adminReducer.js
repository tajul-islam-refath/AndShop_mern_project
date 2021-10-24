import {
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_STATE_RESET,
    CATEGORY_ERRORS_CLEAR
} from "../Types/adminTypes"


export const category = (state = {
    loading: false,
    isCreated: false,
    isUpdated: false,
    isDeleted: false
}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CATEGORY_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: true
            }
        case CATEGORY_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CATEGORY_STATE_RESET:
            return {
                ...state,
                isCreated: false,
                isUpdated: false,
                isDeleted: false
            }
        case CATEGORY_ERRORS_CLEAR:
            return {
                ...state,
                errors: null
            }
        default:
            return state
    }
}