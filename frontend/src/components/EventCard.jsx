export default function EventCard({ event, onSelect }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description.substring(0, 80)}...</p>

      <button onClick={() => onSelect(event)}>
        See Details
      </button>
    </div>
  );
}