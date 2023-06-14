export default function Test1() {
  return null;
}

export async function getServerSideProps() {
  throw new Error("Client Error 1 - initialProps Error");
}
