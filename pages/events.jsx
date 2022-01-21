import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState,useEffect } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import EventList from "../components/EventList";
import styles from "../styles/Home.module.css";
import nextConfig from "../next.config";
import { useRouter } from "next/router";


export default function Home({ eventList, admin}) {
  const [close, setClose] = useState(true);
  const router = useRouter();
  // useEffect(() => {

  //   const token = localStorage.getItem('user');
  //   console.log(token);
  //   if(!token) {
  //    router.push("/login");
  //   }
  // })
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Featured />
   
      {<AddButton setClose={setClose} />} */}
      <EventList eventList={eventList} />
      {!close && <Add setClose={setClose}/>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL+"events/get-events");
  
  return {
    props: {
      eventList: res.data,
      admin
    
    },
  };
};
