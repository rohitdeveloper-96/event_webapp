const initialValue = {
    adminUserList: [],
    loading:false,
    error: ""
}

const adminUserList = (state = initialValue, action) => {
    switch (action.type) {
        case "adminStart": {
            return {
                ...state,
                adminUserList: "",
                loading: true
            }
        }
        case "adminSuccess": {
            return {
                ...state,
                adminUserList: action.payload,
                loading: false
            }
        }
        case "adminFailure": {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
        default:
            return state
    }
}
export default adminUserList;