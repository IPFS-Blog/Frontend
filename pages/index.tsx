import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { _apiCheckJwt, apiUserGetUserData } from "@/components/api";
import Editprofile from "@/components/users/EditProfile";
import { setLogin } from "@/store/UserSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function login() {
      // const UserData = typeof window !== "undefined" ? localStorage.getItem("UserData") : null;
      let jwt = "";
      const res_CheckJwt = await _apiCheckJwt();
      // if (UserData != null && res.data.jwt != null) dispatch(setLogin(UserData));
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
      <main>
        <Editprofile />
      </main>
    </>
  );
}
