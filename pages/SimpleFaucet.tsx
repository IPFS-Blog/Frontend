import { AlertProps, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import { setLogin } from "@/store/UserSlice";

import Faucet from "../truffle/build/contracts/Faucet.json";
import MyToken from "../truffle/build/contracts/MyToken.json";
import Mining from "./loading/mining";

export default function SimpleFaucet() {
  const [account, setAccount] = useState("");
  const gasLimit = 3000000;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [alertJoinCoinFail, setalertJoinCoinFail] = useState(false);
  const [alertTakeMoneyFail, setalertTakeMoneyFail] = useState(false);
  const [alertJoinCoinSucess, setalertJoinCoinSucess] = useState(false);
  const [alertTakeMoneySucess, setalertTakeMoneySucess] = useState(false);
  const alertHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setalertTakeMoneySucess(false);
    setalertJoinCoinSucess(false);
    setalertTakeMoneyFail(false);
    setalertJoinCoinFail(false);
  };

  //material ui toast
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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

  // TODO: 領錢
  const [transfermoney, settransfermoney] = useState(true);
  const takemoney = async () => {
    setIsLoading(true); // 啟用 loading 狀態
    const web3 = new Web3(window && window.ethereum);
    if (web3) {
      const FaucetContractabi = Faucet.abi.map((item: any) => {
        return {
          inputs: item.inputs,
          name: item.name,
          outputs: item.outputs,
          stateMutability: item.stateMutability,
          type: item.type,
        };
      });
      const FaucetContract = new web3.eth.Contract(FaucetContractabi, process.env.NEXT_PUBLIC_FaucetContractAddress);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.accounts.privateKeyToAccount(`${process.env.NEXT_PUBLIC_UserKey}`);
      web3.eth.accounts.wallet.add(accounts);

      const gasPrice = await web3.eth.getGasPrice();
      await FaucetContract.methods
        .requestTokens(account)
        .send({
          from: accounts.address,
          gasPrice,
          gas: gasLimit,
        })
        .then(() => {
          setalertTakeMoneySucess(true);
          setIsLoading(false);
        })
        .catch(() => {
          setalertTakeMoneyFail(true);
          setIsLoading(false);
        });
    }
  };
  const [, setETH] = useState("");
  const [AC, setAC] = useState("");

  // TODO: 加入錢幣到metamask
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
  return (
    <div>
      {/* TODO: 加入錢幣到metamask */}
      {AC === "0" ? <button onClick={AddCoinToMetaMask}>加入錢幣到metamask</button> : null}
      <div className="m-2 text-5xl text-blue-900">
        獲取 <span className="font-semibold">AC</span> 代幣
      </div>
      <div className="my-5 mx-2 text-base ">
        <div className="my-1">錢包地址</div>

        <div className="my-1 w-24 min-w-fit rounded-md border border-slate-200 bg-gray-200 py-3 px-2 text-slate-600 hover:border-2 hover:border-solid hover:border-blue-300 hover:ring">
          {account}
        </div>
        <br></br>
        {/* TODO: 領錢 */}
        {isLoading ? (
          <Mining />
        ) : (
          <button
            className="rounded-lg bg-blue-900 px-6 py-2 text-sm text-blue-50 shadow-blue-400/30 transition-colors duration-300 hover:bg-blue-500"
            onClick={takemoney}
          >
            領取10個ETHER
          </button>
        )}
        {transfermoney ? null : <h1>轉帳成功</h1>}
      </div>
      <Snackbar open={alertTakeMoneySucess} autoHideDuration={6000} onClose={alertHandleClose}>
        <Alert onClose={alertHandleClose} severity="success" sx={{ width: "100%" }}>
          領錢成功
        </Alert>
      </Snackbar>
      <Snackbar open={alertJoinCoinSucess} autoHideDuration={6000} onClose={alertHandleClose}>
        <Alert onClose={alertHandleClose} severity="success" sx={{ width: "100%" }}>
          加入 AC 成功
        </Alert>
      </Snackbar>
      <Snackbar open={alertTakeMoneyFail} autoHideDuration={6000} onClose={alertHandleClose}>
        <Alert onClose={alertHandleClose} severity="error" sx={{ width: "100%" }}>
          領錢失敗
        </Alert>
      </Snackbar>
      <Snackbar open={alertJoinCoinFail} autoHideDuration={6000} onClose={alertHandleClose}>
        <Alert onClose={alertHandleClose} severity="error" sx={{ width: "100%" }}>
          加入 AC 失敗
        </Alert>
      </Snackbar>
    </div>
  );
}
