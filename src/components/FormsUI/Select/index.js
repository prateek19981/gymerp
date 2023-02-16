import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectWrapper = function ({ name, options, ...otherProps }) {
  const { setFieldValue, setValues } = useFormikContext();
  const [field, meta] = useField(name);
  const { setPlanHandler } = otherProps;
  const { planDetail } = otherProps;

  const handleChange = (e) => {
    const { value } = e.target;
    setPlanHandler && setPlanHandler(value);
    console.log({ value });
    setFieldValue(name, value);
  };
  const configSelect = {
    ...otherProps,
    ...field,
    select: true,
    variant: "outlined",
    fullWidth: "true",
    onChange: handleChange,
    options,
  };
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
