import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import styles from "../styles/Login.module.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch();
  };
  return (
    <div className={styles.login}>
      <div className={styles.login_content}>
        <img src="https://us.123rf.com/450wm/alsstocks450/alsstocks4502002/alsstocks450200200089/139320546-voronezh-russia-january-31-2020-whatsapp-logo-green-round-icon-with-shadow.jpg?ver=6" />
        <div className={styles.login_text}>
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
