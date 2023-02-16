import React from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
import { Stack } from "@mui/material";

export const Layout = () => {
  return (
    <Stack direction="row">
      <SideNav />
      <Outlet />
    </Stack>
  );
};
