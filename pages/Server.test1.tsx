export default function Test1() {
  return null;
}

export async function getServerSideProps() {
  throw new Error("Server Test 1");
}
