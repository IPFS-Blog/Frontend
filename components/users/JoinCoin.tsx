import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";

import AlertDialogSlide from "@/components/alert/AlertDialogSlide";
import { CheckChainIdFunction } from "@/helpers/users/CheckChainIdFunction";

export default function JoinCoin() {
  // TODO: Handle function
  const [isInChainId, setIsInChainId] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const connect = async () => {
      const InChainId = await CheckChainIdFunction();
      if (InChainId == true) {
        setIsInChainId(true);
      } else if (InChainId == "Fix") {
        window.alert("區塊鏈維修中");
      }
    };
    connect();
  }, []);

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

  // TODO: UI function
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("lg");
  const [alertDialogSlide, setAlertDialogSlide] = useState(false);

  const [alertJoinCoinFail, setalertJoinCoinFail] = useState(false);

  const [alertJoinCoinSucess, setalertJoinCoinSucess] = useState(false);

  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setalertJoinCoinSucess(false);
    setalertJoinCoinFail(false);
  };
  //material ui toast
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  function jumpPage() {
    router.push("./docs/NetworkInstructions");
  }

  const handleClickOpen = () => {
    if (isInChainId) {
      setOpen(true);
    } else {
      setAlertDialogSlide(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        {/*  dialog部分皆為彈窗*/}
        <button onClick={handleClickOpen}>加入 AC 貨幣</button>

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
        {alertDialogSlide ? (
          <AlertDialogSlide
            handlefunction={jumpPage}
            title={<p>請加入 IPFS 幣記 網路</p>}
            message={
              <div>
                <div>因本功能需 加入 IPFS幣記 網路</div>
                <div>點擊 同意 將可以觀看我們提供的文件 &Prime;如何加入我們的Network&Prime;</div>
              </div>
            }
          />
        ) : null}
      </div>
    </>
  );
}
