import { Toaster } from "react-hot-toast";
import Dashboard from "./layouts/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            padding: "14px 18px",
            borderRadius: "10px",
            fontSize: "0.95rem",
            fontWeight: 500,
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          },
          success: {
            style: {
              background: "#f0fdf4",
              color: "#15803d",
              border: "1px solid #86efac",
            },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fca5a5",
            },
          },
        }}
      />
      <Dashboard />;
    </>
  );
}

export default App;
