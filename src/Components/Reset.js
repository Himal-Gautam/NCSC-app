import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.narmadacollege.ac.in/">
        NCSC College Management System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export function Reset() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(0);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  function handleGetOtp() {
    fetch("http://localhost:4000/users/forgot-pass/otp", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccess(data.success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleReset() {
    fetch("http://localhost:4000/users/forgot-pass/reset", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        otp: otp,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              id="Email"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="OTP"
              label="OTP"
              type="number"
              fullWidth
              variant="outlined"
              onChange={(event) => setOtp(event.target.value)}
              required
              disabled={!success ? true : false}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={!success ? true : false}
              helperText="minimum length is 7 characters"
            />
            <TextField
              autoFocus
              margin="dense"
              id="ConfirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              disabled={!success ? true : false}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              onClick={!success ? handleGetOtp : handleReset}
              disabled={password !== confirmPassword ? true : false}
            >
              {!success ? "Get-Otp" : "Reset"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
