import React from "react";
import { useSelector } from "react-redux";
import EnhancedTable from "../admin/Table";
import { Stack } from "@mui/system";
import { getStartDate } from "../../utils/getMembershipStartDate";
import { getEndDate } from "../../utils/getMembershipEndDate";
import { getActiveMembers } from "../../utils/getActiveMembers";
const Members = () => {
  let currUser = useSelector((state) => {
    return state.users.currentUser;
  });
  console.log("curr in members", currUser);

  let tempRow = [];
  tempRow = currUser?.members?.map((item) => {
    let output = {};
    output.name = item.name;
    output.age = item.age;
    output.contact = item.number;
    output.joiningDate = item.joiningDate || "NA";
    return output;
  });
  console.log({ tempRow });
  return (
    <Stack sx={{ width: "100%" }}>
      <EnhancedTable members={tempRow} active={false} />
    </Stack>
  );
};

export default Members;
