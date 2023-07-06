import allarticleABI from "@/truffle/build/contracts/ArticleHistory.json";
export const ArticleHistoryFunction = () => {
  // 合約ABI
  const allarticleabi = allarticleABI.output.abi.map((item: any) => {
    return {
      inputs: item.inputs,
      name: item.name,
      outputs: item.outputs,
      stateMutability: item.stateMutability,
      type: item.type,
    };
  });

  return allarticleabi;
};
