/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "../assets/css/login.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUserList } from "../services/signInapi";
const Login = () => {
  const [validateEmail, setValidateEmail] = useState(false);
  const dispatch = useDispatch();
  const adminListUsers = useSelector((state) => state.admin.adminUserList);
  
  useEffect(() => {
    getAdminUserList(dispatch);
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const redirectToSignUp = () => {
    navigate("/signUp");
  };
  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/");
    }
  }, []);
  const onSubmit = (data) => {
    const { email, password } = data;
    const findEmail = adminListUsers.find((it) => {
      return it.email === email && it.password === password;
    });
    if (findEmail) {
      setValidateEmail(false);
      localStorage.setItem("email", email);
      localStorage.setItem('name',findEmail.name)
      navigate("/");
      reset();
    } else {
      setValidateEmail(true);
    }
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          style={{ marginTop: "10px" }}
          alt="logo"
          src="https://material-kit-react.devias.io/assets/logo--dark.svg"
        />
        <Box
          sx={{
            my: 8,
            mx: 4,
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography variant="h6" className="signUpTextStyle">
            <span style={{ color: "grey" }}>Don't have an account? </span>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={redirectToSignUp}
            >
              {" "}
              Sign up{" "}
            </span>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.email && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errors.email.message}
              </p>
            )}
            {errors.password && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errors.password.message}
              </p>
            )}
            {validateEmail && (
              <p style={{ textAlign: "center", color: "red" }}>
                Incorrect Email-id or Password
              </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SignIn
            </Button>
          </form>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url("https://material-kit-react.devias.io/assets/auth-widgets.png")',
          backgroundColor: "#090e23",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};
export default Login;
