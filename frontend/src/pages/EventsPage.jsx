import { useEffect, useState } from "react";
import {
  getEvents,
  getEventById,
  registerEvent,
} from "../services/api";
import AuthModal from "../components/AuthModal";

export default function EventsPage({ role }) {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("role");

  const [form, setForm] = useState({ email: "" });

  const [showCreate, setShowCreate] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    type: "",
    seatsLeft: "",
  });

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= DETAILS =================
  const handleDetails = async (id) => {
    try {
      const event = await getEventById(id);
      setSelected(event);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setSelected(null);
    setShowForm(false);
    alert("Logged out");
  };

  // ================= REGISTER =================
  const handleRegisterClick = () => {
    if (!token) {
      setShowAuth(true);
      return;
    }
    setShowForm(true);
  };

  const handleFinalRegister = async () => {
    try {
      const eventId = selected?.id || selected?._id;
      await registerEvent(eventId, form.email, token);

      alert("Registration successful!");
      setShowForm(false);
      setForm({ email: "" });

      fetchEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= CREATE =================
  const handleCreateEvent = async () => {
    try {
      await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      alert("Event Created!");
      setShowCreate(false);

      setNewEvent({
        title: "",
        description: "",
        date: "",
        type: "",
        seatsLeft: "",
      });

      fetchEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Deleted!");
      fetchEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= EDIT =================
  const handleEdit = (event) => {
    setNewEvent({
      title: event.title || "",
      description: event.description || "",
      date: event.date ? event.date.slice(0, 16) : "",
      type: event.type || "",
      seatsLeft: event.seatsLeft || "",
    });

    setShowCreate(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Events</h2>

        {!token ? (
          <button onClick={() => setShowAuth(true)}>
            Login / Signup
          </button>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              {username} ({userRole === "ADMIN" ? "A" : "U"})
            </div>

            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      {/* ADMIN CREATE */}
      {userRole === "ADMIN" && (
        <button onClick={() => setShowCreate(true)}>
          ➕ Create Event
        </button>
      )}

      {/* CREATE FORM */}
      {showCreate && (
        <div>
          <h3>Create Event</h3>

          <input
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />

          <input
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                description: e.target.value,
              })
            }
          />

          <input
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) =>
              setNewEvent({ ...newEvent, date: e.target.value })
            }
          />

          <input
            placeholder="Type"
            value={newEvent.type}
            onChange={(e) =>
              setNewEvent({ ...newEvent, type: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Seats"
            value={newEvent.seatsLeft}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                seatsLeft: e.target.value,
              })
            }
          />

          <button onClick={handleCreateEvent}>Save</button>
        </div>
      )}

      {/* EVENTS */}
      {!selected ? (
        events.map((e) => {
          const id = e.id || e._id;

          return (
            <div key={id}>
              <h3>{e.title}</h3>

              <button onClick={() => handleDetails(id)}>
                See Details
              </button>

              {userRole === "ADMIN" && (
                <>
                  <button onClick={() => handleEdit(e)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })
      ) : (
        <div>
          <button onClick={() => setSelected(null)}>Back</button>

          <h2>{selected.title}</h2>

          <button onClick={handleRegisterClick}>
            Register
          </button>

          {token && showForm && (
            <>
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ email: e.target.value })
                }
              />
              <button onClick={handleFinalRegister}>
                Confirm
              </button>
            </>
          )}
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          setToken={(t) => {
            setToken(t);
            localStorage.setItem("token", t);
          }}
        />
      )}
    </div>
  );
}