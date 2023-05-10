import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import * as React from "react";

export default function SimpleFaucet() {
  const [alertEditFail, setalertEditFail] = useState(false);
  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setalertEditFail(false);
  };
  //material ui toast
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar open={alertEditFail} autoHideDuration={6000} onClose={alertHandleClose}>
      <Alert onClose={alertHandleClose} severity="error" sx={{ width: "100%" }}>
        編輯錯誤!
      </Alert>
    </Snackbar>
  );
}