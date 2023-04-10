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
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { setLogin, setLogout } from "@/store/UserSlice";

import { _apiAuthLogin, _apiAuthLogout, apiAuthTakeNonce, apiAuthTakeToken, apiUserRegister } from "../api";

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
        // 是否為會員
        apiAuthTakeNonce(addresses[0])
          .then(res => {
            // 是會員進行認證
            GetSignature(res.data.nonce, addresses[0]);
          })
          .catch(
            // 不是會員跳轉註冊
            () => registerSetOpen(true),
          );
      } catch (error) {
        handleClick();
      }
    } else {
      window.alert("Please download MetaMask");
      window.open("https://metamask.io/download/", "_blank");
    }
  }

  async function GetSignature(nonce: string, address: string) {
    // 拿Nonce簽名
    const web3 = new Web3(window.ethereum);
    const signer = web3.eth.personal;
    const signature = await signer.sign(nonce, address, "");
    // 索取jwt
    const data = { address: address, signature };
    apiAuthTakeToken(data).then(res => {
      const jwt = res.data.access_token;
      // 將JWT塞入 Cookie中
      _apiAuthLogin({ jwt });

      // 將傳回來的會員資料轉成json的字串模式
      const UserData = JSON.stringify(res.data.userData);
      // 透過redux儲存會員資料
      dispatch(setLogin(UserData));
      // 將會員資料存在localStroage
      localStorage.setItem("UserData", UserData);
    });
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
      <Button
        variant="outlined"
        onClick={() => {
          _apiAuthLogout();
          dispatch(setLogout());
        }}
      >
        <Image src="/MetaMask.png" alt="Null" width={35} height={35}></Image>
        登出
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
