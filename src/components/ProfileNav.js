import React from "react";
import { Stack, Button, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";

const ProfileNav = () => {
  return (
    <Stack>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <Link to="/" style={{ textDecoration: "none" }}>
          <Stack key={text}>
            <Button>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </Button>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

export default ProfileNav;
