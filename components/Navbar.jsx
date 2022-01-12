import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import {useState,useEffect } from "react";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const Navbar = () => {
 
  const quantity = useSelector((state) => state.cart.quantity);
  const [token, setToken] = useState(null);
  const [first_name, setFirstname] = useState(null);
  const [last_name, setLastname] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem('user-token'));
    setFirstname(localStorage.getItem('first-name'));
    setLastname(localStorage.getItem('last-name'));
  });
//  if(token)
//  {

//   jwt.verify(token,'VVhY4YvAPuYenVZQCjCPZfKASJpCyw2f',function(err,decode){
//     if(err){
//         console.log(err);
//         router.push("/login");
//     }else{
      
    
//     }
//    }); }

  

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>8138813237</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
    
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
      <div className={styles.item}>
        {
          !token ? (
            <Link href="/login">
            <ul className={styles.list}>
              
            
              
          
              <li className={styles.listItem}>Login/SignUp</li>
           
           
            </ul>
            </Link>
          ):(
            <Link href="/myprofile">
            <ul className={styles.list}>
            <li className={styles.listItem}>{first_name+" "+last_name}</li>
            {/* <ul class="authDropdown"><li><a class="notAssign" href="/profile">Profile</a></li><li><a class="notAssign" href="/edit-profile">Edit Profile</a></li><li><a class="notAssign" href="/settings">Settings</a></li><li><a>Log out</a></li></ul> */}
            

                
                 
                    {/* <Popup  className={styles.listItem} contentStyle={{width: "300px"}} trigger={ <li className={styles.listItem}>{first_name+" "+last_name}</li>}
                      position="right center">
                      <div>GeeksforGeeks</div>
                      <button>Click here</button>
                    </Popup>
                  */}
           
            </ul>
            </Link>
          )
        }
    
      </div>
    </div>
  );
};

export default Navbar;
