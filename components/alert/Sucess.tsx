import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import * as React from "react";

export default function SimpleFaucet(props: any) {
  const [alertEditSucess, setalertEditSucess] = useState(true);
  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setalertEditSucess(false);
  };
  //material ui toast
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar open={alertEditSucess} autoHideDuration={6000} onClose={alertHandleClose}>
      <Alert onClose={alertHandleClose} severity="success" sx={{ width: "100%" }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
