/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import "../assets/css/signUp.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { postUsers, getAdminUserList } from "../services/signInapi";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getAdminUserList(dispatch);
  }, []);
  const redirectToLogin = () => {
    navigate("/login");
  };
  const onSubmit = (data) => {
    postUsers(data);
    reset();
    alert("User Created Successfully");
  };

  //to check email is already exsist
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/adminList?email=${email}`);
      const data = await response.json();
      return data.length > 0; // If array length > 0, email exists
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
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
          <Typography component="h4" variant="h4">
            Sign Up
          </Typography>
          <Typography component="h5" variant="h6" className="signUpTextStyle">
            <span style={{ color: "grey" }}>Already have an account? </span>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={redirectToLogin}
            >
              {" "}
              Sign in{" "}
            </span>
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Name"
                {...register("username", {
                  required: "username is required",
                })}
              />
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
                  validate: async (value) => {
                    const exists = await checkEmailExists(value);
                    return !exists || "Email already exists";
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
              {errors.username && (
                <p style={{ textAlign: "center", color: "red" }}>
                  {errors.username.message}
                </p>
              )}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
          </Box>
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
export default SignUp;
