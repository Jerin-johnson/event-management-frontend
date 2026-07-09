import styles from "./Dashboard.module.css";
import Header from "../../components/Header/Header";
import EventForm from "../../components/eventForm/EventForm";
import EventList from "../../components/eventList/EventList";

function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <div className={styles.container}>
        <Header />

        <section className={styles.content}>
          <EventForm />
          <EventList />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
