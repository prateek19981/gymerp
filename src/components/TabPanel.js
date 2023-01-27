import { Stack } from "@mui/system";
import React from "react";

const TabPanel = ({ value, index, children }) => {
  return (
    <>
      {value === index && (
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="center"
          sx={{ overflow: "scroll" }}>
          {children}
        </Stack>
      )}
    </>
  );
};

export default TabPanel;
