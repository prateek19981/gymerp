import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButtons({ title, handleAction, type, state }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        handleAction(type, state);
      }}>
      {title}
    </Button>
  );
}
