import { adminListFailure, adminListSuccess } from "../store/action";

export const getAdminUserList = (dispatch) => {
    fetch('http://localhost:8080/adminList')
        .then((res) => res.json())
        .then((data) => dispatch(adminListSuccess(data)))
        .catch((err) => {
            dispatch(adminListFailure(err.message))
        });
}

export const postUsers = async(data) => {
    const {username,email,password} = data;
    await fetch("http://localhost:8080/adminList", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send

        body: JSON.stringify({
            name: username,
            email: email,
            password: password,
            isAdmin: true,
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => console.log(json));

}