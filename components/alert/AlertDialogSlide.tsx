import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { ReactElement, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props: any) {
  const [open, setOpen] = useState(true);
  const { handlefunction } = props;

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    handlefunction();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="bg-blue-500 text-white hover:bg-blue-700">
            取消
          </Button>
          <Button onClick={handleAgree} className="bg-green-700 text-white hover:bg-green-900">
            同意
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
