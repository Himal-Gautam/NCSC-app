import { ReactSession } from "react-client-session";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

export function Profile() {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const token = ReactSession.get("token");
  const [user, setUser] = useState({});
  console.log(token);

  useEffect(() => {
    fetch("http://localhost:4000/users/me", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.name = data.name.toUpperCase();
        data.role = data.role.toUpperCase();
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile area">
      <FormDialog open={open} setOpen={setOpen} />
      <Card sx={{ display: "flex", minWidth: 300 }} variant="outlined">
        <CardMedia
          component="img"
          sx={{ maxWidth: 150, minHeight: 150 }}
          image={user.image}
          alt="Live from space album cover"
        />
        <div style={{ textAlign: "left", height: "100" }}>
          <CardContent>
            <Typography component="div" variant="h5">
              <b>{user.name}</b>
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <b>{user.role}</b>
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Card sx={{ minWidth: 300 }} variant="outlined">
        <Typography component="div" variant="h5" style={{ margin: "10px" }}>
          Profile Details
        </Typography>
        <div>
          <CardContent>
            <Divider>
              <Chip label="UID" />
            </Divider>
            <br/>
            <Typography variant="h6" component="div" gutterBottom>
              {user.uid}
            </Typography>
            <br/>
            <Divider>
              <Chip label="AGE" />
            </Divider>
            <br/>
            <Typography variant="h6" component="div" gutterBottom>
              {user.age}
            </Typography>
            <br/>
            <Divider>
              <Chip label="PHONE NO." />
            </Divider>
            <br/>
            <Typography variant="h6" component="div" gutterBottom>
              {user.phone}
            </Typography>
            <br/>
            <Divider>
              <Chip label="EMAIL" />
            </Divider>
            <br/>
            <Typography variant="h6" component="div" gutterBottom>
              {user.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Card sx={{ minWidth: 300 }} variant="outlined">
        <Typography component="div" variant="h5" style={{ margin: "10px" }}>
          Actions
        </Typography>
        <CardActions>
          <div className="profile-actions">
            <Button size="medium" variant="outlined" onClick={handleClickOpen}>
              Change Password
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

function FormDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
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

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("  ");

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Change your Login Password here</DialogContentText>
          <TextField
            required
            variant="filled"
            autoFocus
            margin="dense"
            id="old_password"
            label="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            fullWidth
          />
          <TextField
            error={oldPassword === newPassword}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
