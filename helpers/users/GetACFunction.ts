import Web3 from "web3";

import { MyTokenFunction } from "../Contract/MyTokenFunction";

export const GetACFunction = async (address: string) => {
  const web3 = new Web3(window && window.ethereum);
  // 導入超級帳號
  const SupperAccounts = await web3.eth.accounts.privateKeyToAccount(`${process.env.NEXT_PUBLIC_UserKey}`);
  const MyTokenContractabi = MyTokenFunction();
  const MyTokenContract = new web3.eth.Contract(MyTokenContractabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);
  let AC = null;
  if (MyTokenContract != null)
    await MyTokenContract.methods
      .balanceOf(address)
      .call({ from: SupperAccounts.address })
      .then((res: any) => {
        if (res != null) {
          AC = res;
        }
      });

  return AC;
};
