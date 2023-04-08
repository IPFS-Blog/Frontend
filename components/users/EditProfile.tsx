import { Edit } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

import styles from "@/styles/EditProfile.module.css";

export default function Editprofile() {
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
        <Button variant="outlined" onClick={handleClickOpen}>
          Open responsive dialog
        </Button>
        <Dialog
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"EditProfile"}</DialogTitle>
          <DialogContent>
            <div className={styles.all}>
              <div className="ml-8">
                <span className="text-2xl font-bold">修改個人資料</span>
                <div className="ml-10 mt-10">
                  <div className={styles.whitetri}>
                    <div className={styles.graycir}></div>

                    <Box display="flex" flexDirection="column" justifyContent="center" pl={60} pt={1} width="200%">
                      <Box alignItems="center" bgcolor="#F0F0F0" borderRadius={10} width="600px">
                        <IconButton>
                          <Edit />
                        </IconButton>
                        變更頭像
                      </Box>
                      <Box className={styles.graylongtri}>推薦:正方形.JPG.PNG, 至少1,000像素</Box>
                      <Box bgcolor="#F0F0F0" borderRadius={10} width="600px">
                        <IconButton>
                          <Edit />
                        </IconButton>
                        變更卡片背景
                      </Box>
                      <Box className={styles.graylongtri}>推薦:長方形.JPG.PNG, 至少1,000像素</Box>
                    </Box>
                  </div>
                  <div className="mt-12">
                    <Box className={styles.walletaddress}>
                      <TextField
                        className={styles.addresswidth}
                        disabled
                        id="outlined-disabled"
                        defaultValue="0x123456"
                      />
                    </Box>
                    <p className="ml-12 text-lg text-gray-300">不可更改</p>
                  </div>
                  <p></p>
                  <div>
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>名稱</div>
                      <p></p>
                      <TextField fullWidth id="outlined-basic" label="請輸入名稱" variant="outlined" />
                      <span className="text-lg text-gray-300">2-20字元</span>
                      <p></p>
                    </div>
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>個人簡介</div>
                      <p></p>
                      <TextField fullWidth id="outlined-multiline-static" label="請輸入個人簡介" multiline rows={6} />
                      <span className="text-lg text-gray-300">建議50字以內,最長200字</span>
                      <p></p>
                    </div>
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>添加標籤</div>
                      <p></p>
                      <TextField fullWidth id="outlined-basic" label="請輸入標籤" variant="outlined" />
                      <span className="text-lg text-gray-300">建議至多5個主標籤</span>
                      <p></p>
                    </div>
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>社群關係連結</div>
                      <p></p>
                      <TextField fullWidth id="outlined-basic" label="請輸入社群連結" variant="outlined" />
                      <p></p>
                    </div>
                    <div className={styles.buttondiv}>
                      <button className={styles.resetbutton}>重置</button>
                      <button className={styles.surebutton}>確認</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
