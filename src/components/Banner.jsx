import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  return (
    <Row
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }} // Adjust height to center vertically
    >
      <Col xs="auto" className="text-center">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        <Link to={data.destination}>
          <Button variant="primary">{data.buttonLabel}</Button>
        </Link>
      </Col>
    </Row>
  );
}
