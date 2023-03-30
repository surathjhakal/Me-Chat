import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import styles from "../styles/Login.module.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <>
      <Head>
        <title>MeChat</title>
        <link
          rel="icon"
          href="https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon.png"
        />
      </Head>
      <div className={styles.login}>
        <div className={styles.login_content}>
          <img src="https://images.vexels.com/media/users/3/139911/isolated/preview/1afb4038427b2bd8edd275940aea269d-chat-service-icon.png" />
          <div className={styles.login_text}>
            <h1>Sign in to MeChat</h1>
          </div>
          <Button onClick={signIn}>Sign In With Google</Button>
        </div>
      </div>
    </>
  );
}

export default Login;
