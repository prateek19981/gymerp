import React from "react";
import { Box, List, Stack } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";

export const SideNav = () => {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack
      sx={{
        backgroundColor: "white",
        width: "17%",
        height: "1000px",
        minWidth: "160px",
        boxShadow: "6px 5px 6px lightgray",
        padding: "2%",
        zIndex: 1,
        display: "inline-block",
        mt: "15px",
      }}>
      <Box
        sx={{
          padding: "2%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        role="presentation">
        <List>
          {[
            "dashboard",
            "Engage",
            "Memberships",
            "profile",
            "BusinessInsights",
            "Enquiries",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link
                to={`/admin/${text}`}
                style={{
                  textDecoration: "none",
                  color: "#3A1212",
                }}>
                {" "}
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Members" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to={`/admin/members/allmembers`}
                style={{
                  textDecoration: "none",
                  color: "#3A1212",
                }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="All Members" />
                </ListItemButton>
              </Link>
              <Link
                to={`/admin/members/addmember`}
                style={{
                  textDecoration: "none",
                  color: "#3A1212",
                }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Add Member" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
      </Box>
    </Stack>
  );
};
