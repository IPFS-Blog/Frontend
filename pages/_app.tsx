import "@/styles/globals.css";
import "nprogress/nprogress.css";
import "@/styles/NprogressCustom.css";

import * as Sentry from "@sentry/node";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import NProgress from "nprogress";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "store";

import Layout from "@/components/layout/Layout";

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

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }: AppProps, err: any) {
  const modifiedPageProps = { ...pageProps, err };

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  });

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...modifiedPageProps} />
        </Layout>
      </ThemeProvider>
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

export default App;
