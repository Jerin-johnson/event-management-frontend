import styles from "./Dashboard.module.css";

import Header from "../../components/header/Header";
import EventForm from "../../components/eventForm/EventForm";
import EventList from "../../components/eventList/EventList";

function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <Header />

      <section className={styles.content}>
        <EventForm />

        <EventList />
      </section>
    </main>
  );
}

export default Dashboard;
