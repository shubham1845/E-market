import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link } from "react-router-dom";

export default function Register() {
  const notyf = new Notyf();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        mobileNo,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message ===
          "User registered successfully. Please confirm your email."
        ) {
          notyf.success(data.message);
        } else {
          notyf.error(data.message || "Something went wrong");
        }
      })
      .catch((err) => {
        notyf.error("Registration failed");
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNo("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <>
      <Form className="p-5" onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mobile No.:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile Number"
            required
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {isActive ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="danger" type="submit" disabled>
            Submit
          </Button>
        )}
      </Form>
      <p className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
}
