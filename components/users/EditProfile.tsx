import "react-toastify/dist/ReactToastify.css";

import { Edit } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CldUploadWidget } from "next-cloudinary";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import styles from "@/styles/users/EditProfile.module.css";

import { _apiCheckJwt, apiUserEditProfile } from "../api";

export default function Editprofile() {
  // TODO: Handle function
  const User = useSelector((state: any) => state.User);

  const [username, setUsername] = useState(User.profile.username); // 使用者名稱
  const [email, setemail] = useState(User.profile.email); // 電子信箱
  const [Introduction, setIntroduction] = useState(""); // 個人簡介
  const [Label, setLabel] = useState(""); // 添加標籤
  const [SocialMedia, setSocialMedia] = useState(""); // 社群關係連結
  const [picture, setPicture] = useState(User.profile.picture); // 使用者照片
  const [background, setBackground] = useState(User.profile.background); //使用者背景

  const address = User.profile.address !== undefined ? User.profile.address : "";
  async function EditProfile() {
    let jwt = null;
    await _apiCheckJwt().then((res: any) => (jwt = res.data.jwt || null));
    const data = { username, email, picture, background };
    if (jwt != null) {
      apiUserEditProfile(jwt, data)
        .then(() =>
          toast.info("編輯成功", {
            style: {
              padding: "16px",
              boxShadow: "none",
            },
          }),
        )
        .catch((error: any) => {
          toast.error("編輯失敗", {
            style: {
              boxShadow: "none",
            },
          }),
            console.log(error);
        });
    } else {
      window.alert("請先登入謝謝");
    }
    setOpen(false);
  }

  // TODO: UI function
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("lg");

  return (
    <>
      <div>
        {/*  dialog部分皆為彈窗*/}
        <Button
          className="items-center rounded-lg bg-gray-200 py-2 px-20 text hover:bg-gray-300"
          onClick={() => setOpen(true)}
        >
          個人資料
        </Button>
        <Dialog
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"> 修改個人資料 </DialogTitle>
          <DialogContent>
            {/* 彈窗後整個畫面設計 */}
            {/* FIXME: 記得刪除，因為未使用不能commit */}
            {Introduction}
            {Label}
            {SocialMedia}
            <div className="w-full">
              <div className="h-auto w-full">
                <div className="w-full flex-col">
                  <div className="flex">
                    {/* 背景 */}
                    <div className="flex w-1/2 items-center">
                      <div
                        style={{ backgroundImage: `url(${User.profile.background})` }}
                        className="mr-2 h-full w-full rounded-md bg-cover bg-center bg-no-repeat drop-shadow-xl"
                      >
                        <div className="inset-0 h-full w-full rounded-lg bg-gray-300 opacity-75 transition group-hover:opacity-75"></div>
                        {/* 頭貼 */}
                        <Avatar
                          src={User.profile.picture}
                          className="m-2 h-auto w-1/3 -translate-y-40 rounded-lg"
                          alt="Picture of the author"
                        />
                      </div>
                    </div>
                    {/* 右上角 4個長方形提示框 */}
                    <div className="w-1/2">
                      <Box alignItems="center" bgcolor="#F0F0F0" borderRadius={5} mt={1}>
                        <CldUploadWidget
                          uploadPreset="user-picture"
                          onUpload={(result: any) => setPicture(result.info.url)}
                        >
                          {({ open }: any) => {
                            function handleOnClick(e: any) {
                              e.preventDefault();
                              open();
                            }
                            return (
                              <IconButton onClick={handleOnClick}>
                                <Edit />
                                變更頭像
                              </IconButton>
                            );
                          }}
                        </CldUploadWidget>
                      </Box>
                      <Box className={styles.promptbox}>推薦:正方形.JPG.PNG, 至少1,000像素</Box>
                      <Box bgcolor="#F0F0F0" borderRadius={5} mt={1}>
                        <CldUploadWidget
                          uploadPreset="user-picture"
                          onUpload={(result: any) => setBackground(result.info.url)}
                        >
                          {({ open }: any) => {
                            function handleOnClick(e: any) {
                              e.preventDefault();
                              open();
                            }
                            return (
                              <IconButton onClick={handleOnClick}>
                                <Edit />
                                變更卡片背景
                              </IconButton>
                            );
                          }}
                        </CldUploadWidget>
                      </Box>
                      <Box className={styles.promptbox}>推薦:長方形.JPG.PNG, 至少1,000像素</Box>
                    </div>
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
                        defaultValue={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                      <span className="p-2 text-base text-gray-300">2-20字元</span>
                    </div>
                    {/* email 部分 */}
                    <div className={styles.wordsizediv}>
                      <div className="flex items-center justify-between">
                        <div className={styles.wordsize}>電子信箱(不可更改)</div>
                      </div>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        defaultValue={email}
                        onChange={e => setemail(e.target.value)}
                        disabled
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
            <Button autoFocus onClick={() => setOpen(false)}>
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
        <ToastContainer position="bottom-left" autoClose={3000} />
      </div>
    </>
  );
}
