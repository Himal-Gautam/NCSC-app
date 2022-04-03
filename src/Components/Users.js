import { ReactSession } from "react-client-session";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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

export function Users() {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const token = ReactSession.get("token");
  const [users, setUsers] = useState({});
  console.log(token);

  useEffect(() => {
    fetch("http://localhost:4000/users", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="area">
      <ChangePassword open={open} setOpen={setOpen} />
      {/* {users.map((user)=> (<><Card sx={{ display: "flex", minWidth: 300, maxWidth: 500 }} variant="outlined">
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
      </>
      ))} */}
      <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", right: "20px", bottom: "20px" }}
          size="large"
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
    </div>
  );
}


function ChangePassword({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        age: age,
        phone: phone,
        uid: uid,
        role: role,
        password: password
      }),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8"
      })
    }).catch((err) => {
      console.log(err);
    });

    // setOpen(false);
  };

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [uid, setUid] = useState(0);
  const [phone, setPhone] = useState(0);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Change your Login Password here</DialogContentText>
          <TextField
            required
            variant="filled"
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            required
            variant="filled"
            margin="dense"
            id="Email"
            label="Eamil"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
          />
           <TextField
            required
            variant="filled"
            margin="dense"
            id="uid"
            label="Uid"
            onChange={(e) => setUid(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            error={age < 0 && age > 100}
            required
            variant="filled"
            margin="dense"
            id="Age"
            label="Age"
            onChange={(e) => setAge(e.target.value)}
            type="number"
            fullWidth
          />
          <TextField
            error={age < 0 && age > 100}
            required
            variant="filled"
            margin="dense"
            id="phone"
            label="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            fullWidth
          />
          <TextField
            error={age < 0 && age > 100}
            required
            variant="filled"
            margin="dense"
            id="role"
            label="Role"
            onChange={(e) => setRole(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            error={age < 0 && age > 100}
            required
            variant="filled"
            margin="dense"
            id="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
