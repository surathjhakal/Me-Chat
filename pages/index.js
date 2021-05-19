import Head from "next/head";
import PhoneConnected from "../components/PhoneConnected";
import SideBar from "../components/SideBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.app}>
      <Head>
        <title>Whatsapp Clone</title>
        <link
          rel="icon"
          href="https://us.123rf.com/450wm/alsstocks450/alsstocks4502002/alsstocks450200200089/139320546-voronezh-russia-january-31-2020-whatsapp-logo-green-round-icon-with-shadow.jpg?ver=6"
        />
      </Head>
      <div className={styles.app_header}></div>
      <div className={styles.app_content}>
        <SideBar />
        <PhoneConnected />
      </div>
    </div>
  );
}
