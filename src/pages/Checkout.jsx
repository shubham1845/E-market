import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col, Alert } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const notyf = new Notyf();
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false); // To track if order is placed
  const [orderDetails, setOrderDetails] = useState(null); // To store the new order details
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      fetch(`${import.meta.env.VITE_API_URL}/carts/get-cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "No cart found for this user") {
            notyf.error("Your cart is empty.");
            setCartItems([]);
            setTotalPrice(0);
          } else if (
            data.message === "Items in the cart retrieved successfully"
          ) {
            setCartItems(data.cart.cartItems || []);
            setTotalPrice(data.cart.totalPrice || 0);
          } else {
            notyf.error("Failed to load cart.");
          }
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
          notyf.error("Failed to load cart.");
        });
    }
  }, [user]);

  const handleCheckout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Order successfully placed") {
          notyf.success("Order placed successfully!");
          setOrderPlaced(true); // Mark order as placed
          setOrderDetails(data.order); // Set the new order details
          setCartItems([]); // Clear cart items
          setTotalPrice(0); // Reset total price
        } else {
          notyf.error(data.message || "Failed to place order.");
        }
      })
      .catch((err) => {
        console.error("Error during checkout:", err);
        notyf.error("Failed to place order.");
      });
  };

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>

      {orderPlaced ? (
        <Alert variant="success">
          <h4>Order Confirmation</h4>
          <p>Your order has been successfully placed!</p>
          <p>
            <strong>Order ID:</strong> {orderDetails._id}
          </p>
          <p>
            <strong>Total Price:</strong> ${orderDetails.totalPrice.toFixed(2)}
          </p>
          <Button variant="primary" onClick={() => navigate("/orders")}>
            View Orders
          </Button>
        </Alert>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <>
              <Row>
                {cartItems.map((item) => (
                  <Col key={item.productId} md={6} lg={4}>
                    <Card className="mb-4 shadow-sm border-0">
                      <Card.Body>
                        <Card.Title className="mb-3 font-weight-bold text-primary">
                          {item.productName}
                        </Card.Title>
                        <Card.Text className="mb-2">
                          <span className="text-muted">Quantity:</span>{" "}
                          {item.quantity}
                        </Card.Text>
                        <Card.Text className="mb-2">
                          <span className="text-muted">Subtotal:</span> $
                          {item.subtotal.toFixed(2)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
              <Button variant="success" onClick={handleCheckout}>
                Confirm Checkout
              </Button>
            </>
          ) : (
            <Alert variant="warning">Your cart is empty.</Alert>
          )}
        </>
      )}
    </Container>
  );
}
