import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import { setLogin } from "@/store/UserSlice";

import MyToken from "../../truffle/build/contracts/MyToken.json";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [account, setAccount] = useState("");
  const gasLimit = 3000000;
  const dispatch = useDispatch();
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

  // TODO: 換錢
  const [ETH, setETH] = useState("");
  const [AC, setAC] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedNumber1, setSelectedNumber1] = useState(1);

  function handleNumberChange(event: any) {
    setSelectedNumber(parseInt(event.target.value));
  }
  function handleNumberChange1(event: any) {
    setSelectedNumber1(parseInt(event.target.value));
  }

  const MyTokenabi = MyToken.abi.map((item: any) => {
    return {
      inputs: item.inputs,
      name: item.name,
      outputs: item.outputs,
      stateMutability: item.stateMutability,
      type: item.type,
    };
  });

  async function EthToAc() {
    const web3 = new Web3(window && window.ethereum);
    if (web3) {
      const MyTokenContract = new web3.eth.Contract(MyTokenabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
      const selectedNumberInWei = web3.utils.toWei(selectedNumber.toString());
      //FIXME: Lin 等待畫面
      await MyTokenContract.methods
        .buyToken()
        .send({
          from: account,
          value: selectedNumberInWei,
          gas: gasLimit,
        })
        .then(() => {
          // FIXME: Lin Eth換Ac成功UI
          window.alert("ETH轉AC成功");
        })
        .catch(() => {
          // FIXME: Lin Eth換Ac失敗UI
          window.alert("ETH轉AC失敗");
        });
    }
  }
  async function AcToEth() {
    const web3 = new Web3(window && window.ethereum);
    if (web3) {
      const MyTokenContract = new web3.eth.Contract(MyTokenabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
      //FIXME: Lin 等待畫面
      await MyTokenContract.methods
        .sellToken(selectedNumber1)
        .send({
          from: account,
          gas: gasLimit,
        })
        .then(() => {
          // FIXME: Lin Ac換Eth成功UI
          window.alert("AC轉ETH成功");
        })
        .catch(() => {
          // FIXME: Lin Ac換Eth失敗UI
          window.alert("AC轉ETH失敗");
        });
    }
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
        <Button variant="outlined" onClick={handleClickOpen}>
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
                <div className="mx-2 h-9 w-9 border-r-2 bg-gray-300"></div>
                <div className="flex w-full justify-between">
                  <p>{AC}</p>
                  <p>AC</p>
                </div>
              </div>
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold hover:text-lg">
                <div className="mx-2 h-9 w-9 border-r-2 bg-gray-300"></div>
                <div className="flex w-full justify-between">
                  <p>{ETH}</p>
                  <p>ETH</p>
                </div>
              </div>
              {/* 交換幣值 FIXME:需要個人ETH的金額(超出交換金額)*/}
              {/* FIXME: jim 1. input 固定寬度 */}
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold  ">
                <div className="flex w-full justify-between">
                  <input
                    type="number"
                    max={ETH}
                    min="0"
                    id="number-selector"
                    name="number-selector"
                    value={selectedNumber}
                    onChange={handleNumberChange}
                    className="ml-2 rounded border border-gray-400 px-2 py-1"
                  />
                  <p className="mx-2 py-1">ETH換AC</p>
                  <button onClick={EthToAc} className="ml-2 rounded bg-gray-400 py-1 px-3 text-black hover:bg-gray-500">
                    交換
                  </button>
                </div>
              </div>
              <div className="flex w-full items-center rounded border-b-2 border-l-2 border-gray-600 py-2 text-base font-semibold  ">
                <div className="flex w-full justify-between">
                  <input
                    type="number"
                    max={AC}
                    min="0"
                    id="number-selector1"
                    name="number-selector1"
                    value={selectedNumber1}
                    onChange={handleNumberChange1}
                    className="ml-2 rounded border border-gray-400 px-2 py-1"
                  />
                  <p className="mx-2 py-1">AC換ETH</p>
                  <button onClick={AcToEth} className="ml-2 rounded bg-gray-400 py-1 px-3 text-black hover:bg-gray-500">
                    交換
                  </button>
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
      </div>
    </>
  );
}
