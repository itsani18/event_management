import { useState } from "react";
import BackgroundShapes from "../components/BackgroundShapes";

export default function EventsPage({ events = [], goBack, onSelectEvent, role }) {

  // 🔥 PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  // 🔥 CALCULATE EVENTS
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div className="page">
      <BackgroundShapes />

      {/* 🔙 BACK */}
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      {/* 🔥 TITLE */}
      <h2 className="title">Events</h2>

      {/* 🔥 EMPTY STATE */}
      {events.length === 0 && (
        <p style={{ textAlign: "center", color: "white" }}>
          No events available
        </p>
      )}

      {/* 🔥 EVENT LIST */}
      <div className="event-list">
        {currentEvents.map((e) => (
          <div className="event-card" key={e.id}>
            <div>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
            </div>

            {/* 🔥 CLICKABLE DETAILS */}
            <button
              className="primary-btn"
              onClick={() => onSelectEvent(e)}
            >
              See Details →
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 PAGINATION */}
      <div className="pagination">

        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ← Prev
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next →
        </button>

      </div>

      {/* 🔥 OPTIONAL ADMIN UI */}
      {role === "ADMIN" && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button className="primary-btn">
            + Create Event
          </button>
        </div>
      )}
    </div>
  );
}