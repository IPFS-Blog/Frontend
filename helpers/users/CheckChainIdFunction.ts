export const CheckChainIdFunction = () => {
  return window.ethereum
    .request({ method: "eth_chainId" })
    .then((chainId: any) => {
      if (chainId !== `${process.env.NEXT_PUBLIC_CHAINID}`) {
        return false;
      }
      return true;
    })
    .catch(() => {
      return "fix";
    });
};
