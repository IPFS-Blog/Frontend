import "@/styles/globals.css";

import * as Sentry from "@sentry/node";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "@/stroe";

Sentry.init({
  dsn: `http://dc92150ec47041968279837bb4eb872f@${process.env.SENTRY_IP}/5`,
  release: process.env.SENTRY_RELEASE,
  tracesSampleRate: 1.0,
});

declare global {
  interface Window {
    ethereum?: any;
  }
}
export default function App({ Component, pageProps }: AppProps, err: any) {
  const modifiedPageProps = { ...pageProps, err };
  return (
    <Provider store={store}>
      <Component {...modifiedPageProps} />
    </Provider>
  );
}

App.getInitialProps = async ({ Component, ctx }: any) => {
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
};
