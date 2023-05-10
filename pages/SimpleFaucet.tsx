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
  // TODO: 換錢
  // FIXME: 要刪掉?
  const [ETH, setETH] = useState("");
  const [AC, setAC] = useState("");
  const [ETHTOACUI, setETHTOACUI] = useState(true);
  const [ACTOETHUI, setACTOETHUI] = useState(true);
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
      await MyTokenContract.methods
        .buyToken()
        .send({
          from: account,
          value: selectedNumberInWei,
          gas: gasLimit,
        })
        .then(() => {
          window.alert("ETH轉AC成功");
          settransfermoney(false);
          setETHTOACUI(false);
        })
        .catch(() => {
          window.alert("ETH轉AC失敗");
        });
    }
  }
  async function AcToEth() {
    const web3 = new Web3(window && window.ethereum);
    if (web3) {
      const MyTokenContract = new web3.eth.Contract(MyTokenabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
      await MyTokenContract.methods
        .sellToken(selectedNumber1)
        .send({
          from: account,
          gas: gasLimit,
        })
        .then(() => {
          window.alert("AC轉ETH成功");
          setACTOETHUI(false);
        })
        .catch(() => {
          window.alert("AC轉ETH失敗");
        });
    }
  }
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
      {/* TODO: 領錢 */}
      <h1>簡易水龍頭</h1>
      <p>帳號: {account}</p>
      <br></br>
      {isLoading ? <Mining /> : <button onClick={takemoney}>領取10個ETHER</button>}
      {transfermoney ? null : <h1>轉帳成功</h1>}
      {/* TODO: 換錢 */}
      <h1>Change Money</h1>
      <div>
        <h2>有{ETH}ETH</h2>
        <input
          type="number"
          id="number-selector"
          name="number-selector"
          value={selectedNumber}
          onChange={handleNumberChange}
        />
        {ETHTOACUI ? null : <h1>ETC轉AC成功</h1>}
        <button onClick={EthToAc}>ETH轉換AC</button>
      </div>
      <div>
        <h2>有{AC}AC</h2>
        <input
          type="number"
          id="number-selector1"
          name="number-selector1"
          value={selectedNumber1}
          onChange={handleNumberChange1}
        />
        {ACTOETHUI ? null : <h1>AC轉ETC成功</h1>}
        <button onClick={AcToEth}>AC轉換ETH</button>
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
