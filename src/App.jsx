import { Toaster } from "react-hot-toast";
import Dashboard from "./layouts/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Dashboard />;
    </>
  );
}

export default App;
