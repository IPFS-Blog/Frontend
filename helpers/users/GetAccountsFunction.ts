import Web3 from "web3";

export const GetAccountsFunction = async () => {
  const web3 = new Web3(window && window.ethereum);
  let address = null;
  await web3.eth.requestAccounts().then((accounts: any[]) => {
    address = accounts[0];
  });

  return address;
};
