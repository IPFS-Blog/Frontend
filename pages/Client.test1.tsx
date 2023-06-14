export default function user() {
  const getInitialProps = () => {
    throw new Error("Client Error 1 - initialProps Error");
  };
  return getInitialProps();
}
