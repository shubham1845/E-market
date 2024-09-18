import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function AddProduct() {
  const notyf = new Notyf();
  // Define state variables for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { user } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    if (name !== "" && description !== "" && price !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [name, description, price]);

  // handeling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        name,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Product added successfully") {
          notyf.success("Product added successful");
        } else if (data.message === "This product already exists.") {
          notyf.error("Product already exists");
        } else {
          notyf.error(data.message || "Something went wrong");
        }
      });
    // Reset form fields after handling the response
    setName("");
    setDescription("");
    setPrice("");
    // console.log({ name, description, price });
  };

  return (
    <Container>
      <h2>Add New Product</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description here"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
    </Container>
  );
}
