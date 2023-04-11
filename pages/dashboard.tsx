import { TextField } from "@mui/material";
import React from "react";

const dashboard = () => {
  return (
    <div>
      dashboard{" "}
      <TextField
        error
        id="standard-error-helper-text"
        label="Error"
        defaultValue={"使用者名稱"}
        helperText={"信箱用過了"}
        variant="standard"
      />
    </div>
  );
};

export default dashboard;
