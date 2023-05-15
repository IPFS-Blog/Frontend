import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import Avatar from "@mui/material/Avatar";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import FailAlert from "@/components/alert/Fail";
import SucessAlert from "@/components/alert/Sucess";
import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import { setLogin } from "@/store/UserSlice";

import MyToken from "../../truffle/build/contracts/MyToken.json";
import Mining from "@/pages/loading/mining";

export default function DonationForm({ CreaterAddress, CreaterName, CreaterPhoto }: any) {
  const [AC, setAC] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const User = useSelector((state: any) => state.User);
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [price, setPrice] = useState(1);

  const handlePriceChange = (event: any) => {
    setPrice(parseInt(event.target.value));
  };
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
            // TODO: 拿取Eth & AC
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
  const TransferAC = async () => {
    const web3 = new Web3(window && window.ethereum);
    setIsLoading(true); // 啟用 loading 狀態
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
    const gasLimit = 3000000;

    await MyTokenContract.methods

      .transfer(CreaterAddress, price)
      .send({
        from: User.profile.address,
        gas: gasLimit,
      })
      .then(() => {
        setIsLoading(false);
        setSuccess(true);
      })
      .catch(() => {
        setIsLoading(false);
        setFailure(true);
      });
  };
  // ui function
  const [success, setSuccess] = useState(false);
  const [fail, setFailure] = useState(false);

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="mx-5 rounded border border-blue-500 py-2 px-10 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white tablet:mx-2 tablet:px-5"
      >
        <StarsOutlinedIcon />
        <span>打賞</span>
      </button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="fixed h-screen w-screen "
      >
        <DialogTitle id="responsive-dialog-title" className="flex justify-center bg-gray-200 font-semibold">
          打賞
        </DialogTitle>

        <DialogContent className="bg-gray-200 md:w-full lg:w-96">
          <div className="flex flex-row items-center">
            <Avatar className="h-10 w-10 rounded-full" src={CreaterPhoto} alt="not find Avatar" />
            <div className="ml-2 flex items-center">
              <p className="text-xl font-semibold ">{CreaterName}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">金額(AC)</p>
            <input
              type="number"
              max={AC}
              min="0"
              id="price"
              name="price"
              className="mt-2 w-full rounded-md border-gray-300 px-4 py-2"
              placeholder="請輸入價格"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          {isLoading ? (
            <Mining />
          ) : (
            // {/* 支付按鈕 FIXME:Andy button 轉帳AC給作者*/}
            <button
              onClick={TransferAC}
              className="mx-auto mt-4 flex items-center justify-center rounded-md bg-gray-400 py-2 px-4 text-black hover:bg-gray-500"
            >
              <Image src="/MetaMask.png" alt="Null" width={30} height={30}></Image>
              確定支付
            </button>
          )}
        </DialogContent>
      </Dialog>
      {success && <SucessAlert message="轉錢成功" />}
      {fail && <FailAlert message="轉錢失敗" />}
    </>
  );
}
