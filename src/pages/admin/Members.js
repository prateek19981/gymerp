import React from "react";
import { useSelector } from "react-redux";
import EnhancedTable from "../admin/Table";
import { Stack } from "@mui/system";
import { getStartDate } from "../../utils/getMembershipStartDate";
import { getEndDate } from "../../utils/getMembershipEndDate";
const Members = () => {
  let currUser = useSelector((state) => {
    return state.users.currentUser;
  });
  console.log("curr in members", currUser);
  if (Object.keys(currUser).length === 0) {
    currUser = JSON.parse(sessionStorage.getItem("currentUser"));
  }
  let tempRow = [];
  tempRow = currUser?.members?.map((item) => {
    let output = {};
    output.name = item.name;
    output.age = item.age;
    output.contact = item.number;
    output.membership =
      item.activeMemberships?.name || item.planDetail?.name || "NA";
    output.startDate = getStartDate(item.activeMemberships || item.planDetail);
    output.endDate = getEndDate(item.activeMemberships || item.planDetail);
    return output;
  });
  console.log({ tempRow });
  return (
    <Stack sx={{ width: "100%" }}>
      <EnhancedTable members={tempRow} />
    </Stack>
  );
};

export default Members;
