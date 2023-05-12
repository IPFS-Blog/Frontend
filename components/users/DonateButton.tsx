import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import Avatar from "@mui/material/Avatar";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import { setLogin } from "@/store/UserSlice";

import MyToken from "../../truffle/build/contracts/MyToken.json";
interface DonationFormProps {
  onDonate: (name: string, price: number) => void;
}
export default function DonationForm({ onDonate }: DonationFormProps) {
  const [AC, setAC] = useState("");
  const [open, setOpen] = useState(false);
  /* FIXME: account need fix const [account, setAccount] = useState(""); */
  const [, setAccount] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /* FIXME:handleDonate打賞付款(要怎麼將AC轉給文章作者)*/
  const handleDonate = () => {
    onDonate(name, price);
  };
  const [name /* , setName */] = useState("");
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
            setAccount(accounts[0]);
            // TODO: 拿取Eth & AC
            /* const ethBalance = await web3.eth.getBalance(accounts[0]); */
            /* setETH(await web3.utils.fromWei(ethBalance)); */
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
      >
        <DialogTitle id="responsive-dialog-title" className="flex justify-center bg-gray-200 font-semibold">
          打賞
        </DialogTitle>
        <DialogContent className="bg-gray-200 md:w-full lg:w-96">
          {/* 創作者名稱 FIXME:創作者名稱需要作者username */}
          <div className="flex flex-row items-center">
            <Avatar className="h-10 w-10 rounded-full" src="" alt="not find Avatar" />
            <div className="ml-2 flex items-center">
              <p className="text-xl font-semibold ">創作者名稱:</p>
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
          {/* 支付按鈕 FIXME:需要連結Matamask!? */}
          <button
            className="mx-auto mt-4 flex items-center justify-center rounded-md bg-gray-400 py-2 px-4 text-black hover:bg-gray-500"
            /* FIXME:需要另寫function連結作者 */
            onClick={() => {
              handleDonate();
            }}
          >
            <Image src="/MetaMask.png" alt="Null" width={30} height={30}></Image>
            確定支付
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
