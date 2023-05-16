import Faucet from "@/truffle/build/contracts/Faucet.json";
export const FaucetFunction = () => {
  // 合約ABI
  const FaucetContractabi = Faucet.abi.map((item: any) => {
    return {
      inputs: item.inputs,
      name: item.name,
      outputs: item.outputs,
      stateMutability: item.stateMutability,
      type: item.type,
    };
  });

  return FaucetContractabi;
};
