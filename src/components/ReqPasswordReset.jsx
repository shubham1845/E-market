import React, { useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function ReqPasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const notyf = new Notyf();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage(data.message);
        notyf.success("Please check your email for the reset link.");
      } else {
        setError(data.message);
        notyf.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      notyf.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          {loading ? "Sending..." : "Request Password Reset"}
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
