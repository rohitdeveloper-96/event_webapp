const initialValue = {
    userList: [],
    getUserData: [],
    loading: false,
    error: ""
}

const UserList = (state = initialValue, action) => {
    switch (action.type) {
        case "userStart": {
            return {
                ...state,
                userList: "",
                loading: true
            }
        }
        case "userSuccess": {
            return {
                ...state,
                userList: action.payload,
                loading: false
            }
        }
        case "userFailure": {
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        }
        case "getuserSuccess": {
            return {
                ...state,
                getUserData: action.payload,
                loading: false
            }
        }
        case "getuserFailure": {
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
export default UserList;