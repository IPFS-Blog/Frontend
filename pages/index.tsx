// import { Inter } from "next/font/google";
// import Image from "next/image";
import "@/styles/Home.module.css";

import Head from "next/head";

import Sidebar from "@/components/Sidebar";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <div className="flex h-screen flex-row justify-start">
          <Sidebar />
          {/* <span>Meditation</span> */}
          {/* <div className="text-white border-1 b flex-1 border-dashed bg-primary p-4"></div> */}
        </div>
      </main>
    </>
  );
}
