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
import LoginIcon from '@mui/icons-material/Login';

export function Login() {
  const [uid, setUid] = useState(0);
  const [password, setPassword] = useState("");
  const [snackopen, setSnackOpen] = useState(false);
  let navigate = useNavigate();

  function handleLogin() {
    if (uid !== "" && password !== "") {
      fetch("http://localhost:4000/users/login", {
        method: "POST",
        body: JSON.stringify({
          uid: uid,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          ReactSession.set("token", data.token);
          navigate("/dashboard/profile");
        })
        .catch((err) => {
          console.log(err);
        });
      setSnackOpen(true);
    }
  }

  return (
    <div>
      <Paper
        elevation={8}
        sx={{ borderRadius: "8px", minHeight: "100vh" }}
        className="login"
      >
        <Card sx={{ maxWidth: 345, maxHeight: 410 }}>
          <CardMedia
            component="img"
            height="150"
            image="https://us.123rf.com/450wm/jirsak/jirsak1707/jirsak170700007/82255755-cybersecurity-and-information-technology-security-services-concept-login-or-sign-in-internet-concept.jpg?ver=6"
            alt="login"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Login
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="Uid"
              label="Uid"
              type="number"
              fullWidth
              variant="filled"
              onChange={(event) => setUid(event.target.value)}
              required
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
            />
          </CardContent>
          <CardActions>
            <Button fullWidth startIcon={<LoginIcon />} size="small" color="primary" variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </CardActions>
        </Card>

        <Snackbar
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
        </Snackbar>
      </Paper>
    </div>
  );
}
