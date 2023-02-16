import React from "react";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";

const ButtonWrapper = function ({ children, ...otherProps }) {
  const { submitForm } = useFormikContext();
  console.log({ otherProps });
  function handleSubmit() {
    submitForm();
  }
  const configButton = {
    ...otherProps,
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
  };
  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
