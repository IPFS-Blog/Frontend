import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";

import { MyTokenFunction } from "@/helpers/Contract/MyTokenFunction";
import { GetACFunction } from "@/helpers/users/GetACFunction";
import Mining from "@/pages/loading/mining";

export default function ResponsiveDialog() {
  // TODO: Handle funtion
  const [address, setAddress] = useState("");
  const [ETH, setETH] = useState("");
  const [AC, setAC] = useState("");
  const gasLimit = 3000000;

  useEffect(() => {
    const connect = async () => {
      const web3 = new Web3(window && window.ethereum);
      // TODO: 拿取帳號
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      if (accounts[0]) {
        // TODO: 拿取ETH
        const ethBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
        setETH(ethBalance);

        // TODO: 拿取AC
        GetACFunction(accounts[0]).then(res => {
          if (res != null) setAC(res);
        });
      }
    };
    // 取得現在時間
    const now = new Date();
    const formattedTime = now.toLocaleString(); // 將現在時間格式化為字串
    // 設定時間狀態
    setcreateTime(formattedTime);
    setcreateTime1(formattedTime);
    connect();
  }, []);
  // TODO: 換錢
  async function EthToAc() {
    setIsLoading(true); // 啟用 loading 狀態
    const web3 = new Web3(window && window.ethereum);
    // TODO:合約
    const MyTokenContractabi = MyTokenFunction();
    const MyTokenContract = new web3.eth.Contract(MyTokenContractabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
    if (web3) {
      const selectedNumberInWei = web3.utils.toWei(selectedNumber.toString(),);
      await MyTokenContract.methods.buyToken(createtime)
        .send({
          from: address,
          value: selectedNumberInWei,
          gas: gasLimit,
        })
        .then(async () => {
          setchangeMoneySucess(true);
          setIsLoading(false);
          // TODO: 拿取帳號
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          // TODO: 拿取ETH
          const ethBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
          setETH(ethBalance);

          // TODO: 拿取AC
          GetACFunction(accounts[0]).then(res => {
            if (res != null) setAC(res);
          });
        })
        .catch(() => {
          setchangeMoneyFail(true);
          setIsLoading(false);
        });
    }
  }
  async function AcToEth() {
    setIsLoading(true); // 啟用 loading 狀態
    const web3 = new Web3(window && window.ethereum);
    // TODO:合約
    const MyTokenContractabi = MyTokenFunction();
    const MyTokenContract = new web3.eth.Contract(MyTokenContractabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
    if (web3) {
      await MyTokenContract.methods
        .sellToken(selectedNumber1, createtime1)
        .send({
          from: address,
          gas: gasLimit,
        })
        .then(async () => {
          setchangeMoneySucess(true);
          setIsLoading(false);
          // TODO: 拿取帳號
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          // TODO: 拿取ETH
          const ethBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
          setETH(ethBalance);

          // TODO: 拿取AC
          GetACFunction(accounts[0]).then(res => {
            if (res != null) setAC(res);
          });
        })
        .catch(() => {
          setchangeMoneyFail(true);
          setIsLoading(false);
        });
    }
  }

  // TODO: UI funtion
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");

  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedNumber1, setSelectedNumber1] = useState(1);
  const [createtime, setcreateTime] = useState("");
  const [createtime1, setcreateTime1] = useState("");
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const [changeMoneyFail, setchangeMoneyFail] = useState(false);
  const [changeMoneySucess, setchangeMoneySucess] = useState(false);
  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setchangeMoneyFail(false);
    setchangeMoneySucess(false);
  };
  //material ui toast
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleNumberChange(event: any) {
    setSelectedNumber(parseInt(event.target.value));
  }
  function handleCreatetimeChange(event: any) {
    setcreateTime(event.target.value.toString(0,10));
  }
  function handleCreatetimeChange1(event: any) {
    setcreateTime1(event.target.value.toString(0, 10));
  }
  function handleNumberChange1(event: any) {
    setSelectedNumber1(parseInt(event.target.value));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="">
        {/*  dialog部分皆為彈窗*/}
        <Button
          className="items-center rounded-lg bg-gray-200 py-2 px-20 text hover:bg-gray-300"
          onClick={handleClickOpen}
        >
          個人錢包
        </Button>
        <Dialog
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" className="bg-gray-200 font-semibold">
            個人錢包
          </DialogTitle>
          <DialogContent className="bg-gray-200 md:w-full ">
            <div>
              <div className="flex flex-row justify-between">
                <p className="mx-2 text-xl font-semibold">資產總覽</p>
                <button className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100">
                  交易紀錄
                </button>
              </div>
              {/* 不同虛擬幣的圖案以及總額 */}
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold hover:text-lg">
                <img src="/tokenLogo/AC2.png" className="mx-2 h-9 w-9 border-r-2 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p>{AC}</p>
                  <p>AC</p>
                </div>
              </div>
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold hover:text-lg">
                <img src="/tokenLogo/Ethereum.png" className="mx-2 h-9 w-9 border-r-2 bg-gray-300" />
                <div className="flex w-full justify-between">
                  <p>{ETH}</p>
                  <p>ETH</p>
                </div>
              </div>
              {/* 幣值轉換 */}
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold">
                <div className="flex w-full justify-between">
                  <input
                    type="number"
                    max={ETH}
                    min="0"
                    id="number-selector"
                    name="number-selector"
                    value={selectedNumber}
                    onChange={handleNumberChange}
                    className="ml-2 grow rounded border border-gray-400 px-2 py-1"
                  />
                  <p className="mx-2 py-1">ETH換AC</p>
                  {isLoading ? (
                    <Mining />
                  ) : (
                    <button
                      onClick={EthToAc}
                      className="ml-2 rounded bg-gray-400 py-1 px-3 text-black hover:bg-gray-500"
                    >
                      交換
                    </button>
                  )}
                </div>
              </div>
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold">
                <div className="flex w-full justify-between">
                  <input
                    type="number"
                    max={AC}
                    min="0"
                    id="number-selector1"
                    name="number-selector1"
                    value={selectedNumber1}
                    onChange={handleNumberChange1}
                    className="ml-2 grow rounded border border-gray-400 px-2 py-1"
                  />
                  <p className="mx-2 py-1">AC換ETH</p>
                  {isLoading ? (
                    <Mining />
                  ) : (
                    <button
                      onClick={AcToEth}
                      className="ml-2 rounded bg-gray-400 py-1 px-3 text-black hover:bg-gray-500"
                    >
                      交換
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="bg-gray-200">
            <Button
              className="rounded border bg-gray-300 py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
              onClick={handleClose}
              autoFocus
            >
              確認
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={changeMoneyFail} autoHideDuration={6000} onClose={alertHandleClose}>
          <Alert onClose={alertHandleClose} severity="error" sx={{ width: "100%" }}>
            交換失敗!
          </Alert>
        </Snackbar>
        <Snackbar open={changeMoneySucess} autoHideDuration={6000} onClose={alertHandleClose}>
          <Alert onClose={alertHandleClose} severity="success" sx={{ width: "100%" }}>
            交換成功!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
