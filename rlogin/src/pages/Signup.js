import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Import shared styles

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { username, email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Signup successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <h2>Sample Dashboard</h2>
          <h3>Sign Up</h3>
          <input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Enter Mail ID" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <button onClick={handleSignup}>SIGN UP</button>
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
        <div className="auth-right">
          <img src="/image.png" alt="Signup Visual" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
