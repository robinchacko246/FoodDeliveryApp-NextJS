import styles from "../styles/PizzaList.module.css";
import EventCard from "./EventCard";

const EventList = ({ eventList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST DISHES NOW</h1>
      <p className={styles.desc}>
      Order food & beverages online from restaurants near & around you. Exciting bit? We place no minimum order restrictions! Order in as little (or as much) as you?d like. 

      </p>
      <div className={styles.wrapper}>
        {eventList.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
