import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth } from "../firebase";
import styles from "../styles/SideBarChat.module.css";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRouter } from "next/router";
import getRecipientData from "../utils/getRecipientData";
import { useEffect, useState } from "react";

export default function SideBarChat({ id, users, global, name }) {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const [user] = useAuthState(auth);

  // useEffect(() => {
  //   if (id && global) {
  //     db.collection("globalchats")
  //       .doc(id)
  //       .collection("messages")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) =>
  //         setMessages(snapshot.docs.map((doc) => doc.data()))
  //       );
  //   } else if (id) {
  //     db.collection("chats")
  //       .doc(id)
  //       .collection("messages")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) =>
  //         setMessages(snapshot.docs.map((doc) => doc.data()))
  //       );
  //   }
  // }, [id]);

  const enterChat = () => {
    router.push(`/chats/${id}`);
  };

  const enterGlobalChat = () => {
    router.push(`/globalChats/${id}`);
  };
  // console.log(globalChats && [JSON.parse(globalChats)?.length - 1]);
  const recipientEmail = !global && getRecipientEmail(users, user.email);

  const recipient = !global && getRecipientData(users, user.email);
  return (
    <>
      {!global ? (
        <div onClick={enterChat} className={styles.sideBarChat}>
          <Avatar src={recipient?.photoURL} />
          <div className={styles.sideBarChat_info}>
            <h3>{recipientEmail.slice(0, recipientEmail.length - 10)}</h3>
          </div>
        </div>
      ) : (
        <div onClick={enterGlobalChat} className={styles.sideBarChat}>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbwK44LEjD9rnk9L3qsV3CYpx1ZD-yt95rg&usqp=CAU" />
          <div className={styles.sideBarChat_info}>
            <h3>{name} (Group)</h3>
          </div>
        </div>
      )}
    </>
  );
}
