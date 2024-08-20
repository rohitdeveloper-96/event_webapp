export const adminListStart = () => {
    return {
        type: "adminStart",
    }
}

export const adminListSuccess = (data) => {
    return {
        type: "adminSuccess",
        payload: data,
    }
}

export const adminListFailure = (error) => {
    return {
        type: "adminFailure",
        payload: error,
    }
}

//actions for the usersList
export const userListStart = () => {
    return {
        type: "userStart",
    }
}

export const userListSuccess = (data) => {
    return {
        type: "userSuccess",
        payload: data,
    }
}

export const userListFailure = (error) => {
    return {
        type: "userFailure",
        payload: error,
    }
}

export const getusertSuccess = (data) => {
    return {
        type: "getuserSuccess",
        payload: data,
    }
}

export const getuserFailure = (error) => {
    return {
        type: "getuserFailure",
        payload: error,
    }
}