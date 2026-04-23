import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function EventDetails({ event, onRegister, onBack, token }) {

  const [email, setEmail] = useState("");
  const [showRegisterUI, setShowRegisterUI] = useState(false);

  // 🔥 AUTO FILL EMAIL
  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setEmail(saved);
  }, []);

  return (
    <div className="details-page">

      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="details-container">

        {/* LEFT → EVENT */}
        <div className="details-card">

          <h1 className="details-title">{event.title}</h1>

          <div className="details-item">
            <span>📄</span>
            <div>
              <p className="label">Description</p>
              <p>{event.description}</p>
            </div>
          </div>

          <div className="details-item">
            <span>🏷️</span>
            <div>
              <p className="label">Type</p>
              <p>{event.type || "General"}</p>
            </div>
          </div>

          <div className="details-item">
            <span>📅</span>
            <div>
              <p className="label">Date</p>
              <p>{event.date}</p>
            </div>
          </div>

          <div className="details-item">
            <span>👤</span>
            <div>
              <p className="label">Seats Left</p>
              <p>{event.seatsLeft}</p>
            </div>
          </div>

          {/* 🔥 REGISTER BUTTON */}
          {!showRegisterUI && (
            <button
              className="primary-btn big-btn"
              onClick={() => setShowRegisterUI(true)}
            >
              Register →
            </button>
          )}

        </div>

        {/* 🔥 RIGHT SIDE */}
        <div className="auth-side">

          {/* 🔥 ONLY SHOW AFTER CLICK */}
          {showRegisterUI && (

            <>
              {/* ❌ NOT LOGGED IN */}
              {!token && (
                <AuthModal
                  inline={true}
                  onClose={() => setShowRegisterUI(false)}
                  setToken={(t) => {
                    localStorage.setItem("token", t);
                     <AuthModal
                       inline={true}
                       onClose={() => setShowRegisterUI(false)}
                       setToken={(t) => {
                         localStorage.setItem("token", t);
                         window.location.reload();
                       }}
                     />// 🔥 simplest fix
                  }}
                />
              )}

              {/* ✅ LOGGED IN */}
              {token && (
                <div className="register-box">

                  <input value={email} disabled />

                  <button
                    className="primary-btn"
                    onClick={() => onRegister({ email })}
                  >
                    Confirm Registration →
                  </button>

                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}