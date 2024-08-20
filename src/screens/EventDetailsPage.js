/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header from "../components/header";
import '../assets/css/eventDetailsPage.css';
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserEvent } from '../services/userApi'
import { useNavigate, useParams } from "react-router";
const UserDetailsPage = () => {
    const [adminUserName, setAdminUsername] = useState("")
    const { id } = useParams();
    const [loader, setLoader] = useState(false)
    const { getUserData, loading } = useSelector(state => state.users);
    const dispatch = useDispatch()
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [eventName, setEventName] = useState("");
    const [skills, setPrimarySkills] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        setAdminUsername(localStorage.getItem("name"))
        getUserEvent(dispatch, id)
    }, [])
    useEffect(() => {
        if (loading === true) {
            setLoader(true)
        } else {
            setLoader(false)
            setUsername(getUserData.name)
            setEmail(getUserData.email)
            setEventName(getUserData.event)
            setPrimarySkills(getUserData.primaryskills)
        }
    }, [getUserData, loading])
    const onClickHandler = () => {
        navigate('/')
    }
    return (
        <>
            <Header username={adminUserName} />
            {loader && <div className="loader"><CircularProgress variant="solid" color="success" /></div>}
            <div className="mainContainer">
                <div className="detailsContainer">
                    <Typography mt={2} align="center" variant="h6" color="#212636">EventDetails</Typography>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography align="center" sx={{ width: "50%" }} variant="h6">Name</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{name}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>Email-id</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{email}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>Event Name</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{eventName}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <div style={{ display: "flex", marginTop: "30px" }}>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>PrimarySkills</Typography>
                        <Typography variant="h6" sx={{ width: "10%" }}>:</Typography>
                        <Typography variant="h6" align="center" sx={{ width: "50%" }}>{skills}</Typography>
                    </div>
                    <hr style={{ width: "90%" }} />
                    <button className="backbuttonStyles" onClick={onClickHandler}>Back</button>
                </div>
            </div>
        </>

    )
}
export default UserDetailsPage;
