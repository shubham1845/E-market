import { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import UserContext from "../context/UserContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function CourseView() {
  const notyf = new Notyf();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Assume user includes the token
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1

  // Fetch product details when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notyf.error(data.error);
        } else {
          setName(data.name);
          setDescription(data.description);
          setPrice(data.price);
        }
      })
      .catch((error) => {
        notyf.error("Failed to fetch product details.");
        console.log(error);
      });
  }, [productId]);

  // Add to Cart function
  function addToCart() {
    const token = localStorage.getItem("token"); // Get the JWT token

    if (!token) {
      notyf.error("Please login to add items to the cart.");
      return navigate("/login");
    }

    fetch(`${import.meta.env.VITE_API_URL}/carts/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
      body: JSON.stringify({
        productId, // Send the product ID
        quantity, // Send the quantity
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Items added to cart successfully") {
          notyf.success(data.message);
        } else {
          notyf.error(data.message || "Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        notyf.error("An error occurred while adding to the cart.");
      });
  }

  // Function to handle quantity changes
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value); // Ensure quantity is at least 1
    setQuantity(newQuantity);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center my-5">
        <Col lg={{ span: 6, offset: 0 }} md={8} xs={12}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="font-weight-bold mb-3">{name}</Card.Title>

              <Card.Subtitle className="mb-2 text-muted">
                Description
              </Card.Subtitle>
              <Card.Text>{description}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
              <Card.Text>${price}</Card.Text>

              {/* Quantity Input Group */}
              <InputGroup className="mb-3">
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </Button>
                <FormControl
                  className="text-center"
                  value={quantity}
                  readOnly // Ensure quantity is controlled by buttons
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </InputGroup>

              {/* Add to Cart Button */}
              {user && user.id !== null ? (
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={addToCart} // Call addToCart directly without passing productId manually
                >
                  Add {quantity} to Cart
                </Button>
              ) : (
                <Link className="btn btn-danger w-100" to="/login">
                  Log In to Add to Cart
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
