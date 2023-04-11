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
        {/*  dialog部分皆為彈窗*/}
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
            {/* 彈窗後整個畫面設計 */}
            <div className={styles.all}>
              <div className="ml-8">
                <span className="text-2xl font-bold">修改個人資料</span>
                <div className="ml-10 mt-10">
                  {/* 左上角 卡片與大頭貼 */}
                  <div className={styles.roundedcard}>
                    <div className={styles.photostickers}></div>
                    {/* 右上角 4個長方形提示框 */}
                    <Box display="flex" flexDirection="column" justifyContent="center" pl={60} pt={1} width="200%">
                      <Box alignItems="center" bgcolor="#F0F0F0" borderRadius={10} width="600px">
                        {/* FIXME:IconButton需要寫功能 */}
                        <IconButton>
                          <Edit />
                        </IconButton>
                        變更頭像
                      </Box>
                      <Box className={styles.promptbox}>推薦:正方形.JPG.PNG, 至少1,000像素</Box>
                      <Box bgcolor="#F0F0F0" borderRadius={10} width="600px">
                        <IconButton>
                          <Edit />
                        </IconButton>
                        變更卡片背景
                      </Box>
                      <Box className={styles.promptbox}>推薦:長方形.JPG.PNG, 至少1,000像素</Box>
                    </Box>
                  </div>
                  {/*錢包地址(不可更改) FIXME:後續需要錢包地址*/}
                  <div className="mt-12">
                    <Box className={styles.walletaddress}>
                      <TextField
                        className={styles.addresswidth}
                        disabled
                        id="outlined-disabled"
                        defaultValue="0x12345678"
                      />
                    </Box>
                    <p className="text-lg text-gray-300">不可更改</p>
                  </div>
                  <p></p>
                  {/* 下方5個輸入框 */}
                  <div>
                    {/* 名稱部分 */}
                    <div className={styles.wordsizediv}>
                      <div className="flex items-center justify-between">
                        <div className={styles.wordsize}>名稱</div>
                        {/* FIXME:checkname功能需再加  */}
                        <button className="h-10 w-10 text-lg">checkname</button>
                      </div>
                      <TextField fullWidth id="outlined-basic" label="請輸入名稱" variant="outlined" />
                      <span className="text-lg text-gray-300">2-20字元</span>
                    </div>
                    {/* email 部分 */}
                    <div className={styles.wordsizediv}>
                      <div className="flex items-center justify-between">
                        <div className={styles.wordsize}>Email</div>
                        {/* FIXME:checkemail功能需再加   */}
                        <button className="h-10 w-10 text-lg">checkemail</button>
                      </div>
                      <TextField fullWidth id="outlined-basic" label="請輸入email" variant="outlined" />
                    </div>
                    {/* 個人簡介部分 */}
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>個人簡介</div>
                      <p></p>
                      <TextField fullWidth id="outlined-multiline-static" label="請輸入個人簡介" multiline rows={6} />
                      <span className="text-lg text-gray-300">建議50字以內,最長200字</span>
                      <p></p>
                    </div>
                    {/* 輸入標籤部分 */}
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>添加標籤</div>
                      <p></p>
                      <TextField fullWidth id="outlined-basic" label="請輸入標籤" variant="outlined" />
                      <span className="text-lg text-gray-300">建議至多5個主標籤</span>
                      <p></p>
                    </div>
                    {/* 社群關係連結 */}
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>社群關係連結</div>
                      <p></p>
                      <TextField fullWidth id="outlined-basic" label="請輸入社群連結" variant="outlined" />
                      <p></p>
                    </div>
                    {/* 右下角重置與確認按鈕 */}
                    <div className={styles.buttondiv}>
                      <button className={styles.resetbutton}>重置</button>
                      {/* FIXME:API */}
                      <button className={styles.surebutton}>確認</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              取消
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
