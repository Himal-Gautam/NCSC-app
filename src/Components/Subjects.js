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
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
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
import { API } from "../global.js"

export function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [open, setopen] = useState(false);
  const [type, setType] = useState("add");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [tid, setTid] = useState(0);

  function updateSubjects() {
    fetch(`${API}/subjects`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSubjects();
  }, []);

  async function handleAdd() {
    // setSnackOpen(true);
    setopen(!open);

    await fetch(`${API}/subjects`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        code: code,
        teacherId: tid
      }),
      headers: {
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    updateSubjects();
  }

  async function handleEdit() {
    setopen(!open);
    await fetch(`${API}/subjects/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        code: code,
        teacherId: tid
      }),
      headers: {
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    updateSubjects();
  }

  async function handleDelete(id) {
    await fetch(`${API}/subjects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    updateSubjects();
  }

  return (
    <div className="area users-area">
      {subjects.reverse().map((subject) => (
        <Card sx={{ minWidth: 200, maxWidth: 300 }} raised="true">
          <CardContent>
            <Divider>
              <Chip label="SUBJECT NAME" />
            </Divider>
            <br />
            <Typography variant="h6" component="div" gutterBottom>
              {subject.name}
            </Typography>
            <br />
            <Divider>
              <Chip label="SUBJECT CODE" />
            </Divider>
            <br />
            <Typography variant="h6" component="div" gutterBottom>
              {subject.code}
            </Typography>
            <br />
            <Divider>
              <Chip label="SUBJECT TEACHER ID" />
            </Divider>
            <br />
            <Typography variant="h6" component="div" gutterBottom>
              {subject.teacherId}
            </Typography>
          </CardContent>
          {ReactSession.get("type") === "student" ? (
            <></>
          ) : (
            <CardActions>
              <IconButton
                color="warning"
                onClick={() => {
                  setId(subject._id);
                  setType("edit");
                  setopen(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="warning"
                onClick={() => {
                  setId(subject._id);
                  handleDelete(subject._id);
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
        <DialogTitle>
          {type === "add" ? "Add Notice" : "Edit Notice"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To {type === "add" ? "Add " : "Edit "}Subject in the Subject List
            please fill the below details
            {<br />}
            It is cumpulsory to fill all fields else form doesn't get submitted
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Subject Name"
            type="text"
            fullWidth
            variant="filled"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Subject Code"
            type="text"
            fullWidth
            variant="filled"
            onChange={(event) => setCode(event.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Subject Teacher Id"
            type="text"
            fullWidth
            variant="filled"
            onChange={(event) => setTid(event.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setopen(false)}>Cancel</Button>
          <Button
            onClick={type === "add" ? handleAdd : handleEdit}
            type="submit"
            disabled={name === "" || code === "" || tid === ""}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
