import React from "react";
import { useSelector } from "react-redux";
import EnhancedTable from "../admin/Table";
import { Stack } from "@mui/system";
import { getStartDate } from "../../utils/getMembershipStartDate";
import { getActiveMembers } from "../../utils/getActiveMembers";
import { useState } from "react";
const ActiveMembers = () => {
  let currUser = useSelector((state) => {
    return state.users.currentUser;
  });

  let tempRow = [];
  let activeUsers = getActiveMembers(currUser);
  tempRow = activeUsers.map((item) => {
    let output = {};
    output.name = item.name;
    output.age = item.age;
    output.contact = item.number;
    output.joiningDate = item.joiningDate || "NA";
    output.startDate = item.startDate;
    output.endDate = item.endDate;
    output.activeMemberships = item.activeMemberships;
    return output;
  });

  console.log({ tempRow });
  return (
    <Stack sx={{ width: "100%" }}>
      <EnhancedTable members={tempRow} active={true} />
    </Stack>
  );
};

export default ActiveMembers;
