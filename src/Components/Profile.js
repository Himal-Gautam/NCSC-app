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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export function Profile() {
  const handleReset = () => {
    setDialogType("passwordReset");
    setOpen(true);
  };

  const handleAttendance = () => {
    setDialogType("markAttendance");
    setOpen(true);
  };

  const handleSubmitAssignment = () => {
    setDialogType("submitAssignment");
    setOpen(true);
  };

  const handleCreateAssignment = () => {
    setDialogType("createAssignment");
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const token = ReactSession.get("token");
  const [user, setUser] = useState({});
  const [dialogType, setDialogType] = useState("");
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
      {dialogType === "passwordReset" ? (
        <ChangePassword open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "markAttendance" ? (
        <Attendance open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "submitAssignment" ? (
        <SubmitAssignment open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
      {dialogType === "createAssignment" ? (
        <CreateAssignment open={open} setOpen={setOpen} />
      ) : (
        <></>
      )}
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
      </Card>
      <Card sx={{ minWidth: 300 }} variant="outlined">
        <Typography component="div" variant="h5" style={{ margin: "10px" }}>
          Actions
        </Typography>
        <CardActions>
          <div className="profile-actions">
            <Button
              size="medium"
              variant="outlined"
              onClick={handleReset}
              fullWidth
              sx={{ maxWidth: 500 }}
            >
              Change Password
            </Button>
            {ReactSession.get("type") === "student" ? (
              <>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleAttendance}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Mark Attendance
                </Button>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleSubmitAssignment}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Submit Assignment
                </Button>
              </>
            ) : (
              <></>
            )}
            {ReactSession.get("type") === "teacher" ? (
              <>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={handleCreateAssignment}
                  fullWidth
                  sx={{ maxWidth: 500 }}
                >
                  Create Assignment
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

function ChangePassword({ open, setOpen }) {
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

function Attendance({ open, setOpen }) {
  const [subjects, setSubjects] = useState([]);
  const [choice, setChoice] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  function updateSubjects() {
    fetch("http://localhost:4000/subjects", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.map((subject) => subject.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSubjects();
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:4000/attendance", {
      method: "POST",
      body: JSON.stringify({
        subjectName: choice,
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

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: 200 }}>
        <DialogTitle>Mark Attendance</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">
              Choose Subject
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SubmitAssignment({ open, setOpen }) {
  const [subjects, setSubjects] = useState([]);
  const [choice, setChoice] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function updateSubjects() {
    fetch("http://localhost:4000/subjects", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.map((subject) => subject.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSubjects();
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:4000/attendance", {
      method: "POST",
      body: JSON.stringify({
        subjectName: choice,
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

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: 200 }}>
        <DialogTitle>Submit Assignments</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Assignment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            required
            variant="outlined"
            color={isSelected ? "success" : "error"}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            <input type="file" name="file" onChange={changeHandler}></input>
          </Button>
          {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function CreateAssignment({ open, setOpen }) {
  const [subjects, setSubjects] = useState([]);
  const [choice, setChoice] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function updateSubjects() {
    fetch("http://localhost:4000/subjects", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.map((subject) => subject.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    updateSubjects();
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:4000/attendance", {
      method: "POST",
      body: JSON.stringify({
        subjectName: choice,
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

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: 200 }}>
        <DialogTitle>Submit Assignments</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Assignment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choose Subject"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {subjects.map((subject) => (
                <MenuItem value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Button
            required
            variant="outlined"
            color={isSelected ? "success" : "error"}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            <input type="file" name="file" onChange={changeHandler}></input>
          </Button>
          {isSelected ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{" "}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
