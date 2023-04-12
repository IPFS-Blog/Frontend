import { useEffect, useState } from "react";
import Web3 from "web3";

import Faucet from "../truffle/build/contracts/Faucet.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function SimpleFaucet() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    const connect = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error: any) {
        // FIXME: 登入失敗UI
        console.log(error);
      }
    };
    connect();
  }, []);

  // 初始化 web3、account、contract

  const takemoney = async () => {
    const web3 = new Web3(window.ethereum);

    const abi = Faucet.abi.map((item: any) => {
      return {
        inputs: item.inputs,
        name: item.name,
        outputs: item.outputs,
        stateMutability: item.stateMutability,
        type: item.type,
      };
    });

    const FaucetContract = new web3.eth.Contract(abi, process.env.NEXT_PUBLIC_FaucetContractAddress);
    const accounts = await web3.eth.accounts.privateKeyToAccount(`${process.env.NEXT_PUBLIC_UserKey}`);
    web3.eth.accounts.wallet.add(accounts);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 3000000;
    await FaucetContract.methods
      .requestTokens(account)
      .send({
        from: accounts.address,
        gasPrice,
        gas: gasLimit,
      })
      .then((res: any) => {
        // FIXME:領錢成功UI
        window.alert("領錢成功");
        console.log("成功", res);
      })
      .catch((error: any) => {
        // FIXME:領錢失敗UI
        window.alert("領錢失敗");
        console.log(error);
      });
  };
  return (
    <div>
      <h1>簡易水龍頭</h1>
      <p>帳號: {account}</p>
      <br></br>
      {account !== "" ? <button onClick={takemoney}>領取10個ETHER</button> : null}
    </div>
  );
}
