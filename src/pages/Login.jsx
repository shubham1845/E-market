import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import ReqPasswordReset from "../components/ReqPasswordReset";

export default function Login() {
  // const navigate = useNavigate();

  const notyf = new Notyf();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  // this function uses getProfile controller function of our server application to get the user details after logging in.
  function retrieveUserDetails(token) {
    fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("getProfile output:");
        console.log(data);
        setUser({
          id: data._id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          isAdmin: data.isAdmin,
        });
      });
  }
  function loginUser(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email, // Ensure email is a defined variable
        password: password, // Ensure password is a defined variable
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle errors like incorrect email/password or email not found
          return response.json().then((data) => {
            if (data.message) {
              notyf.error(data.message);
            } else {
              notyf.error("An error occurred.");
            }
          });
        } else {
          return response.json(); // Handle success case
        }
      })
      .then((data) => {
        if (data && data.access) {
          // Successful login
          notyf.success("Thank you for logging in");

          // Set token in local storage
          localStorage.setItem("token", data.access);

          // Retrieve user details
          retrieveUserDetails(data.access);

          // Reset input states
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        notyf.error(
          "An error occurred while trying to log in. Please try again later."
        );
      });
  }

  return user.id != (null || undefined) ? (
    <Navigate to="/products" />
  ) : (
    <>
      <Form className="p-5" onSubmit={(e) => loginUser(e)}>
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {isActive ? (
          //true
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          //false
          <Button variant="danger" type="submit" disabled>
            Submit
          </Button>
        )}
      </Form>
      <div className="text-center">
        <Link to="/forgot-password">Forget password?</Link>
      </div>
    </>
  );
}
