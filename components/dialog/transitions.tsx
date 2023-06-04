import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

//TODO: 使用到這個彈跳視窗 需要傳這些參數資 title contents buttonL buttonR

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonLClick = () => {
    props.onResponse(true); // 返回 true
    handleClose();
  };

  const handleButtonRClick = () => {
    props.onResponse(false); // 返回 false
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
          <DialogContentText id="alert-dialog-slide-description">{props.contents}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleButtonLClick}>{props.buttonL}</Button>
          <Button onClick={handleButtonRClick}>{props.buttonR}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
