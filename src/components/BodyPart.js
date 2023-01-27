import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../assets/icons/gym.png";

const BodyPart = ({ data, setBodyPart, bodyPart }) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      onClick={() => {
        setBodyPart(data);
        window.scrollTo({
          top: 1800,
          left: 100,
          behavior: "smooth",
        });
      }}
      sx={{
        borderTop: bodyPart === data ? "4px solid red" : "",
        backgroundColor: "#fff",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px",
      }}>
      <img src={Icon} alt="dumbell" style={{ width: "40px", height: "40px" }} />
      <Typography>{data}</Typography>
    </Stack>
  );
};

export default BodyPart;
