import { Edit } from "@mui/icons-material";
import { AlertProps, Box, IconButton, Snackbar, TextField } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "@/styles/EditProfile.module.css";

import { _apiCheckJwt, apiEditProfile } from "../api";

export default function Editprofile() {
  // TODO: Handle funtion
  const [username, setusername] = useState(""); // 使用者名稱
  const [email, setemail] = useState(""); // 電子信箱
  const [Introduction, setIntroduction] = useState(""); // 個人簡介
  const [Label, setLabel] = useState(""); // 添加標籤
  const [SocialMedia, setSocialMedia] = useState(""); // 社群關係連結

  const User = useSelector((state: any) => state.User);
  const address = User.profile.address !== undefined ? User.profile.address : "";
  async function EditProfile() {
    let jwt = "";
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt));
    const data = { username, email };
    apiEditProfile(jwt, data)
      .then(() => setalertEditSucess(true))
      .catch(() => setalertEditFail(true));
    handleClose();
  }

  // TODO: UI funtion
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("lg");
  const [alertEditFail, setalertEditFail] = useState(false);
  const [alertEditSucess, setalertEditSucess] = useState(false);
  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setalertEditFail(false);
    setalertEditSucess(false);
  };

  //material ui toast
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
          編輯個人資料
        </Button>
        <Dialog
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"> 修改個人資料 </DialogTitle>
          <DialogContent>
            {/* 彈窗後整個畫面設計 */}
            {/* FIXME: 記得刪除，因為未使用不能commit */}
            {Introduction}
            {Label}
            {SocialMedia}
            {/* FIXME: 記得刪除，因為未使用不能commit */}
            <div className={styles.all}>
              <div className="h-auto w-full">
                <div className="w-full flex-col">
                  {/* 左上角 卡片與大頭貼 */}
                  <div className={styles.roundedcard}>
                    <div className={styles.photostickers}></div>
                    {/* 右上角 4個長方形提示框 */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      pl={60}
                      pt={1}
                      mt={1}
                      width="100%"
                    >
                      <Box alignItems="center" bgcolor="#F0F0F0" borderRadius={5} mt={1} width="600px">
                        {/* FIXME:IconButton需要寫功能 */}
                        <IconButton>
                          <Edit />
                          變更頭像
                        </IconButton>
                      </Box>
                      <Box className={styles.promptbox}>推薦:正方形.JPG.PNG, 至少1,000像素</Box>
                      <Box bgcolor="#F0F0F0" borderRadius={5} width="600px" mt={1}>
                        <IconButton>
                          <Edit />
                          變更卡片背景
                        </IconButton>
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
                        defaultValue={address}
                      />
                    </Box>
                    <p className="text-lg text-gray-300">不可更改</p>
                  </div>
                  {/* 下方5個輸入框 */}
                  <div>
                    {/* 名稱部分 */}
                    <div className={styles.wordsizediv}>
                      <div className="flex items-center justify-between">
                        <div className={styles.wordsize}>名稱</div>
                      </div>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="請輸入名稱"
                        variant="outlined"
                        onChange={e => setusername(e.target.value)}
                      />
                      <span className="p-2 text-base text-gray-300">2-20字元</span>
                    </div>
                    {/* email 部分 */}
                    <div className={styles.wordsizediv}>
                      <div className="flex items-center justify-between">
                        <div className={styles.wordsize}>電子信箱</div>
                        {/* FIXME: 按下發送驗證碼 要多一格填驗證碼的輸入框 */}
                        <button className="text-lg">發送驗證碼</button>
                      </div>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="請輸入電子信箱"
                        variant="outlined"
                        onChange={e => setemail(e.target.value)}
                      />
                    </div>
                    {/* 個人簡介部分 */}
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>個人簡介</div>
                      <p></p>
                      <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="請輸入個人簡介"
                        multiline
                        rows={6}
                        onChange={e => setIntroduction(e.target.value)}
                      />
                      <span className="p-2 text-base text-gray-300">建議50字以內,最長200字</span>
                      <p></p>
                    </div>
                    {/* 輸入標籤部分 */}
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>添加標籤</div>
                      <p></p>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="請輸入標籤"
                        variant="outlined"
                        onChange={e => setLabel(e.target.value)}
                      />
                      <span className="p-2 text-base text-gray-300">建議至多5個主標籤</span>
                      <p></p>
                    </div>
                    {/* 社群關係連結 */}
                    <div className={styles.wordsizediv}>
                      <div className={styles.wordsize}>社群關係連結</div>
                      <p></p>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="請輸入社群連結"
                        variant="outlined"
                        onChange={e => setSocialMedia(e.target.value)}
                      />
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
            <Button
              autoFocus
              onClick={() => {
                setSocialMedia("");
                setLabel("");
                setIntroduction("");
              }}
            >
              重置
            </Button>
            {/* FIXME: API 傳送格式: 名稱、email、驗證碼、個人簡介、添加標籤、社群關係連結*/}
            <Button onClick={EditProfile} autoFocus>
              確認
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={alertEditFail} autoHideDuration={6000} onClose={alertHandleClose}>
          <Alert onClose={alertHandleClose} severity="error" sx={{ width: "100%" }}>
            編輯錯誤!
          </Alert>
        </Snackbar>
        <Snackbar open={alertEditSucess} autoHideDuration={6000} onClose={alertHandleClose}>
          <Alert onClose={alertHandleClose} severity="success" sx={{ width: "100%" }}>
            編輯成功!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
