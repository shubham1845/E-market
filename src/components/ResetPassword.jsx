// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const ResetPassword = () => {
//   const { id, token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== passwordConfirmation) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/users/reset-password/${id}/${token}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             password,
//             password_confirmation: passwordConfirmation,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         navigate("/login"); // Redirect to login after successful reset
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>New Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm New Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">
//           Reset Password
//         </button>
//       </form>
//       {message && <div className="alert alert-success mt-3">{message}</div>}
//       {error && <div className="alert alert-danger mt-3">{error}</div>}
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "notyf/notyf.min.css";

const ResetPassword = () => {
  const notyf = new Notyf();
  const { id, token } = useParams();
  console.log("ID is:" + id);
  console.log("token is: " + token);

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            password_confirmation: passwordConfirmation,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        notyf.success("Password Changed Successfully");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after successful reset
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Reset Password
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ResetPassword;
