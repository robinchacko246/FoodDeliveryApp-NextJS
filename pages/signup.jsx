import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Login.module.css";

const Signup = () => {
  const [firstName, setFirstname] = useState(null);
  const [lastName, setLastname] = useState(null);
  const [userName, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      let user=await axios.post(process.env.NEXT_PUBLIC_API_URL+"users/signup", {
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      console.log(user);
      localStorage.setItem('user-token', user.data.result.token);
      localStorage.setItem('first-name', user.data.result.firstName);
      localStorage.setItem('last-name', user.data.result.lastName);
      localStorage.setItem('user-id', user.data.result._id);
      router.push("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Hangover Registration</h1>
        First name
        <input
          placeholder=" First name"
          className={styles.input}
          onChange={(e) => setFirstname(e.target.value)}
        />
          Last Name
        <input
          placeholder="Last Name"
          className={styles.input}
          onChange={(e) => setLastname(e.target.value)}
        />
          email
        <input
          placeholder="email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
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
          Sign Up
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Signup;
