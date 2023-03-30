import Head from "next/head";
import PhoneConnected from "../components/PhoneConnected";
import SideBar from "../components/SideBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.app}>
      <Head>
        <title>MeChat</title>
        <link
          rel="icon"
          href="https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon.png"
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
