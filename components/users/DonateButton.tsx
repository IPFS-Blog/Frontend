import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import Avatar from "@mui/material/Avatar";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import FailAlert from "@/components/alert/Fail";
import SucessAlert from "@/components/alert/Sucess";
import { MyTokenFunction } from "@/helpers/Contract/MyTokenFunction";
import { GetACFunction } from "@/helpers/users/GetACFunction";
import Mining from "@/pages/loading/mining";

export default function DonationForm() {
  // TODO: Handle funtion
  const [AC, setAC] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const dispatch = useDispatch();
  const Creater = useSelector((state: any) => state.Creater);
  const User = useSelector((state: any) => state.User);
  useEffect(() => {
    //TODO: 登入狀態
    const connect = async () => {
      // TODO: 拿取帳號
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
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
    setCurrentTime(formattedTime);
    connect();
  }, [dispatch]);

  const TransferAC = async () => {
    const web3 = new Web3(window && window.ethereum);
    // TODO:合約
    const MyTokenContractabi = MyTokenFunction();
    const MyTokenContract = new web3.eth.Contract(MyTokenContractabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
    const gasLimit = 3000000;
    setIsLoading(true); // 啟用 loading 狀態

    await MyTokenContract.methods
      .transfer(Creater.profile.address, price)
      .send({
        from: User.profile.address,
        gas: gasLimit,
      })
      .then(async () => {
        setIsLoading(false);
        setSuccess(true);
        // TODO: 拿取帳號
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts[0]) {
          // TODO: 拿取AC
          GetACFunction(accounts[0]).then(res => {
            if (res != null) setAC(res);
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        setFailure(true);
      });
  };
  // TODO: UI funtion
  const [open, setOpen] = useState(false);
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const [price, setPrice] = useState(1);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // Loading
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFailure] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mx-5 rounded border border-blue-500 py-2 px-10 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white tablet:mx-2 tablet:px-5"
      >
        <StarsOutlinedIcon />
        <span>打賞</span>
      </button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
        className="fixed h-screen w-screen "
      >
        <DialogTitle id="responsive-dialog-title" className="flex justify-center bg-gray-200 font-semibold">
          打賞
        </DialogTitle>
        <DialogContent className="bg-gray-200 md:w-full lg:w-96">
          <div className="flex flex-row items-center">
            <Avatar className="h-10 w-10 rounded-full" src={Creater.profile.picture} alt="not find Avatar" />
            <div className="ml-2 flex items-center">
              <p className="text-xl font-semibold ">{Creater.profile.username}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">現在時間{currentTime}</p>
            <p className="text-xl font-semibold">您目前擁有: {AC}(AC)</p>
            <input
              type="number"
              max={AC}
              min="0"
              id="price"
              name="price"
              className="mt-2 w-full rounded-md border-gray-300 px-4 py-2"
              placeholder="請輸入價格"
              value={price}
              onChange={e => setPrice(parseInt(e.target.value))}
            />
          </div>
          {isLoading ? (
            <Mining />
          ) : (
            <button
              onClick={TransferAC}
              className="mx-auto mt-4 flex items-center justify-center rounded-md bg-gray-400 py-2 px-4 text-black hover:bg-gray-500"
            >
              <img src="/MetaMask.png" alt="Null" width={30} height={30}></img>
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
