import styles from "./Dashboard.module.css";

import Header from "../../components/Header/Header";
import EventForm from "../../components/EventForm/EventForm";
import EventList from "../../components/EventList/EventList";

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
