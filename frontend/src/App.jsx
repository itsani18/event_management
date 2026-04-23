import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./components/EventDetails";
import AuthModal from "./components/AuthModal";

function App() {
  const [page, setPage] = useState("landing");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const [showAuth, setShowAuth] = useState(false);

  // 🔥 ADD THIS (YOUR MAIN PROBLEM)
  const [events, setEvents] = useState([]);

  // 🔥 FETCH EVENTS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        console.log("EVENTS:", data); // debug
        setEvents(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <>
      {/* LANDING */}
      {page === "landing" && (
        <LandingPage goToEvents={() => setPage("events")} />
      )}

      {/* EVENTS */}
      {page === "events" && (
        <EventsPage
          events={events}   // 🔥 THIS WAS MISSING
          role={role}
          goBack={() => setPage("landing")}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setPage("details");
          }}
        />
      )}

      {/* DETAILS */}
      {page === "details" && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          token={token}
          onBack={() => setPage("events")}
          onRegister={(data) => {
            if (!token) {
              setShowAuth(true);
              return;
            }

            fetch(
              `http://localhost:8080/events/${selectedEvent.id}/register`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
              }
            )
              .then((res) => {
                if (!res.ok) throw new Error("Failed");
                return res.json();
              })
              .then(() => alert("Registered successfully"))
              .catch(() => alert("Registration failed"));
          }}
        />
      )}

      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          setToken={(t) => {
            localStorage.setItem("token", t);
            setToken(t);

            const r = localStorage.getItem("role");
            setRole(r);

            setShowAuth(false);
          }}
        />
      )}
    </>
  );
}

export default App;