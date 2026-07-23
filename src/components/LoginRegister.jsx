import React, { useState } from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";


// import "boxicons/css/boxicons.min.css"; // optional, if you used boxicons CDN

export default function LoginRegister() {
  const [active, setActive] = useState(false);

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    setActive(false);
  };

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
        <form action="#">
          <div className="input-box animation" style={{ "--D": 1, "--S": 22 }}>
            <input type="text" required />
            <label>Username</label>
            <box-icon type="solid" name="user" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 2, "--S": 23 }}>
            <input type="password" required />
            <label>Password</label>
            <box-icon type="solid" name="lock-alt" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 3, "--S": 24 }}>
            <Link
            to="/dashboard"
            className="w-full h-[45px] relative flex items-center justify-center bg-transparent border-2 border-[#E46033] text-white font-semibold rounded-[40px] overflow-hidden z-10 cursor-pointer hover:bg-[#E46033] transition-all duration-300 text-center"
            >
              Login
            </Link>

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
        <form action="#">
          <div className="input-box animation" style={{ "--D": 1, "--S": 22 }}>
            <input type="text" required />
            <label>Username</label>
            <box-icon type="solid" name="user" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 2, "--S": 23 }}>
            <input type="email" required />
            <label>Email</label>
            <box-icon type="solid" name="envelope" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 3, "--S": 24 }}>
            <input type="password" required />
            <label>Password</label>
            <box-icon type="solid" name="lock-alt" color="gray"></box-icon>
          </div>

          <div className="input-box animation" style={{ "--D": 4, "--S": 25 }}>
            <button type="submit" className="btn">
              Register
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
