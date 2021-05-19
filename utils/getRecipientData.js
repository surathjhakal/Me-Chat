import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import getRecipientEmail from "./getRecipientEmail";

export default function getRecipientData(users, loggedInUser) {
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(users, loggedInUser))
  );
  return recipientSnapshot?.docs?.[0]?.data();
}
