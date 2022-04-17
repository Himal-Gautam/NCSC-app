import React, { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

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
          console.log(data)
          setSuccess(data.success)
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
        if(data.success){
            navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Paper
        elevation={8}
        sx={{ borderRadius: "8px", minHeight: "100vh" }}
        className="login"
      >
        <Card sx={{ maxWidth: 345, maxHeight: 600 }}>
          <CardMedia
            component="img"
            height="150"
            image="https://us.123rf.com/450wm/jirsak/jirsak1707/jirsak170700007/82255755-cybersecurity-and-information-technology-security-services-concept-login-or-sign-in-internet-concept.jpg?ver=6"
            alt="login"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Password Reset
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="Email"
              label="Email"
              type="text"
              fullWidth
              variant="filled"
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
              variant="filled"
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
              variant="filled"
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
              variant="filled"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              disabled={!success ? true : false}
            />
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              size="small"
              color="primary"
              variant="contained"
              onClick={!success ? handleGetOtp : handleReset}
              disabled={password!==confirmPassword ? true : false}
            >
              {!success ? "Get-Otp" : "Reset"}
            </Button>
          </CardActions>
        </Card>

        {/* <Snackbar
          open={snackopen}
          autoHideDuration={5000}
          onClose={() => {
            setSnackOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              setSnackOpen(false);
            }}
            severity={ReactSession.get("token") ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {ReactSession.get("token")
              ? "Success sign in successful!"
              : "SignIn fail"}
          </Alert>
        </Snackbar> */}
      </Paper>
    </div>
  );
}
