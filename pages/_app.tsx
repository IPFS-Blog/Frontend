import "@/styles/globals.css";

import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "http://dc92150ec47041968279837bb4eb872f@192.168.1.83:9000/5",
  release: process.env.SENTRY_RELEASE,
  tracesSampleRate: 1.0,
});
export default function App({ Component, pageProps, err }: any) {
  const modifiedPageProps = { ...pageProps, err };
  return <Component {...modifiedPageProps} />;
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
