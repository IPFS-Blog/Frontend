import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import Avatar from "@mui/material/Avatar";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import React, { useState } from "react";
interface DonationFormProps {
  onDonate: (name: string, price: number) => void;
}

export default function DonationForm({ onDonate }: DonationFormProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [name /* , setName */] = useState("");
  const [price, setPrice] = useState(0);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleDonate = () => {
    onDonate(name, price);
  };

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
          {/* 支付金額 FIXME: Jim 支付金額不得超過本身擁有的AC  把0消掉*/}
          <div className="mb-4">
            <p className="text-xl font-semibold">金額(AC)</p>
            <input
              type="number"
              max=""
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
