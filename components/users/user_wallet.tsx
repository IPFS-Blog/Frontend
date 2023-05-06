import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="">
        {/*  dialog部分皆為彈窗*/}
        <Button variant="outlined" onClick={handleClickOpen}>
          個人錢包
        </Button>
        <Dialog
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" className="bg-gray-200 font-semibold">
            個人錢包
          </DialogTitle>
          <DialogContent className="bg-gray-200 md:w-full ">
            <div>
              <div className="flex flex-row justify-between">
                <p className="mx-2 text-xl font-semibold">資產總覽</p>
                <button className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100">
                  交易紀錄
                </button>
              </div>
              {/* 不同虛擬幣的圖案以及總額 */}
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold hover:text-lg">
                <div className="mx-2 h-9 w-9 border-r-2 bg-gray-300"></div>
                <div className="flex w-full justify-between">
                  <p>10.2210</p>
                  <p>AC</p>
                </div>
              </div>
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold hover:text-lg">
                <div className="mx-2 h-9 w-9 border-r-2 bg-gray-300"></div>
                <div className="flex w-full justify-between">
                  <p>10.2210</p>
                  <p>ETH</p>
                </div>
              </div>
              {/* 交換幣值 FIXME:需要個人ETH的金額(超出交換金額)*/}
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold  ">
                <div className="flex w-full justify-between">
                  <p className="mx-2 py-1">ETH</p>
                  <div className="flex items-center">
                    <p className="mr-2">交換</p>
                    <input type="number" className="rounded border border-gray-400 px-2 py-1" />
                    <p className="ml-2">AC</p>
                    <button className="ml-2 rounded bg-gray-400 py-1 px-3 text-black hover:bg-gray-500">交換</button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="bg-gray-200">
            <Button
              className="rounded border bg-gray-300 py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
              onClick={handleClose}
              autoFocus
            >
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
