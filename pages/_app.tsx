import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@/stroe";

declare global {
  interface Window {
    ethereum?: any;
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
