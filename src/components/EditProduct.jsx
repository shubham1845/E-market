import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function EditProduct({ product, fetchData }) {
  const notyf = new Notyf();

  // States for input boxes and modal visibility
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [showEdit, setShowEdit] = useState(false);

  // Edit product handler
  const editProduct = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/products/${product._id}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          notyf.success("Successfully Updated");
          fetchData(); // Refresh the product list
        } else {
          notyf.error("Something went wrong");
        }
        closeEdit(); // Close the modal
      })
      .catch(() => {
        notyf.error("An error occurred while updating the product.");
        closeEdit(); // Close the modal in case of error
      });
  };

  // Function to show the modal
  const openEdit = () => {
    setShowEdit(true);
  };

  // Function to hide the modal and reset fields to the original product values
  const closeEdit = () => {
    setShowEdit(false);
    setName(product.name); // Reset fields to the original product values
    setDescription(product.description);
    setPrice(product.price);
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={openEdit}>
        Edit
      </Button>
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={editProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
