import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { ReactSession } from "react-client-session";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MuiAlert from "@mui/material/Alert";
import {API} from "../global.js";

export function Notices() {
  const [notices, setNotices] = useState([]);
  const [open, setopen] = useState(false);
  const [type, setType] = useState("add");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function updateNotices() {
    fetch(`${API}/notices`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotices(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateNotices();
  }, []);

  async function handleAdd() {
    if (title !== "" && description !== "") {
      // setSnackOpen(true);
      setopen(!open);

      await fetch(`${API}/notices`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          Authorization: "Bearer " + ReactSession.get("token"),
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      updateNotices();
    }
  }

  async function handleEdit() {
    console.log(id, title, description)
    if (title !== "" && description !== "") {
      // setSnackOpen(true);
      setopen(!open);
      await fetch(`${API}/notices/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
          description: description,
        }),
        headers: {
          Authorization: "Bearer " + ReactSession.get("token"),
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      updateNotices();
    }
  }

  async function handleDelete(id) {
      await fetch(`${API}/notices/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + ReactSession.get("token"),
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      updateNotices();
    
  }

  return (
    <div className="area notices-area">
      {notices.reverse().map((notice) => (
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <div className="content">
              <Typography variant="h5" component="div">
                {notice.title}
              </Typography>
              <Typography variant="body2">{notice.description}</Typography>
              <Typography color="text.secondary">{notice.owner_info.name}</Typography>
              <Typography color="text.secondary">{notice.updatedAt.split("T")[0].split("-").reverse().join("-") + " " + notice.updatedAt.split("T")[1].slice(0,5)}</Typography>
            </div>
          </CardContent>
          {ReactSession.get("type") === "student" ? (
            <></>
          ) : (
            <CardActions>
               <IconButton
                color="warning"
                onClick={()=>{
                  setId(notice._id);
                  setType("edit");
                  setopen(true);}
                }
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="warning"
                onClick={()=>{
                  setId(notice._id);
                  handleDelete(notice._id)}
                }
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
        <DialogTitle>
          {type === "add" ? "Add Notice" : "Edit Notice"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To {type === "add" ? "Add " : "Edit "}Notice in the Notice List
            please fill the below details
            {<br />}
            It is cumpulsory to fill all fields else form doesn't get submitted
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Notice Title"
            type="text"
            fullWidth
            variant="filled"
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Notice Description"
            type="text"
            fullWidth
            variant="filled"
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
          <Button
            onClick={type === "add" ? handleAdd : handleEdit}
            type="submit"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
