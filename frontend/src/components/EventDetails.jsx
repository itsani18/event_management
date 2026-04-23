import { useState } from "react";

export default function EventDetails({ event, onRegister }) {
  const [seats, setSeats] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="details">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><b>Time:</b> {event.time}</p>

      <h3>Register</h3>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
      />

      <button onClick={() => onRegister({ email, seats })}>
        Confirm Registration
      </button>
    </div>
  );
}