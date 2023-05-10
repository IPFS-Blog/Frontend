import styles from "@/styles/loading/mining.module.css";

export default function mining() {
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-row items-center">
        <img className="h-auto w-20" src="/img/gif/mining.gif" alt="loading" />
        <p className={styles.text}>正在努力挖礦中...</p>
      </div>
    </div>
  );
}
