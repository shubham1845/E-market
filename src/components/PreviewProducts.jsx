import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// props - the sent props by the FeaturedCourses.jsx
export default function PreviewProducts(props) {
  const { breakPoint, data } = props;

  // From the destructured prop we should be able to access the data that contains course properties.
  // Now, here we desctrucured all the course properties so we could directly use just the property name in our return statement.
  const { _id, name, description, price } = data;

  return (
    <Col xs={12} md={breakPoint}>
      <Card className="cardHighlight mx-2 mb-4 shadow-sm border-0 h-100">
        <Card.Body>
          <Card.Title className="text-center font-weight-bold">
            <Link
              to={`/courses/${_id}`}
              className="text-dark text-decoration-none"
            >
              {name}
            </Link>
          </Card.Title>
          <Card.Text className="mt-3 text-muted text-center">
            {description}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-white border-0 text-center">
          <Link className="btn btn-primary w-100" to={`/products/${_id}`}>
            View Detail
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}
