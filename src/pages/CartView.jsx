import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function CartView() {
  const notyf = new Notyf();
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
            setCartItems(data.cart.cartItems || []); // Adjust based on actual cart structure
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

  const removeFromCart = (productId) => {
    console.log("Removing product with ID:", productId); // Add this line for debugging
    fetch(
      `${import.meta.env.VITE_API_URL}/carts/${productId}/remove-from-cart`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Items removed from cart successfully") {
          notyf.success("Item removed from cart.");
          setCartItems(data.cart.cartItems || []);
          setTotalPrice(data.cart.totalPrice || 0);
        } else {
          notyf.error(data.message || "Failed to remove item.");
        }
      })
      .catch((err) => {
        console.error("Error removing item from cart:", err);
        notyf.error("Failed to remove item.");
      });
  };
  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  const clearCart = () => {
    fetch(`${import.meta.env.VITE_API_URL}/carts/clear-cart`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Cart cleared successfully") {
          notyf.success("Cart cleared.");
          setCartItems([]); // Empty cart items in frontend
          setTotalPrice(0); // Reset total price to 0
        } else {
          notyf.error(data.message || "Failed to clear cart.");
        }
      })
      .catch((err) => {
        console.error("Error clearing cart:", err);
        notyf.error("Failed to clear cart.");
      });
  };

  return (
    <>
      <Container className="mt-5">
        <h2>Your Cart</h2>
        <div className="mt-3 d-flex justify-content-end align-items-center">
          <h3 className="mr-3">Total: ${totalPrice.toFixed(2)}</h3>
          <Button variant="warning" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

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
                      <Button
                        variant="outline-danger"
                        className="mt-3 w-100"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove from Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        {cartItems.length > 0 && (
          <Button variant="success" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        )}
      </Container>
    </>
  );
}
