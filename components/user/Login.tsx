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
import React, { useState } from "react";

// TypeScript 中聲明 window.ethereum 這個屬性的類型，讓 TypeScript 知道它的存在。
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Register() {
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  //const [errorMessageAddress, seterrorMessageAddress] = useState("");
  const [errorMessageUsername, seterrorMessageUsername] = useState("");
  const [errorMessageEmail, seterrorMessageEmail] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      try {
        // 使用 MetaMask 的 Web3 Provider 發起請求，詢問用戶是否授權網站使用其帳戶
        // 如果用戶同意，將返回用戶的帳戶地址
        setAddress(await window.ethereum.request({ method: "eth_requestAccounts" }));
        // 如果沒有出錯，表示 MetaMask 已經授權網站使用用戶的帳戶
        setOpen(true);
      } catch (error) {
        // 如果用戶拒絕了授權，或者發生了其他錯誤，在控制台輸出錯誤
        console.log(error);
      }
    } else {
      window.alert("Please download MetaMask");
      window.open("https://metamask.io/download/", "_blank");
    }
  }

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

  function sendVerificationCode() {
    //先檢查信箱
    //確認無誤後發送信箱
  }

  function handleSubmit() {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: {
        address: address,
        username: username,
        email: email,
      },
      url: "http://192.168.1.88:3000/users/register",
    };

    axios(options)
      .then(res => {
        console.log("正確:", res);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const StatusCode = error.response.data;
          console.log("HTTP 回應代碼", StatusCode);
          console.log("錯誤訊息", error);
          //FIXME:查看錯誤來指定欄位上出現錯誤
          if (error.includes("信箱")) {
            seterrorMessageEmail(error);
          } else if (error.includes("名稱")) {
            seterrorMessageUsername(error);
          } else {
            seterrorMessage(error);
          }
        } else {
          console.log("錯誤", error.message);
        }
      });
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          connectMetaMask();
        }}
      >
        Connect
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
