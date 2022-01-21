import styles from "../styles/Add.module.css";

const AddButton = ({ setCloseEvent }) => {

  return (
    <div onClick={() => setCloseEvent(false)} className={styles.mainAddButton}>
      Add New Event
    </div>
  );
};

export default AddButton;
