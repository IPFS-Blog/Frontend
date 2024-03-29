import "react-toastify/dist/ReactToastify.css";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";

import AlertDialogSlide from "@/components/alert/AlertDialogSlide";
import { CheckChainIdFunction } from "@/helpers/users/CheckChainIdFunction";
import { LoginFunction } from "@/helpers/users/LoginFunction";
import { clearSubscribers } from "@/store/follow/SubscribersSlice";
import { setLogin, setLogout } from "@/store/UserSlice";

import {
  _apiAuthLogin,
  _apiAuthLogout,
  apiAuthEmailConfirm,
  apiAuthRegister,
  apiAuthTakeNonce,
  apiAuthTakeToken,
} from "../api";
import JoinCoin from "./JoinCoin";

export default function Login() {
  // TODO: Handle function
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const connect = async () => {
      //TODO: 登入狀態
      LoginFunction().then(async userData => {
        if (userData != null) {
          const InChainId = await CheckChainIdFunction();
          if (InChainId == false) {
            setAlertDialogSlide(true);
          } else if (InChainId == "Fix") {
            window.alert("區塊鏈維修中");
          }
          dispatch(setLogin(userData));
        }
      });
      if (typeof window.ethereum === "undefined") {
        // TODO: 未安裝MetaMask導向官網
        window.alert("Please download MetaMask");
        window.open("https://metamask.io/download/", "_blank");
      } else {
      }
    };
    connect();
  }, [dispatch, router]);

  async function connectMetaMask() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // 拿取錢包地址
        const addresses = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAddress(addresses[0]);
        // 是否為會員
        apiAuthTakeNonce(addresses[0])
          .then((res: any) => {
            // 是會員進行認證
            GetSignature(res.data.nonce, addresses[0]);
          })
          .catch(
            // 不是會員跳轉註冊
            () => setRegisterOpen(true),
          );
      } catch (error) {
        toast.error("用戶拒絕了授權!", {
          style: {
            boxShadow: "none",
          },
        });
      }
    } else {
      window.alert("Please download MetaMask");
      window.open("https://metamask.io/download/", "_blank");
    }
  }

  async function GetSignature(nonce: string, address: string) {
    try {
      // 拿Nonce簽名
      const web3 = new Web3(window.ethereum);
      const signer = web3.eth.personal;
      const signature = await signer.sign(nonce, address, "");
      // 索取jwt
      const data = { address: address || null, signature: signature || null };
      if (data.address !== null && data.signature !== null) {
        apiAuthTakeToken(data).then((res: any) => {
          const jwt = res.data.access_token || null;
          if (jwt != null) {
            // 將JWT塞入 Cookie中
            _apiAuthLogin({ jwt });

            // 將傳回來的會員資料轉成json的字串模式
            const UserData = JSON.stringify(res.data.userData);

            // 透過redux儲存會員資料
            dispatch(setLogin(UserData));
            // 將會員資料存在localStorage
            localStorage.setItem("UserData", UserData);
          } else {
            window.alert("請先登入謝謝");
          }
        });
      } else {
        window.alert("網站抓取資料錯誤");
      }
    } catch (error) {
      toast.error("用戶拒絕了授權!", {
        style: {
          boxShadow: "none",
        },
      });
    }
  }

  function sendVerificationCode() {
    //驗證信箱
    const data = {
      email: email || null,
      confirmCode: confirmCode || null,
    };
    if (data.email != null && data.confirmCode != null) {
      apiAuthEmailConfirm(data)
        .then(() => {
          setRegisterOpen(false);
          toast.success("註冊成功", {
            style: {
              boxShadow: "none",
            },
            theme: theme ? "light" : "dark",
          });
        })
        .catch(() => {
          setMessageConfirmCode("驗證失敗");
        });
    }
  }

  async function Register() {
    const data = {
      address: address || null,
      username: username || null,
      email: email || null,
    };
    if (data.address !== null && data.username !== null && data.email !== null) {
      apiAuthRegister(data)
        .then(() => {
          window.alert("發送驗證碼");
        })
        .catch((error: any) => {
          if (error.response && error.response.data.error) {
            const errorMess = error.response.data.error;
            for (let i = 0; i < errorMess.length; i++) {
              if (errorMess[i].includes("email")) {
                setErrorMessageEmail(JSON.stringify(errorMess[i]));
              } else if (errorMess[i].includes("username")) {
                setErrorMessageUsername(JSON.stringify(errorMess[i]));
              }
            }
          }
        });
    }
  }

  // TODO: UI function
  const [registerOpen, setRegisterOpen] = useState(false);
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [messageConfirmCode, setMessageConfirmCode] = useState("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [alertDialogSlide, setAlertDialogSlide] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const User = useSelector((state: any) => state.User);
  function jumpPage() {
    router.push("./docs/NetworkInstructions");
  }
  const registerHandleClose = () => {
    setRegisterOpen(false);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      {!User.profile.login ? (
        <Button
          className="text-gray-900 dark:text-gray-100"
          onClick={() => {
            connectMetaMask();
          }}
        >
          <img src="/MetaMask.png" alt="Null" width={35} height={35} />
          連線
        </Button>
      ) : (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={e => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
              <Avatar src={`${User.profile.picture}`} alt="not found img" className="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            <a href={"/" + User.profile.username} className="no-underline">
              <MenuItem onClick={() => setAnchorElUser(null)}>
                <Typography textAlign="center">{User.profile.username}</Typography>
              </MenuItem>
            </a>
            <MenuItem>
              <JoinCoin />
            </MenuItem>
            <MenuItem
              onClick={() => {
                _apiAuthLogout();
                localStorage.removeItem("UserData");
                dispatch(setLogout());
                dispatch(clearSubscribers());
                if (localStorage.getItem("UserData")) {
                  localStorage.removeItem("UserData");
                }
              }}
            >
              <Typography textAlign="center">登出</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
      {/* 註冊彈跳視窗 */}
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
                onChange={e => setUsername(e.target.value)}
              />
            ) : (
              <TextField
                error
                id="standard-error-helper-text"
                label="Error"
                defaultValue={username}
                helperText={errorMessageUsername}
                variant="standard"
                onChange={() => setErrorMessageUsername("")}
              />
            )}
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
                onChange={e => setEmail(e.target.value)}
              />
            ) : (
              <TextField
                error
                id="standard-error-helper-text"
                label="Error"
                defaultValue={email}
                helperText={errorMessageEmail}
                variant="standard"
                onChange={() => setErrorMessageEmail("")}
              />
            )}
            <div className="flex flex-row">
              {messageConfirmCode === "" ? (
                <TextField
                  autoFocus
                  margin="dense"
                  id="code"
                  label="驗證碼"
                  placeholder="輸入六碼"
                  multiline
                  variant="standard"
                  value={confirmCode}
                  onChange={e => {
                    setConfirmCode(e.target.value);
                  }}
                />
              ) : (
                <TextField
                  error
                  margin="dense"
                  id="name"
                  label="驗證錯誤，請重新輸入"
                  placeholder="輸入六碼"
                  variant="standard"
                  value={confirmCode}
                  onChange={e => {
                    setConfirmCode(e.target.value);
                  }}
                />
              )}
              <Button className="m-2" onClick={Register} color="primary">
                發送驗證碼
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={registerHandleClose}>
            返回
          </Button>
          <Button onClick={sendVerificationCode} color="primary" autoFocus>
            註冊
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="bottom-left" autoClose={3000} />
      {alertDialogSlide ? (
        <AlertDialogSlide
          handlefunction={jumpPage}
          title={<p>請加入 IPFS 幣記 網路</p>}
          message={
            <div>
              <div>因本網站有部分功能需 加入 IPFS幣記 網路</div>
              <div>所以在登入後要求須加入IPFS幣記網路</div>
              <div>點擊 同意 將可以觀看我們提供的文件 &Prime;如何加入我們的Network&Prime;</div>
            </div>
          }
        />
      ) : null}
    </div>
  );
}
