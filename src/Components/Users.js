import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import { ReactSession } from "react-client-session";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import {API} from "../global.js"

export function Users() {
  const [users, setUsers] = useState([]);
  const [open, setopen] = useState(false);
  const [type, setType] = useState("add");
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [password, setPassword] = useState("********");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [uid, setUid] = useState(0);
  const [phone, setPhone] = useState(0);

  function updateUsers() {
    fetch(`${API}/users`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateUsers();
  }, []);

  async function handleAdd() {
    await fetch(`${API}/users`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
      body: JSON.stringify({
        name: name,
        email: email,
        age: age,
        phone: phone,
        uid: uid,
        role: role,
        password: password,
      }),
    }).catch((err) => {
      console.log(err);
    });
    updateUsers();
    setopen(!open);
  }

  async function handleEdit() {
    console.log(user._id);

    let data = {
      name: name,
      email: email,
      age: age,
      phone: phone,
      uid: uid,
      role: role,
    }

    if(password!=="********"){
      data["password"] = password
    }

    await fetch(`${API}/users/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    updateUsers();
    setopen(!open);
  }

  async function handleDelete() {
    await fetch(`${API}/users/${uid}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    // setTimeout( updateUsers, 100)
    updateUsers()
  }

  return (
    <div className="area users-area">
       <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          mb:3
        }}
        elevation={15}
      >
        <InputBase
          sx={{ mb: 1,mt: 1, ml: 2, flex: 1 }}
          placeholder="Search Subjects"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        {/* <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton> */}
      </Paper>

      {users
        .filter((user) => {
          if (
            user.uid.toString().toLowerCase().includes(search) ||
            user.name.toLowerCase().includes(search)
          ) {
            return true;
          }
          return false;
        })
        .map((user) => (
          <Card sx={{ minWidth: 400, maxWidth: 400, mb:3 }} raised="true">
            <CardContent>
              <div
                style={{ display: "flex", minWidth: 300 }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  sx={{ maxWidth: 200, minHeight: 150 }}
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
              </div>
              <Typography
                component="div"
                variant="h5"
                style={{ margin: "10px" }}
              >
                Profile Details
              </Typography>
              <div>
                <CardContent>
                  <Divider>
                    <Chip label="UID" />
                  </Divider>
                  <br />
                  <Typography variant="h6" component="div" gutterBottom>
                    {user.uid}
                  </Typography>
                  <br />
                  <Divider>
                    <Chip label="AGE" />
                  </Divider>
                  <br />
                  <Typography variant="h6" component="div" gutterBottom>
                    {user.age}
                  </Typography>
                  <br />
                  <Divider>
                    <Chip label="PHONE NO." />
                  </Divider>
                  <br />
                  <Typography variant="h6" component="div" gutterBottom>
                    {user.phone}
                  </Typography>
                  <br />
                  <Divider>
                    <Chip label="EMAIL" />
                  </Divider>
                  <br />
                  <Typography variant="h6" component="div" gutterBottom>
                    {user.email}
                  </Typography>
                </CardContent>
              </div>
            </CardContent>
            {ReactSession.get("type") === "student" ? (
              <></>
            ) : (
              <CardActions>
                <IconButton
                  color="info"
                  onClick={() => {
                    setName(user.name);
                    setEmail(user.email);
                    setRole(user.role);
                    setAge(user.age);
                    setPhone(user.phone);
                    setUid(user.uid);
                    setUser(user);
                    setType("edit");
                    setopen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    setUid(user._id);
                    handleDelete();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            )}
          </Card>
        ))}
      {ReactSession.get("type") === "student" ? (
        <></>
      ) : (
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", right: "20px", bottom: "20px" }}
          size="large"
          onClick={() => {
            setType("add");
            setopen(true);
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>{type === "add" ? "Add User" : "Edit User"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To {type === "add" ? "Add " : "Edit "}User in the User List please
            fill the below details
            {<br />}
            It is cumpulsory to fill all fields else form doesn't get submitted
          </DialogContentText>
          <TextField
            required
            defaultValue={type === "edit" ? user.name : ""}
            variant="outlined"
            margin="dense"
            id="Name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            required
            defaultValue={type === "edit" ? user.email : ""}
            variant="outlined"
            margin="dense"
            id="Email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
          />
          <TextField
            required
            defaultValue={type === "edit" ? user.uid : ""}
            variant="outlined"
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
            defaultValue={type === "edit" ? user.age : ""}
            variant="outlined"
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
            defaultValue={type === "edit" ? user.phone : ""}
            variant="outlined"
            margin="dense"
            id="phone"
            label="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            fullWidth
          />
          <TextField
            required
            defaultValue={type === "edit" ? user.role : ""}
            variant="outlined"
            margin="dense"
            id="role"
            label="Role"
            onChange={(e) => setRole(e.target.value)}
            type="text"
            fullWidth
          />
          <TextField
            error={password.length < 7}
            required
            variant="outlined"
            margin="dense"
            id="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
          <Button
            onClick={type === "add" ? handleAdd : handleEdit}
            type="submit"
            // disabled={password === ""}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
