import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../styles/SideBar.module.css";
import * as EmailValidator from "email-validator";
import db, { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import SideBarChat from "./SideBarChat";

function SideBar() {
  const [user] = useAuthState(auth);

  const userChat = db
    .collection("chats")
    .where("users", "array-contains", user?.email);

  const globalChat = db.collection("globalchats");

  const [chatSnapshot] = useCollection(userChat);
  const [globalChatSnapshot] = useCollection(globalChat);

  const createChat = () => {
    const input = prompt(
      "Please enter the email address of the person you wish to chat.."
    );
    if (!input) return null;
    if (EmailValidator.validate(input) && user.email !== input) {
      if (!chatExist(input)) {
        db.collection("chats").add({
          users: [user.email, input],
        });
      } else {
        alert("Chat already exist..");
      }
    }
  };
  const createGlobalChat = () => {
    const input = prompt("Please enter the global chat name..");
    if (!input) return null;
    db.collection("globalchats").add({
      name: input,
    });
  };

  const chatExist = (recipientEmail) => {
    const data = chatSnapshot.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className={styles.sideBar}>
        <div className={styles.sideBar_header}>
          <IconButton>
            <Avatar
              src={user.photoURL}
              onClick={() => {
                auth.signOut();
              }}
            />
          </IconButton>
          <div className={styles.sideBar_header_right}>
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.sideBar_notify}>
          <div className={styles.sideBar_notify_left}>
            <NotificationsOffIcon />
          </div>
          <div className={styles.sideBar_notify_right}>
            <p style={{ fontSize: "1.1rem", paddingBottom: "4px" }}>
              Get notified of new messages
            </p>
            <p style={{ fontSize: "0.9rem" }}>Turn on desktop notifications </p>
          </div>
        </div>
        <div className={styles.sideBar_search}>
          <div className={styles.sideBar_search_inner}>
            <SearchIcon />
            <input
              className={styles.search_bar}
              type="text"
              placeholder="Search or start new chat"
            />
          </div>
        </div>
        <div onClick={createChat}>
          <button className={styles.sideBar_addNewChat}>
            START A NEW CHAT
          </button>
        </div>
        <div onClick={createGlobalChat}>
          <button className={styles.sideBar_addNewChat}>
            START A NEW GLOBAL CHAT
          </button>
        </div>
        <div className={styles.sideBar_chats}>
          {chatSnapshot?.docs.map((chat) => (
            <SideBarChat key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
          {globalChatSnapshot?.docs.map((chat) => (
            <SideBarChat
              key={chat.id}
              id={chat.id}
              name={chat.data().name}
              global
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
