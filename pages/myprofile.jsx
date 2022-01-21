import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import nextConfig from "../next.config";
import Auth from "../components/Auth";
import Toast from "../components/Toast";

const Signup = ({user}) => {
  
  const router = useRouter();
 
  useEffect(() => {

    if(Object.keys(user).length === 0)
    {
      router.push("/login")
    }
  })
  
  const [userDetails, setUserDetails] = useState(user); //for initial rendering

  const [error, setError] = useState(false);
 

  // We need to spread the previous state and change the one we're targeting, so other data cannot be lost.
  const handleChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('user-token')
      }
      
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "users/update", 
        userDetails
      ,{
        headers: headers
      });
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
          name="firstName"
          value={userDetails.firstName}
          onChange={handleChange}
        />
        Last Name
        <input
          placeholder="Last Name"
          className={styles.input}
          name="lastName"
          value={userDetails.lastName}
          onChange={handleChange}
        />
        email
        <input
          placeholder="email"
          className={styles.input}
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        username
        <input
          placeholder="username"
          className={styles.input}
          name="userName"
          value={userDetails.userName}
          onChange={handleChange}
        />
        <button onClick={handleClick} className={styles.button}>
          Update profile
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Signup;

//server api call before page load

export const getServerSideProps = async (ctx) => {
  let user = {};
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  //console.log(JSON.parse(myCookie.user));
  if (myCookie.user) {
    let userDetails = JSON.parse(myCookie.user);

    user = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "users/user-details/" + userDetails._id,
      { headers: { authorization: userDetails.token } }
    );

    user = user.data.data;
  }

  return {
    props: {
      user
    },
  };
};


