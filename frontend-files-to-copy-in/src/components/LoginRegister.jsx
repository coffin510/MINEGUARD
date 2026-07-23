import React, { useState } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import api from "../api";

// import "boxicons/css/boxicons.min.css"; // optional, if you used boxicons CDN

export default function LoginRegister() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    setActive(false);
  };

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const { data } = await api.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      localStorage.setItem("mineguard_token", data.token);
      localStorage.setItem("mineguard_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setRegError("");
    setRegLoading(true);
    try {
      const { data } = await api.post("/auth/register", {
        name: regName,
        email: regEmail,
        password: regPassword,
      });
      localStorage.setItem("mineguard_token", data.token);
      localStorage.setItem("mineguard_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setRegError(err.response?.data?.message || "Registration failed");
    } finally {
      setRegLoading(false);
    }
  }

  return (
  <div className="page-wrapper">
    <div className={`container ${active ? "active" : ""}`}>
      <div className="curved-shape"></div>
      <div className="curved-shape2"></div>

      {/* Login Form */}
      <div className="form-box Login">
        <h2 className=" animation" style={{ "--D": 0, "--S": 21 }}>
          Login
        </h2>
        <form onSubmit={handleLoginSubmit}>
          {loginError && (
            <p style={{ color: "#ff8a80", fontSize: "0.85rem" }}>{loginError}</p>
          )}

          <div className="input-box animation" style={{ "--D": 1, "--S": 22 }}>
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label>Email</label>
            <box-icon type="solid" name="user" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 2, "--S": 23 }}>
            <input
              type="password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <label>Password</label>
            <box-icon type="solid" name="lock-alt" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 3, "--S": 24 }}>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full h-[45px] relative flex items-center justify-center bg-transparent border-2 border-[#E46033] text-white font-semibold rounded-[40px] overflow-hidden z-10 cursor-pointer hover:bg-[#E46033] transition-all duration-300 text-center"
              style={{ width: "100%" }}
            >
              {loginLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="regi-link animation" style={{ "--D": 4, "--S": 25 }}>
            <p>
              Don't have an account?{" "}
              <a href="#" className="SignUpLink" onClick={handleSignUpClick}>
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Register Form */}
      <div className="form-box Register">
        <h2 className="animation" style={{ "--D": 0, "--S": 21 }}>
          Register
        </h2>
        <form onSubmit={handleRegisterSubmit}>
          {regError && (
            <p style={{ color: "#ff8a80", fontSize: "0.85rem" }}>{regError}</p>
          )}

          <div className="input-box animation" style={{ "--D": 1, "--S": 22 }}>
            <input
              type="text"
              required
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
            />
            <label>Username</label>
            <box-icon type="solid" name="user" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 2, "--S": 23 }}>
            <input
              type="email"
              required
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <label>Email</label>
            <box-icon type="solid" name="envelope" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 3, "--S": 24 }}>
            <input
              type="password"
              required
              minLength={6}
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <label>Password</label>
            <box-icon type="solid" name="lock-alt" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 4, "--S": 25 }}>
            <button type="submit" className="btn" disabled={regLoading}>
              {regLoading ? "Creating account..." : "Register"}
            </button>
          </div>

          <div className="regi-link animation" style={{ "--D": 5, "--S": 26 }}>
            <p>
              Already have an account?{" "}
              <a href="#" className="SignInLink" onClick={handleSignInClick}>
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
   </div> 
  );
}
