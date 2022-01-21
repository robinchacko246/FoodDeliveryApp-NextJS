import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

const EventCard = ({ event }) => {
  return (
    <div className={styles.container}>
      <Link href={`/event/${event._id}`} passHref>
        <Image src={event.img} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{event.title}</h1>
     
      <p className={styles.desc}>{event.desc}</p>
    </div>
  );
};

export default EventCard;
