import {
  getuserFailure,
  getusertSuccess,
  userListFailure,
  userListStart,
  userListSuccess,
} from "../store/action";

//get the userslist from the server
export const getUserList = (dispatch) => {
  fetch(" http://localhost:8080/UserList")
    .then((res) => res.json())
    .then((data) => dispatch(userListSuccess(data)))
    .catch((err) => {
      dispatch(userListFailure(err.message));
    });
};

export const postUsers = async (data) => {
  const { name, email, eventname, primaryskills } =     data;

  await fetch("http://localhost:8080/UserList", {
    // Adding method type
    method: "POST",

    // Adding body or contents to send

    body: JSON.stringify({
      name: name,
      email: email,
      event: eventname,
      primaryskills: primaryskills,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => console.log(json));
};

//Delete
export const deleteUsersList = async (dispatch, id) => {
  dispatch(userListStart());
  await fetch(`http://localhost:8080/UserList/${id}`, {
    // Adding method type
    method: "DELETE",
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => console.log(json));
  await getUserList(dispatch);
};

//PUT
export const updateUsersList = async (dispatch, data, id) => {
  const { name, email, eventname, primaryskills } = data;
  dispatch(userListStart());
  await fetch(`http://localhost:8080/UserList/${id}`, {
    // Adding method type
    method: "PUT",

    // Adding body or contents to send
    body: JSON.stringify({
      name: name,
      email: email,
      event: eventname,
      primaryskills: primaryskills,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((json) => console.log(json));
  await getUserList(dispatch);
};



//Get particular UserList
export  const getUserEvent = async(dispatch, id) => {
  dispatch(userListStart())
  await fetch(`http://localhost:8080/UserList/${id}`)
      .then((res) => res.json())
      .then((data) => dispatch(getusertSuccess(data)))
      .catch((err) => {
          dispatch(getuserFailure(err.message))
      });

}