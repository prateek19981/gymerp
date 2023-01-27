import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { checkUserIsAdmin } from "../utils";

export const AdminToolbar = () => {
  const isAdmin = checkUserIsAdmin();
  return (
    isAdmin && (
      <div className="adminToolbar">
        <ul>
          <li>
            <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
              <button>My Admin</button>
            </Link>
          </li>
        </ul>
      </div>
    )
  );
};
