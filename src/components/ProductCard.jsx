import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ productProp }) {
  // Destructure the product properties
  const { _id, name, description, price } = productProp;

  return (
    <Card className="cardHighlight mx-2 mb-4 shadow-sm border-0 h-100">
      <Card.Body>
        <Card.Title className="font-weight-bold">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Price:</Card.Subtitle>
        <Card.Text>{price}</Card.Text>
        <Link className="btn btn-primary" to={`/products/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}
