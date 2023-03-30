import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatSection from "../../components/ChatSection";
import SideBar from "../../components/SideBar";
import db, { auth } from "../../firebase";
import styles from "../../styles/Home.module.css";

function globalChat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <>
      <Head>
        <title>MeChat</title>
        <link
          rel="icon"
          href="https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon.png"
        />
      </Head>
      <div className={styles.app}>
        <div className={styles.app_header}></div>
        <div className={styles.app_content}>
          <SideBar />
          <ChatSection chat={chat} messages={messages} global />
        </div>
      </div>
    </>
  );
}

export default globalChat;

export async function getServerSideProps(context) {
  const chatID = db.collection("globalchats").doc(context.query.id);
  const messagesRes = await chatID
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate().getTime(),
  }));

  const chatRes = await chatID.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  //   console.log(chat);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
