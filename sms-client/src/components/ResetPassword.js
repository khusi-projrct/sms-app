import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { newPassword });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          className="form-control mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">Reset Password</button>
      </form>
      {message && <p className="mt-3 text-info">{message}</p>}
    </div>
  );
}
