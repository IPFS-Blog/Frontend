import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

import styles from "@/styles/user_wallet.module.css";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("lg");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
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
          <DialogTitle id="responsive-dialog-title"> 個人錢包 </DialogTitle>
          <DialogContent>
            <div className={styles.all}>
              <span className="text-3xl font-bold">個人錢包</span>
              <div className="ml-7  mt-12">
                <div>
                  <span className="text-2xl font-bold">資產總覽</span>
                </div>
              </div>
              {/* 交易紀錄按鈕 */}
              <div className="mr-5 flex justify-end">
                <button className={styles.transrecordbutton}>交易紀錄</button>
              </div>
              {/* 不同虛擬幣的圖案以及總額 */}
              <div className={styles.coincolumn}>
                <div className={styles.coinimage}></div>
                <span className={styles.coinword}>10.2210</span>
              </div>
              <div className={styles.coincolumn}>
                <div className={styles.coinimage}></div>
                <span className={styles.coinword}>10.0010</span>
              </div>
              <div className={styles.buttondiv}>
                <button className={styles.backbutton}>返回</button>
                <button className={styles.surebutton}>確認</button>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              返回
            </Button>
            <Button onClick={handleClose} autoFocus>
              確認
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
