import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";

// import { setLogin } from "@/store/UserSlice";
// TypeScript 中聲明 window.ethereum 這個屬性的類型，讓 TypeScript 知道它的存在。
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Login() {
  // TODO: Handle funcion
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const dispatch = useDispatch();
  // API Header設定
  const config = { headers: { "Content-Type": "application/json" } };
  function setcookie() {
    const user = axios.post("/api/auth/login", "");
    console.log(user);
  }
  async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      try {
        // 使用 MetaMask 的 Web3 Provider 發起請求，詢問用戶是否授權網站使用其帳戶
        // 如果用戶同意，將返回用戶的帳戶地址
        setAddress(await window.ethereum.request({ method: "eth_requestAccounts" }));
        // 有無token
        // const HasToken = await axios.get("/api/user");
        // if (HasToken.data.message == "success") {
        // const token = HasToken.data.token;
        // await axios.post("/api/auth/login", token);
        // TODO:登入成功
        // FIXME: TOKEN中解析 當初是說username而已
        //   login();
        // }
        // TODO:驗證未通過
        // if (HasToken.data.message == "Invalid JWT") {
        //   // FIXME: API問候端這個錢包 有沒有註冊過
        //   const data = { address };
        //   await axios
        //     .post(`${process.env.NEXT_PUBLIC_API}/users/register`, data, config)
        //     .then(res => {
        //       const token = res.data.token;
        //       axios.post("/api/auth/login", token);
        //       // TODO:登入成功
        //       // login();
        //     })
        //     .catch(err => {
        //       // TODO: 未註冊過=>跳轉註冊畫面
        //       setOpen(true);
        //       console.log(err);
        //     });
        // }
      } catch (error) {
        //FIXME: 可以新增吐司之類的UI提醒使用者拒絕授權
        console.log("用戶拒絕了授權:\nerror:", error);
      }
    } else {
      window.alert("Please download MetaMask");
      window.open("https://metamask.io/download/", "_blank");
    }
  }

  function sendVerificationCode() {
    //先檢查信箱
    //確認無誤後發送信箱
  }

  async function handleSubmit() {
    const data = { address, username, email };
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/users/register`, data, config)
      .then(res => {
        // const token = res.data.token;
        // axios.post("/api/auth/login", token);
        // TODO:登入成功
        console.log("正確:", res);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const StatusCode = error.response.data;
          console.log("HTTP 回應代碼", StatusCode);
          console.log("錯誤訊息", error);
          //查看錯誤來指定欄位上出現錯誤
          const errorMess = error.respose.data.message;
          for (let i = 0; i < errorMess.length; i++) {
            console.log(i);
            if (errorMess[i].includes("email")) {
              seterrorMessageEmail(JSON.stringify(errorMess[i]));
            } else if (errorMess[i].includes("name")) {
              seterrorMessageUsername(JSON.stringify(errorMess[i]));
            } else {
              seterrorMessage(JSON.stringify(errorMess[i]));
            }
          }
        } else {
          setOpen(false);
          console.log("錯誤!!!!!!!!!!!!!!", error.message);
          console.log("錯誤", error.message);
        }
      });
  }
  // 登入成功設定
  // function login() {
  //   dispatch(
  //     setLogin({
  //       address,
  //       username,
  //       login: true,
  //     }),
  //   );
  // }
  // TODO: UI function
  const [open, setOpen] = useState(false);
  const [errorMessageUsername, seterrorMessageUsername] = useState("");
  const [errorMessageEmail, seterrorMessageEmail] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          connectMetaMask();
        }}
      >
        <Image src="/MetaMask.png" alt="Null" width={35} height={35}></Image>
        Connect
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setcookie();
        }}
      >
        setcookie
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle className="text-center font-bold" id="responsive-dialog-title">
          {"註冊"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <span>ID：</span>
              <DialogContentText onChange={handleAddressChange}> {address} </DialogContentText>
            </div>
            {errorMessageEmail === "" ? (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="信箱"
                type="email"
                placeholder="name@company.com"
                fullWidth
                variant="standard"
                required
                value={email}
                onChange={handleEmailChange}
              />
            ) : (
              <TextField
                error
                id="standard-error-helper-text"
                label="Error"
                defaultValue={email}
                helperText={errorMessageEmail}
                variant="standard"
              />
            )}
            <div className="flex flex-row">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="驗證碼"
                placeholder="輸入六碼"
                multiline
                variant="standard"
              />
              <Button className="m-2" onClick={sendVerificationCode} color="primary">
                發送驗證碼
              </Button>
            </div>
            {errorMessageUsername === "" ? (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="使用者名稱"
                placeholder="輸入使用者名稱"
                variant="standard"
                required
                value={username}
                onChange={handleUsernameChange}
              />
            ) : (
              <TextField
                error
                id="standard-error-helper-text"
                label="Error"
                defaultValue={username}
                helperText={errorMessageUsername}
                variant="standard"
              />
            )}
          </div>
          {errorMessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            註冊
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
