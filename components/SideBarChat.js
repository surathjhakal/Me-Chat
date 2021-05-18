import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import db, { auth } from "../firebase";
import styles from "../styles/SideBarChat.module.css";
import getRecipientEmail from "../utils/getRecipientEmail";

export default function SideBarChat({ id, users }) {
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(users, user.email))
  );
  const recipientEmail = getRecipientEmail(users, user.email);
  console.log(recipientSnapshot);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  return (
    <a href="#" style={{ textDecoration: "none", color: "black" }}>
      <div className={styles.sideBarChat}>
        <Avatar src={recipient?.photoURL} />
        <div className={styles.sideBarChat_info}>
          <h3>{recipientEmail}</h3>
          <p>hello</p>
        </div>
      </div>
    </a>
  );
}
