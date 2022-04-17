import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ListItemText from "@mui/material/ListItemText";
import SubjectIcon from "@mui/icons-material/Subject";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {API} from "../global.js"
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export function NavBar() {
  const location = useLocation();
  return <>{location.pathname === "/login" || location.pathname === "/password-reset" ? <></> : NavBar_()}</>;
}

function NavBar_() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await fetch(`${API}/users/logout`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    ReactSession.remove("token");
    ReactSession.remove("type");
    navigate("/login");
    window.close();
    window.open(window.location.href, "_blank");
  };

  const handleLogoutAll = async () => {
    await fetch(`${API}/users/logoutAll`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    ReactSession.remove("token");
    ReactSession.remove("type");
    navigate("/login");
    window.close();
    window.open(window.location.href, "_blank");
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {path[path.length - 1].toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["profile", "academics", "assignments", "notices", "links"].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                let link = "/dashboard/" + text;
                navigate(link);
              }}
            >
              <Tooltip
                arrow={true}
                size="large"
                TransitionComponent={Zoom}
                title={text}
                placement="right"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? <PersonIcon color="primary" /> : <></>}
                  {index === 1 ? <MenuBookIcon color="primary" /> : <></>}
                  {index === 2 ? <AssignmentIcon color="primary" /> : <></>}
                  {index === 3 ? <FeedbackIcon color="primary" /> : <></>}
                  {index === 4 ? <LinkIcon color="primary" /> : <></>}
                  
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={text.toUpperCase()}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
        {ReactSession.get("type") === "admin" ? (
          <>
            <Divider />
            <List>
              {["users", "subjects"].map(
                (text, index) => (
                  <ListItemButton
                    key={text}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => {
                      let link = "/dashboard/" + text;
                      navigate(link);
                    }}
                  >
                    <Tooltip
                      arrow={true}
                      size="large"
                      TransitionComponent={Zoom}
                      title={text}
                      placement="right"
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index === 0 ? <PeopleAltIcon color="primary" /> : <></>}
                        {index === 1 ? <SubjectIcon color="primary" /> : <></>}
                        {/* {index === 2 ? <FeedbackIcon color="primary" /> : <></>}
                        {index === 3 ? <LinkIcon color="primary" /> : <></>} */}
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText
                      primary={text.toUpperCase()}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                )
              )}
              {/* <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  let link = "/dashboard/users";
                  navigate(link);
                }}
              >
                <Tooltip
                  arrow={true}
                  size="large"
                  TransitionComponent={Zoom}
                  title="users"
                  placement="right"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleAltIcon color="primary" />
                  </ListItemIcon>
                </Tooltip>

                <ListItemText primary="LOGOUT" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  let link = "/dashboard/subjects";
                  navigate(link);
                }}
              >
                <Tooltip
                  arrow={true}
                  size="large"
                  TransitionComponent={Zoom}
                  title="subjects"
                  placement="right"
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SubjectIcon color="primary" />
                  </ListItemIcon>
                </Tooltip>

                <ListItemText primary="LOGOUT" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton> */}
            </List>
          </>
        ) : (
          <></>
        )}
        <Divider />
        <List>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={handleLogout}
          >
            <Tooltip
              arrow={true}
              size="large"
              TransitionComponent={Zoom}
              title="Logout"
              placement="right"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon color="primary" />
              </ListItemIcon>
            </Tooltip>

            <ListItemText primary="LOGOUT" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={handleLogoutAll}
          >
            <Tooltip
              arrow={true}
              size="large"
              TransitionComponent={Zoom}
              title="Logout All"
              placement="right"
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
            </Tooltip>

            <ListItemText primary="LOGOUT ALL" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
