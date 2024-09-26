import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function ConfirmEmail() {
  const notyf = new Notyf();
  const { token } = useParams(); // token from URL
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to confirm email when the button is clicked
  const handleConfirmEmail = () => {
    setLoading(true); // Set loading to true when request starts

    // Fetch API call to confirm email
    fetch(`${import.meta.env.VITE_API_URL}/users/confirm-email/${token}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || "Invalid or expired token.");
          });
        }
        return res.json(); // Parse JSON if success
      })
      .then((data) => {
        if (data.message === "Email confirmed successfully.") {
          setStatus("success");
          notyf.success(data.message);
        } else if (data.message === "Email already confirmed.") {
          setStatus("alreadyConfirmed");
          notyf.success(data.message);
        }
      })
      .catch((error) => {
        setStatus("error");
        notyf.error(error.message || "Error confirming email.");
      })
      .finally(() => {
        setLoading(false); // Stop loading regardless of success or failure
      });
  };

  return (
    <div className="text-center my-5">
      {loading ? (
        <h2>Confirming your email...</h2>
      ) : status === "success" ? (
        <>
          <h2>Email confirmed successfully!</h2>
          <p>
            You can now <Link to="/login">login</Link> to your account.
          </p>
        </>
      ) : status === "alreadyConfirmed" ? (
        <>
          <h2>Your email was already confirmed!</h2>
          <p>
            You can <Link to="/login">login</Link> to your account now.
          </p>
        </>
      ) : status === "error" ? (
        <>
          <h2>Failed to confirm your email.</h2>
          <p>Invalid or expired token. Please try registering again.</p>
        </>
      ) : (
        <>
          <h2>Click the button to confirm your email</h2>
          <button onClick={handleConfirmEmail} className="btn btn-primary">
            Confirm Email
          </button>
        </>
      )}
    </div>
  );
}
