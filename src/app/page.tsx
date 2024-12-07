import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/redis.png"
          alt="Redis Logo"
          width={250}
          height={79}
          priority
        />
      </div>
    </main>
  );
}
