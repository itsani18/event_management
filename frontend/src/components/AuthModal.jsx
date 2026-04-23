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

  // 🔥 PASSWORD RULE
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async () => {
    try {
      // ================= LOGIN =================
      if (!isSignup) {
        if (!form.username.trim() || !form.password.trim()) {
          alert("Username and Password are required");
          return;
        }
      }

      // ================= SIGNUP =================
      if (isSignup) {
        if (!form.username.trim()) {
          alert("Username is required");
          return;
        }

        if (!form.password.trim()) {
          alert("Password is required");
          return;
        }

        if (!passwordRegex.test(form.password)) {
          alert(
            "Password must be 8+ chars, include letter, number & special character"
          );
          return;
        }

        if (!form.email.trim()) {
          alert("Email is required");
          return;
        }

        if (!emailRegex.test(form.email)) {
          alert("Invalid email format");
          return;
        }

        if (!form.firstName.trim()) {
          alert("First Name is required");
          return;
        }

        if (!form.lastName.trim()) {
          alert("Last Name is required");
          return;
        }

        if (!form.role) {
          alert("Please select a role");
          return;
        }
      }

      // ================= API =================
      let res;
      if (isSignup) res = await signup(form);
      else res = await login(form);

      if (res.token) {
        localStorage.setItem("token", res.token);

        const decoded = jwtDecode(res.token);

        const role =
          decoded.role ||
          decoded.roles ||
          decoded.authorities?.[0];

        if (!role) {
          alert("Role not found in token");
          return;
        }

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
    <div className="modal">
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

      <button onClick={handleSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <p
        onClick={() => setIsSignup(!isSignup)}
        style={{ cursor: "pointer", marginTop: "10px" }}
      >
        {isSignup ? "Already have account?" : "Create account"}
      </p>
    </div>
  );
}