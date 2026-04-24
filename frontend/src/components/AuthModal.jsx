import { useState } from "react";
import { login, signup } from "../services/api";
import { jwtDecode } from "jwt-decode";

export default function AuthModal({ onClose, setToken }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/i;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async () => {
    try {
      if (!isSignup) {
        if (!form.username.trim() || !form.password.trim()) {
          alert("Username and Password are required");
          return;
        }
      }
      if (isSignup) {
        if (!form.username.trim()) { alert("Username is required"); return; }
        if (!form.password.trim()) { alert("Password is required"); return; }
        if (!passwordRegex.test(form.password)) {
          alert("Password must be 8+ chars, include letter, number & special character");
          return;
        }
        if (!form.email.trim()) { alert("Email is required"); return; }
        if (!emailRegex.test(form.email)) { alert("Invalid email format"); return; }
        if (!form.firstName.trim()) { alert("First Name is required"); return; }
        if (!form.lastName.trim()) { alert("Last Name is required"); return; }
        if (!form.role) { alert("Please select a role"); return; }
      }

      let res;
      if (isSignup) res = await signup(form);
      else res = await login(form);

      if (res.token) {
        localStorage.setItem("token", res.token);
        const decoded = jwtDecode(res.token);
        const role = decoded.role || decoded.roles || decoded.authorities?.[0];
        if (!role) { alert("Role not found in token"); return; }
        localStorage.setItem("role", role);
        localStorage.setItem("username", form.username);
        setToken(res.token);
        onClose();
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <p className="modal-eyebrow">{isSignup ? "Create Account" : "Welcome back"}</p>
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        </div>

        <div className="input-group">
          <label className="input-label">Username</label>
          <input
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {isSignup && (
          <>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                placeholder="yourname@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="">Select a role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </>
        )}

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px", marginTop: "8px", borderRadius: "10px", fontSize: "0.95rem" }} onClick={handleSubmit}>
          {isSignup ? "Create Account" : "Login"} →
        </button>

        <div className="modal-switch">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign up"}
          </span>
        </div>
      </div>
    </div>
  );
}