import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's orders when the component is mounted
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/my-orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're using JWT stored in localStorage
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  return (
    <Container>
      <h2 className="my-4">My Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="mb-4">
            <Card.Body>
              <Card.Title>Order ID: {order._id}</Card.Title>
              <h5>Products Ordered:</h5>
              {order.productsOrdered.length > 0 ? (
                order.productsOrdered.map((product) => (
                  <div key={product.productId} className="mb-2">
                    <Row>
                      <Col xs={6}>
                        <strong>{product.productName}</strong> (x
                        {product.quantity})
                      </Col>
                      <Col xs={6} className="text-end">
                        Subtotal: ${product.subtotal.toFixed(2)}
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p className="text-muted">No products ordered.</p>
              )}

              <Card.Text className="text-muted">
                Status: {order.status || "Unknown"}
              </Card.Text>
              <Row className="align-items-center">
                <Col xs={6}>
                  <Card.Text>
                    <span className="text-muted">Purchased On:</span>{" "}
                    {order.orderedOn
                      ? new Date(order.orderedOn).toLocaleDateString()
                      : "N/A"}
                  </Card.Text>
                </Col>
                <Col xs={6} className="text-end">
                  <Card.Text>
                    <span className="text-muted">Total Price:</span>{" "}
                    {order.totalPrice
                      ? `$${order.totalPrice.toFixed(2)}`
                      : "N/A"}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
