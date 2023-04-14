import React from "react";
import TextField from "@mui/material/TextField";

const InputFields = ({ field, label, value, handleValueChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => handleValueChange(field, e.target.value)}
      style={{ marginRight: "1rem" }}
    />
  );
};

export default InputFields;
