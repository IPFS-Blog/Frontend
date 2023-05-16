import MyToken from "@/truffle/build/contracts/MyToken.json";
export const MyTokenFunction = () => {
  // 合約ABI
  const MyTokenabi = MyToken.abi.map((item: any) => {
    return {
      inputs: item.inputs,
      name: item.name,
      outputs: item.outputs,
      stateMutability: item.stateMutability,
      type: item.type,
    };
  });

  return MyTokenabi;
};
