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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import InputLabel from "@mui/material/InputLabel";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { API } from "../global.js";
import Box from "@mui/material/Box";

export function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [assignment, setAssignment] = useState();
  const [open, setopen] = useState(false);
  const [type, setType] = useState("add");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [choice, setChoice] = useState([]);

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
        setSubjects(data.filter((subject) => subject.teacher.uid === ReactSession.get("uid")));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateAssignments() {
    fetch(`${API}/assignments`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setAssignments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateAssignments();
    updateSubjects();
  }, []);

  async function handleAdd() {
    console.log("hello")
    if (title !== "" && description !== "") {
      // let data = new FormData();
      // data.append("mySubject", choice);
      // console.log(data)

      let data = {
        title: title,
        description: description,
        subject: choice,
      }
      console.log(data)
      await fetch(`${API}/assignments`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          subject: choice,
        }),
        // body: data,
        headers: {
          // Accept: 'application/form-data',
          Authorization: "Bearer " + ReactSession.get("token"),
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      updateAssignments();
      setopen(!open);
    }
  }

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  async function handleEdit() {
    console.log(id, title, description);
    if (title !== "" && description !== "") {
      // setSnackOpen(true);
      await fetch(`${API}/assignment/${id}`, {
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

      updateAssignments();
      setopen(!open);
    }
  }

  async function handleDelete() {
    console.log("delete request", id)
      await fetch(`${API}/assignments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + ReactSession.get("token"),
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      updateAssignments();

  }

  return (
    <div className="area notices-area">
      {assignments.reverse().map((assignment, index) => (
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <div className="content">
              <Typography variant="h5" component="div">
                {assignment.title}
              </Typography>
              <Typography variant="body1">{assignment.description}</Typography>
              <Typography color="text.secondary">
                
              </Typography>
              <Typography color="text.secondary">
                {assignment.teacher.name} - {assignment.subject.name}
              </Typography>
              <Typography color="text.secondary">
                {assignment.updatedAt
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-") +
                  " " +
                  assignment.updatedAt.split("T")[1].slice(0, 5)}
              </Typography>
            </div>
          </CardContent>
          {ReactSession.get("type") === "student" || ReactSession.get("uid") !== assignment.teacher.uid ? (
            <></>
          ) : (
            <CardActions>
              <IconButton
                onClick={() => {
                  setId(assignment._id);
                  setAssignment(assignment);
                  setType("edit");
                  setopen(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setAssignment(assignment);
                  setId(assignment._id);
                  handleDelete()
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
            setType("add")
            setopen(true);
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle>
          {type === "add" ? "Give " : "Edit "}Assignment
        </DialogTitle>
        <Box
          component="form"
          noValidate
          // onSubmit={type === "add" ? handleAdd : handleEdit}
          sx={{ mt: 1 }}
        >
          <DialogContent>
            <DialogContentText>
              To {type === "add" ? "Give " : "Edit "}Assignment in the
              Assignments List please fill the below details
              {<br />}
              It is cumpulsory to fill all fields else form doesn't get
              submitted
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Assingment Title"
              type="text"
              fullWidth
              variant="filled"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="description"
              label="Assingment Description"
              type="text"
              fullWidth
              variant="filled"
              onChange={(event) => setDescription(event.target.value)}
              required
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={choice}
                label="Choose Subject"
                onChange={(event) => setChoice(event.target.value)}
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                {subjects.map((subject) => (
                  <MenuItem value={subject._id}>{subject.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setopen(false)}>Cancel</Button>
            <Button onClick={type === "add" ? handleAdd : handleEdit} >Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
