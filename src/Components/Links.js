import React from "react";
import { ReactSession } from "react-client-session";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import List from "@mui/material/List";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SchoolIcon from "@mui/icons-material/School";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Divider from "@mui/material/Divider";

export function Links() {
  const list = [
    {
      name: "veer narmad south gujrat university",
      link: "https://www.vnsgu.ac.in/",
    },
    {
      name: "narmada college of science and commerce",
      link: "https://www.narmadacollege.ac.in/",
    },
    {
      name: "Jump2Learn",
      link: "https://jump2learn.com/",
    },
    {
      name: "fees payment",
      link: "http://portal.narmadacollege.ac.in/student-narmadacollege.php",
    },
    {
      name: "student portal",
      link: "https://vnsgu.net/",
    },
  ];

  return (
    <div className="area">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <List>
            {list.map((item, index) => (
              <Nav.Link href={item.link}>
                <ListItem disablePadding="true">
                  <ListItemButton>
                    <ListItemIcon>
                      {index === 0 ? <SchoolIcon color="primary" /> : <></>}
                      {index === 1 ? (
                        <AccountBalanceIcon color="primary" />
                      ) : (
                        <></>
                      )}
                      {index === 2 ? (
                        <LibraryBooksIcon color="primary" />
                      ) : (
                        <></>
                      )}
                      {index === 3 ? (
                        <CurrencyRupeeIcon color="primary" />
                      ) : (
                        <></>
                      )}
                      {index === 4 ? <PeopleAltIcon color="primary" /> : <></>}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name.toUpperCase()}
                      color="primary"
                    />
                  </ListItemButton>
                </ListItem>
              </Nav.Link>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
