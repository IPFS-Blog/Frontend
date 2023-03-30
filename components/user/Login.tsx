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
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { setLogin } from "@/store/UserSlice";
// TypeScript 中聲明 window.ethereum 這個屬性的類型，讓 TypeScript 知道它的存在。
declare global {
  interface Window {
    ethereum?: any;
  }
}
// API Header設定
const config = { headers: { "Content-Type": "application/json" } };

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
        setAddress((await window.ethereum.request({ method: "eth_requestAccounts" }))[0]);
        CheckCookie();
      } catch (error) {
        //FIXME: 可以新增吐司之類的UI提醒使用者拒絕授權
        console.log("用戶拒絕了授權:\nerror:", error);
      }
    } else {
      window.alert("Please download MetaMask");
      window.open("https://metamask.io/download/", "_blank");
    }
  }
  function JwtToCookie(JWT: string) {
    axios.post("/api/auth/login", { JWT }).then(response => console.log(response));
  }
  function CheckCookie() {
    // 從Cookie撈看看有沒有Token
    axios
      .get("/api/user")
      .then(res => CheckToken(res.data.token))
      .then(() => login())
      .catch(errorMessage => {
        console.log("CheckCookie failed: 沒有Cookie" + errorMessage);
        CheckIsUser();
      });
  }
  function CheckToken(token: string) {
    // FIXME: 向後端確認token 是否是正確的
    const data = { token };
    axios
      .post(`http://${process.env.NEXT_PUBLIC_API}/users/register`, data, config)
      .then(res => JwtToCookie(res.data.JWT))
      .catch(errorMessage => {
        console.log(errorMessage.message);
        CheckIsUser();
      });
  }
  function CheckIsUser() {
    axios
      .get(`http://192.168.1.88:3000/auth/login/${address}`)
      .then(res => {
        console.log("存在用戶 :", res);
        GetSignature(res.data.nonce);
      })
      .catch(err => {
        // TODO: 未註冊過=>跳轉註冊畫面
        console.log("滾去註冊:", err);
        setOpen(true);
      });
  }
  async function GetSignature(nonce: string) {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const signer = web3.eth.personal;
    GetToken(await signer.sign(nonce, accounts[0], ""));
  }
  function GetToken(signature: string) {
    const data = { address: address[0], signature };
    console.log("Address:", address);
    console.log("signature:", signature);
    console.log("DATA:", data);
    axios
      .post(`http://${process.env.NEXT_PUBLIC_API}/auth/login/token`, data, config)
      .then(res => {
        console.log("成功登入並設定cookie", res.data);
        JwtToCookie(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  function sendVerificationCode() {
    //先檢查信箱
    //確認無誤後發送信箱
  }

  async function Register() {
    const data = { address, username, email };
    axios
      .post(`http://${process.env.NEXT_PUBLIC_API}/users/register`, data, config)
      .then(res => {
        // const token = res.data.token;
        // axios.post("/api/auth/login", token);
        // TODO:註冊成功
        console.log("正確:", res);
      })
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
          setOpen(false);
          console.log("錯誤!!!!!!!!!!!!!!", error.message);
          console.log("錯誤", error.message);
        }
      });
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
  function TEST() {
    axios
      .get("/api/user")
      .then(res => {
        console.log(res);
      })
      .then(() => login())
      .catch(errorMessage => {
        console.log(errorMessage.message);
      });
  }
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
          TEST();
        }}
      >
        TEST
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={Register} color="primary" autoFocus>
            註冊
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
