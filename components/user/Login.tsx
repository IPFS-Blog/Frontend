import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { setLogin } from "@/store/UserSlice";

import { _apiAuthLogin, _apiIsUser, apiAuthTakeNonce, apiAuthTakeToken, apiUserRegister } from "../api";
// TypeScript 中聲明 window.ethereum 這個屬性的類型，讓 TypeScript 知道它的存在。

// API Header設定
const config = { headers: { "Content-Type": "application/json" } };
//material ui toast
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  // TODO: Handle funcion
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // 拿取錢包地址
        const addresses = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAddress(addresses[0]);
        CheckCookie(addresses[0]);
      } catch (error) {
        handleClick();
      }
    } else {
      window.alert("Please download MetaMask");
      window.open("https://metamask.io/download/", "_blank");
    }
  }
  async function JwtToCookie(JWT: string) {
    await _apiAuthLogin({ JWT });
    login();
  }
  function CheckCookie(address: string) {
    // 從Cookie撈看看有沒有Token
    _apiIsUser()
      .then(res => {
        CheckToken(res.data.token, address);
      })
      .catch(() => {
        CheckIsUser(address);
      });
  }
  function CheckToken(token: string, address: string) {
    // FIXME: 向後端確認token 是否是正確的
    const data = { token };
    axios
      .post(`http://${process.env.NEXT_PUBLIC_API}/users/register`, data, config)
      .then(res => JwtToCookie(res.data.JWT))
      .catch(() => {
        CheckIsUser(address);
      });
  }
  function CheckIsUser(address: string) {
    apiAuthTakeNonce(address)
      .then(res => {
        GetSignature(res.data.nonce, address);
      })
      .catch(() => registerSetOpen(true));
  }
  async function GetSignature(nonce: string, address: string) {
    const web3 = new Web3(window.ethereum);
    const signer = web3.eth.personal;
    GetToken(await signer.sign(nonce, address, ""), address);
  }
  function GetToken(signature: string, address: string) {
    const data = { address: address, signature };

    apiAuthTakeToken(data)
      .then(res => {
        JwtToCookie(res.data);
      })
      .catch();
  }
  function sendVerificationCode() {
    //先檢查信箱
    //確認無誤後發送信箱
  }

  async function Register() {
    const data = { address, username, email };
    apiUserRegister(data)
      //FIXME: 新增一個註冊成功的UI
      .then()
      .catch(error => {
        console.log("data", data);
        console.log(error);
        if (error.response && error.response.data.message) {
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
          console.log("錯誤!!!!!!!!!!!!!!", error.message);
          console.log("錯誤", error.message);
        }
      });

    registerSetOpen(false);
  }
  // 登入成功設定
  function login() {
    dispatch(
      setLogin({
        address,
        username,
        login: true,
      }),
    );
  }
  // TODO: UI function
  const [registerOpen, registerSetOpen] = useState(false);
  const [alertOpen, alertSetOpen] = useState(false);
  const [errorMessageUsername, seterrorMessageUsername] = useState("");
  const [errorMessageEmail, seterrorMessageEmail] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const registerHandleClose = () => {
    registerSetOpen(false);
  };

  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    alertSetOpen(false);
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

  const handleClick = () => {
    alertSetOpen(true);
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
      <Dialog
        fullScreen={fullScreen}
        open={registerOpen}
        onClose={registerHandleClose}
        onSubmit={Register}
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
          <Button onClick={alertHandleClose} color="primary">
            取消
          </Button>
          <Button onClick={Register} color="primary" autoFocus>
            註冊
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={alertHandleClose}>
        <Alert onClose={alertHandleClose} severity="error" sx={{ width: "100%" }}>
          用戶拒絕了授權!
        </Alert>
      </Snackbar>
    </div>
  );
}
