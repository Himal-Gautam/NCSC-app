import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactSession } from "react-client-session";
import { useNavigate, Route, Redirect } from "react-router-dom";
import { TokenContext } from "../../App";
import { useContext } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        NCSC College Managemnet System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export function SignInSide() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("otp");

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (data.get("uid") !== "" && data.get("password") !== "") {
      await fetch("http://localhost:4000/users/login", {
        method: "POST",
        body: JSON.stringify({
          uid: data.get("uid"),
          password: data.get("password"),
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.token) {
            ReactSession.set("token", res.token);
            ReactSession.set("type", res.type);
            navigate("/dashboard/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleReset = () => {
    fetch("http://localhost:4000/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        password: newPassword,
      }),
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    setOpen(false);
  };
  
  const handleOtp = () => {
    fetch("http://localhost:4000/users/me", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    setType("reset");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://lh5.googleusercontent.com/p/AF1QipONefUlraaFcaMfUKJwPGE9dTqgyKcXyuJ9b2-x=w1080-k-no)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="uid"
                label="UID"
                name="uid"
                autoComplete="uid"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Link onClick={setOpen(true)} variant="body2">
                Forgot password?
              </Link>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>
            {type === "add" ? "Add Notice" : "Edit Notice"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To {type === "add" ? "Add " : "Edit "}Notice in the Notice List
              please fill the below details
              {<br />}
              It is cumpulsory to fill all fields else form doesn't get
              submitted
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Notice Title"
              type="text"
              fullWidth
              variant="filled"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="description"
              label="Notice Description"
              type="text"
              fullWidth
              variant="filled"
              onChange={(event) => setOtp(event.target.value)}
              required
            />
            <TextField
              helperText="Old Password and New Password can't be same"
              required
              variant="filled"
              margin="dense"
              id="new_password"
              label="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              fullWidth
            />
            <TextField
              error={confirmPassword === newPassword ? false : true}
              helperText="Confirm New Password and New Password should be same"
              required
              variant="filled"
              margin="dense"
              id="confirm_password"
              label="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={type === "otp" ? handleOtp : handleReset}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
}
