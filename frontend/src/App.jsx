import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import EventsPage from "./pages/EventsPage";

function App() {
  const [page, setPage] = useState("landing");

  // ✅ role inside component
  const [role, setRole] = useState(localStorage.getItem("role"));

  return (
    <>
      {page === "landing" && (
        <LandingPage goToEvents={() => setPage("events")} />
      )}

      {page === "events" && (
        <EventsPage role={role} />   // ✅ pass role
      )}
    </>
  );
}

export default App;