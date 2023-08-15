import { useMediaQuery } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

//import { _apiCheckJwt, apiArticleCommentEdit } from "@/components/api";

export default function EditCommentsButton(props: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="responsive-dialog-title"
      className="fixed h-screen w-screen "
    >
      <DialogTitle id="responsive-dialog-title" className="flex justify-center bg-gray-200 font-semibold">
        {props}
      </DialogTitle>
      <DialogContent className="bg-gray-200 md:w-full lg:w-96"></DialogContent>
    </Dialog>
  );
}
