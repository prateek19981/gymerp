import React from "react";
import { Stack } from "@mui/material";
import Button from "./Button";

const MembershipTabCard = ({
  profileURL = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
  name = "Prateek",
  duration = "monthly",
  endDate = "21-02-2023",
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        backgroundColor: "whitesmoke",
        width: "100%",
        padding: "2%",
        borderBottom: "1px solid gray",
        margin: "0.5%",
      }}>
      <img className="tabprofileImg" src={profileURL} />
      <Stack>test</Stack>
      <Button title="renew" />
    </Stack>
  );
};

export default MembershipTabCard;
