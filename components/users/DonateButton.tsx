import Button from "@mui/material/Button";
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
      <Button variant="outlined" onClick={handleClickOpen}>
        打賞
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="bg-gray-200 font-semibold">
          打賞
        </DialogTitle>
        <DialogContent className="bg-gray-200 md:w-full lg:w-96">
          <div className="flex flex-row justify-between">
            <p className="text-xl font-semibold">名稱</p>
          </div>
          {/* 創作者名稱 */}
          <p>創作者名稱</p>
          <div className="mb-4">
            <p className="text-xl font-semibold">金額(AC)</p>
            <input
              type="number"
              id="price"
              name="price"
              className="mt-2 w-full rounded-md border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="請輸入價格"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <button
            className="mx-auto mt-4 flex items-center justify-center rounded-md bg-indigo-500 py-2 px-4 text-white hover:bg-indigo-600"
            onClick={handleDonate}
          >
            <Image src="/MetaMask.png" alt="Null" width={30} height={30}></Image>
            確定支付
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
