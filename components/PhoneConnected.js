import styles from "../styles/PhoneConnected.module.css";

const PhoneConnected = () => {
  return (
    <div className={styles.phoneConnected}>
      <div className={styles.phoneConnected_body}>
        <h1>To chat with me enter "jhakal.surath@gmail.com" email</h1>
        <h1>To log out you can click your avatar</h1>
        <img src="https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon.png" />
        <h1>Keep your phone connected</h1>
        <br />
        <p>
          MeChat connects to your phone to sync messages. To reduce data usage,
          connect you phone to Wi-Fi
        </p>
      </div>
    </div>
  );
};

export default PhoneConnected;
