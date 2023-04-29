import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { _apiCheckJwt } from "@/components/api";
import DonationForm from "@/components/users/DonateButton";
import Editprofile from "@/components/users/EditProfile";
import User_wallet from "@/components/users/user_wallet";
import { setLogin } from "@/store/UserSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const UserData = typeof window !== "undefined" ? localStorage.getItem("UserData") : null;
    _apiCheckJwt().then(res => {
      if (UserData != null && res.data.jwt != null) dispatch(setLogin(UserData));
    });
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <Editprofile />
        <User_wallet />
        <DonationForm />
      </main>
    </>
  );
}
