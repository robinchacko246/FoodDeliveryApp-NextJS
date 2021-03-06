import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState,useEffect } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import AddEventButton from "../components/AddEventButton";
import AddEventPop from "../components/AddEventPop";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import nextConfig from "../next.config";
import { useRouter } from "next/router";


export default function Home({ pizzaList, admin}) {
  const [close, setClose] = useState(true);
  const [closeEvent, setCloseEvent] = useState(true);
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
      <Featured />
   
      {<AddButton setClose={setClose} />}
      {<AddEventButton setCloseEvent={setCloseEvent} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose}/>}
      {!closeEvent && <AddEventPop setCloseEvent={setCloseEvent}/>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL+"products/get-products");
  
  return {
    props: {
      pizzaList: res.data,
      admin
    
    },
  };
};
