import axios from "axios";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import styles from "../styles/Login.module.css";
import nextConfig from "../next.config";
import Auth from "../components/Auth";
import Toast from "../components/Toast";



const Signup = () => {
  let auth=Auth();
  const [userDetails,setUserDetails]=useState({});  //for initial rendering
  const [loading,setLoading]=useState(false);  

  //for page fields
  const [firstName, setFirstname] = useState(null);
  const [lastName, setLastname] = useState(null);
  const [userName, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
 
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  useEffect(async () => {
    
    const user_token = localStorage.getItem('user-token');
    
     console.log(auth);
     if(auth.auth)
     {
      const user_id = localStorage.getItem('user-id');
    
      let user=await axios.get(nextConfig.API_URL+"users/user-details/"+user_id,{ 'headers': { 'authorization': user_token } });
      
     // setFirstname(user.data.data.firstName);
      //initial rendering
      setUserDetails((prevState) => ({
       ...prevState,
       ['firstName']:user.data.data.firstName ,
       ['lastName']:user.data.data.lastName,
       ['email']:user.data.data.email,
       ['userName']:user.data.data.userName,
    }));
    setLoading(true);
     }
     else
     {
      
     }
   
   
    
  
  })
   
  const handleClick = async () => {
    try {
      await axios.post(nextConfig.API_URL+"users/update", {
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      router.push("/");
    } catch (err) {
      setError(true);
    }
  };


  return (
    loading &&
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Hangover Registration</h1>
        First name
        <input
          placeholder=" First name"
          className={styles.input}  value={userDetails.firstName}
          onChange={(e) => setFirstname(e.target.value)}
        />
          Last Name
        <input
          placeholder="Last Name"
          className={styles.input} value={userDetails.lastName}
          onChange={(e) => setLastname(e.target.value)}
        />
        {console.log("last,",firstName)}
          email
        <input
          placeholder="email"
          className={styles.input} value={userDetails.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        username
        <input
          placeholder="username"
          className={styles.input} value={userDetails.userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* password
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
       
        <button onClick={handleClick} className={styles.button}>
          Update profile
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Signup;
