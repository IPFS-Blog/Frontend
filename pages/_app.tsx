import "@/styles/globals.css";

import * as Sentry from "@sentry/node";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "store";

import Layout from "@/components/Layout";

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: process.env.NEXT_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function App({ Component, pageProps }: AppProps, err: any) {
  const modifiedPageProps = { ...pageProps, err };
  return (
    <Provider store={store}>
      {/* FIXME: 頁面排版調整 */}
      <Layout>
        <Component {...modifiedPageProps} />
      </Layout>
    </Provider>
  );
}

export async function getStaticProps({ Component, ctx }: any) {
  let pageProps = {};
  try {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  } catch (err) {
    // This will work on both client and server sides.
    console.log("The Error happened in: ", typeof window === "undefined" ? "Server" : "Client");
    Sentry.captureException(err);
    return { pageProps };
  }
}
