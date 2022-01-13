import axios from "axios";
import { useState,useEffect } from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import nextConfig from "../next.config";
import { useRouter } from "next/router";
import Toast from "../components/Toast";
import { useCookies } from "react-cookie"

const Login = () => {
  const [cookie, setCookie] = useCookies(["user"])
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
 
  const handleClick = async () => {
    try {
       //handle API call to sign in here.
     let user= await axios.post(nextConfig.API_URL+"users/signin", {
        username,
        password,
      });
      //setting cookie
      setCookie("user", JSON.stringify(user.data), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      })

      localStorage.setItem('user-token', user.data.token);
      localStorage.setItem('first-name', user.data.firstName);
      localStorage.setItem('last-name', user.data.lastName);
      localStorage.setItem('user-id', user.data._id);
      router.push("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Hangover</h1>
        username
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
       
        password
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button onClick={handleClick} className={styles.button}>
          Log In
        </button>
        or
        <Link href="/signup"><button  className={styles.button}>
          Sign Up
        </button></Link>
        
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
