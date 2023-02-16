import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { checkUserIsAdmin } from "../utils";
import { Box } from "@mui/material";

export const AdminToolbar = () => {
  const isAdmin = checkUserIsAdmin();
  console.log({ isAdmin });
  return (
    isAdmin && (
      <Box
        className="adminToolbar"
        sx={{
          width: { xs: "200%", sm: "120%", md: "100%", lg: "95%", xl: "100%" },
        }}>
        <ul>
          <li>
            <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
              <button>My Admin</button>
            </Link>
          </li>
        </ul>
      </Box>
    )
  );
};
