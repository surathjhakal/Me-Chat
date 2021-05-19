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
        <title>Whatsapp Clone</title>
        <link
          rel="icon"
          href="https://us.123rf.com/450wm/alsstocks450/alsstocks4502002/alsstocks450200200089/139320546-voronezh-russia-january-31-2020-whatsapp-logo-green-round-icon-with-shadow.jpg?ver=6"
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

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
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
