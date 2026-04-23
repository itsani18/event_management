import { useState } from "react";
import { login, signup } from "../services/api";
import { jwtDecode } from "jwt-decode";

export default function AuthModal({ onClose, setToken, inline = false }) {
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
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async () => {
    try {
      if (!isSignup) {
        if (!form.username.trim() || !form.password.trim()) {
          alert("Username and Password are required");
          return;
        }
      }

      if (isSignup) {
        if (!form.username.trim()) return alert("Username required");
        if (!form.password.trim()) return alert("Password required");
        if (!passwordRegex.test(form.password))
          return alert("Weak password");

        if (!form.email.trim()) return alert("Email required");
        if (!emailRegex.test(form.email))
          return alert("Invalid email");

        if (!form.firstName.trim()) return alert("First name required");
        if (!form.lastName.trim()) return alert("Last name required");
        if (!form.role) return alert("Select role");
      }

      let res = isSignup ? await signup(form) : await login(form);

      if (res.token) {
        localStorage.setItem("token", res.token);

        const decoded = jwtDecode(res.token);
        const role =
          decoded.role ||
          decoded.roles ||
          decoded.authorities?.[0];

        localStorage.setItem("role", role);
        localStorage.setItem("username", form.username);

        setToken(res.token);
        onClose && onClose();
      }
    } catch (err) {
      alert(err.message || "Error");
    }
  };

  return (
    <div className={inline ? "auth-card" : "modal"}>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {isSignup && (
        <>
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
          />
          <input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
          />
          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </>
      )}

      <button className="primary-btn big-btn" onClick={handleSubmit}>
        {isSignup ? "Signup →" : "Login →"}
      </button>

      <p
        className="switch-text"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have account?" : "Create account"}
      </p>
    </div>
  );
}