import "@/styles/Home.module.css";

import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { _apiCheckJwt } from "@/components/api";
import { setLogin } from "@/store/UserSlice";
export default function Home() {
  const dispatch = useDispatch();

  const User = useSelector((state: any) => state.User);
  useEffect(() => {
    const UserData = typeof window !== "undefined" ? localStorage.getItem("UserData") : null;
    _apiCheckJwt().then(res => {
      if (UserData != null && res.data.jwt != null) dispatch(setLogin(UserData));
    });
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Home1</title>
      </Head>
      <main>
        {/* FIXME: 會員資料 假資料改好UI就可刪除*/}
        <p>{User.profile.id}</p>
        <p>{User.profile.name}</p>
        <p>{User.profile.email}</p>
        <p>{User.profile.address}</p>
        {/* <img src={`${User.profile.photo}`} alt="haha" width={200} /> */}
      </main>
    </>
  );
}
