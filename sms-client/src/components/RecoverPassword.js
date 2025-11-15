import React, { useState } from "react";
import axios from "axios";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>
      <p>Enter your email address and we’ll send you a reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <p className="mt-3 text-info">{message}</p>}
    </div>
  );
}
