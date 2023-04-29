import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { _apiCheckJwt } from "@/components/api";
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
      <h1>home</h1>
      <Link href="./Uni0155/Sunday">我的文章</Link>
    </>
  );
}
