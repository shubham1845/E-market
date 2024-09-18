import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const location = useLocation(); // Hook to get the current path
  console.log(user);
  // // Check if the current path is related to password reset
  const isPasswordResetPage = location.pathname.includes(
    `/users/reset-password`
  );

  if (isPasswordResetPage) {
    return (
      <Navbar expand="lg" className="bg-light shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
            E-Market
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" className="nav-link">
                Products
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return (
    <>
      <Navbar expand="lg" className="bg-light shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
            E-Market
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" className="nav-link">
                Products
              </Nav.Link>

              {user?.isAdmin && (
                <Nav.Link as={NavLink} to="/addProduct" className="nav-link">
                  Add Products
                </Nav.Link>
              )}
            </Nav>

            <Nav className="ms-auto">
              {user.id != (null || undefined) ? (
                <>
                  <Nav.Link as={NavLink} to="/myCart" className="nav-link">
                    Cart
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/orders" className="nav-link">
                    Order
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/profile" className="nav-link">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout" className="nav-link">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/register" className="nav-link">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/login" className="nav-link">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
