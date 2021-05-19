import { Avatar, IconButton } from "@material-ui/core";
import styles from "../styles/ChatSection.module.css";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientData from "../utils/getRecipientData";
import getRecipientEmail from "../utils/getRecipientEmail";
import firebase from "firebase";
import db, { auth } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react";

function ChatSection({ chat, messages, global }) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const recipientEmail = !global && getRecipientEmail(chat.users, user.email);
  const recipient = !global && getRecipientData(chat.users, user.email);
  // console.log(user);
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [globalMessageSnapshot] = useCollection(
    db
      .collection("globalchats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    if (!global) {
      db.collection("chats").doc(router.query.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: user.displayName,
        user: user.email,
        photoURL: user.photoURL,
      });
    } else {
      db.collection("globalchats")
        .doc(router.query.id)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          displayName: user.displayName,
          user: user.email,
        });
    }
    setInput("");
  };

  return (
    <div className={styles.chatSection}>
      <div className={styles.chatSection_header}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {!global ? (
            <>
              <Avatar src={recipient?.photoURL} />
              <div style={{ paddingLeft: "10px" }}>
                <h3>{recipientEmail.slice(0, recipientEmail.length - 10)}</h3>
                <p>
                  Last Seen:{" "}
                  {recipient?.lastSeen?.toDate() ? (
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                  ) : (
                    "Unavailable"
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbwK44LEjD9rnk9L3qsV3CYpx1ZD-yt95rg&usqp=CAU" />
              <div style={{ paddingLeft: "10px" }}>
                <h3>{chat.name}</h3>
                <p>Last Seen: Don't know</p>
              </div>
            </>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {globalMessageSnapshot ? (
        <div className={styles.chatSection_messages}>
          {!global ? (
            <>
              {messageSnapshot.docs.map((message) => (
                <p
                  className={`${styles.chatSection_message} ${
                    message.data().user !== user.email && styles.chat_recipient
                  }`}
                >
                  <span className={styles.chatSection_name}>
                    {message.data().displayName}
                  </span>
                  {message.data().message}
                  <span className={styles.chatSection_timestamp}>
                    {message
                      ?.data()
                      .timestamp?.toDate()
                      .toString()
                      .slice(0, 25)}
                  </span>
                </p>
              ))}
            </>
          ) : (
            <>
              {globalMessageSnapshot.docs.map((message) => (
                <p
                  className={`${styles.chatSection_message} ${
                    message.data().user !== user.email && styles.chat_recipient
                  }`}
                >
                  <span className={styles.chatSection_name}>
                    {message.data().displayName}
                  </span>
                  {message.data().message}
                  <span className={styles.chatSection_timestamp}>
                    {message
                      ?.data()
                      .timestamp?.toDate()
                      .toString()
                      .slice(0, 25)}
                  </span>
                </p>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className={styles.chatSection_messages}>
          {JSON.parse(messages).map((message) => (
            <p
              className={`${styles.chatSection_message} ${
                message.user !== user.email && styles.chat_recipient
              }`}
            >
              <span className={styles.chatSection_name}>
                {message.displayName}
              </span>
              {message.message}
              <span className={styles.chatSection_timestamp}>
                {message?.timestamp?.toString().slice(0, 25)}
              </span>
            </p>
          ))}
        </div>
      )}

      <div className={styles.chatSection_footer}>
        <IconButton style={{ flex: "0.05" }}>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton style={{ flex: "0.05" }}>
          <AttachFileIcon />
        </IconButton>
        <form style={{ flex: "0.85", marginRight: "16px" }}>
          <input
            value={input}
            className={styles.message_input}
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            onClick={sendMessage}
            style={{ display: "none" }}
          >
            Send
          </button>
        </form>
        <IconButton style={{ flex: "0.05" }}>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatSection;
