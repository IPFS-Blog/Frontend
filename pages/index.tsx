import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import DonateButton from "@/components/users/DonateButton";
import { setLogin } from "@/store/UserSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function login() {
      let jwt = "";
      const res_CheckJwt = await _apiCheckJwt();
      jwt = res_CheckJwt.data.jwt;
      const res_GetUserData = await apiUserGetUserData(jwt);
      dispatch(setLogin(JSON.stringify(res_GetUserData.data.userData)));
    }
    login();
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <h1>home</h1>
      <DonateButton
        onDonate={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Link href="./Uni0155/Sunday">我的文章</Link>
      <h1>區塊鏈錢幣: </h1>
      <Link href="./SimpleFaucet">領取區塊鏈錢幣</Link>
    </>
  );
}
