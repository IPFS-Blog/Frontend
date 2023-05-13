import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
//TODO: 響應式
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import { setLogin } from "@/store/UserSlice";

import MyToken from "../../truffle/build/contracts/MyToken.json";

export default function JoinCoin() {
  const [, setAccount] = useState("");
  const dispatch = useDispatch();
  const [alertJoinCoinFail, setalertJoinCoinFail] = useState(false);

  const [alertJoinCoinSucess, setalertJoinCoinSucess] = useState(false);

  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setalertJoinCoinSucess(false);
    setalertJoinCoinFail(false);
  };
  const [, setAC] = useState("");
  useEffect(() => {
    //TODO: 登入狀態
    const login = async () => {
      let jwt = "";
      const res_CheckJwt = await _apiCheckJwt();
      jwt = res_CheckJwt.data.jwt;
      const res_GetUserData = await apiUserGetUserData(jwt);
      dispatch(setLogin(JSON.stringify(res_GetUserData.data.userData)));
    };
    const connect = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const web3 = new Web3(window && window.ethereum);
          if (web3) {
            // TODO: 拿取address
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
            // TODO: 拿取Eth & AC
            const ethBalance = await web3.eth.getBalance(accounts[0]);
            setETH(await web3.utils.fromWei(ethBalance));
            const MyTokenabi = MyToken.abi.map((item: any) => {
              return {
                inputs: item.inputs,
                name: item.name,
                outputs: item.outputs,
                stateMutability: item.stateMutability,
                type: item.type,
              };
            });
            const MyTokenContract = new web3.eth.Contract(MyTokenabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
            setAC(await MyTokenContract.methods.balanceOf(accounts[0]).call());
          }
        } catch {
          // FIXME: Lin 登入失敗UI
        }
      } else {
        window.alert("Please download MetaMask");
        window.open("https://metamask.io/download/", "_blank");
      }
    };
    login();
    connect();
  }, [dispatch]);
  const [, setETH] = useState("");
  // TODO: 加入錢幣到metamask
  // FIXME: Lin AC 圖片設計
  async function AddCoinToMetaMask() {
    const tokenAddress = `${process.env.NEXT_PUBLIC_MyTokenContractAddress}`;
    const tokenSymbol = "AC";
    const tokenDecimals = 0;
    const tokenImage = "http://placekitten.com/200/300";
    await window.ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      })
      .then(() => {
        setalertJoinCoinSucess(true);
      })
      .catch(() => {
        setalertJoinCoinFail(true);
      });
  }

  // TODO: UI funtion
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("lg");

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
        <Button
          className="items-center rounded-lg bg-gray-200 py-2 px-20 text hover:bg-gray-300"
          onClick={handleClickOpen}
        >
          加入 AC 貨幣
        </Button>
        <Dialog
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title"> 加入 AC </DialogTitle>
          <DialogContent>
            {/* 彈窗後整個畫面設計 */}
            {/* TODO: 加入錢幣到metamask */}
            <button
              className="items-center rounded-lg bg-gray-200 py-2 px-20 text hover:bg-gray-300"
              onClick={AddCoinToMetaMask}
            >
              加入錢幣到metamask
            </button>
          </DialogContent>
          <DialogActions>
            {/* <Button autoFocus onClick={handleClose}>
              加入!
            </Button> */}
          </DialogActions>
        </Dialog>
        <Snackbar open={alertJoinCoinSucess} autoHideDuration={6000} onClose={alertHandleClose}>
          <Alert onClose={alertHandleClose} severity="success" sx={{ width: "100%" }}>
            加入 AC 成功 可以到 MetaMask 確認 AC 的加入
          </Alert>
        </Snackbar>
        <Snackbar open={alertJoinCoinFail} autoHideDuration={6000} onClose={alertHandleClose}>
          <Alert onClose={alertHandleClose} severity="error" sx={{ width: "100%" }}>
            加入 AC 失敗
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
