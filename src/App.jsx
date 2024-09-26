import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Logout from "./pages/Logout";
import { UserProvider } from "./context/UserContext";
import Container from "react-bootstrap/Container";

import Home from "./pages/Home";
import AppNavbar from "./components/AppBanner";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import CartView from "./pages/CartView";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import RequestPasswordReset from "./components/ReqPasswordReset";
import ResetPassword from "./components/ResetPassword";
import ReqPasswordReset from "./components/ReqPasswordReset";
import ConfirmEmail from "./components/ConfirmEmail";

function App() {
  const [user, setUser] = useState({
    id: null,
    email: null,
    firstName: null,
    isAdmin: null,
    mobileNo: null,
    lastName: null,
  });

  // unsetUser function to clear localStorage and reset user
  function unsetUser() {
    console.log("Clearing user data and localStorage");
    localStorage.clear();
    setUser({
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      mobileNo: null,
      isAdmin: null,
    });
  }

  // Function to retrieve user details using token
  function retrieveUserDetails(token) {
    if (!token) {
      console.log("No token found in localStorage");
      unsetUser();
      return;
    }

    console.log("Fetching user details with token:", token);

    fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching user details: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("User details fetched:", data);
        if (data && data._id) {
          setUser({
            id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNo: data.mobileNo,
            isAdmin: data.isAdmin,
          });
        } else {
          console.log("Invalid user data, clearing user.");
          unsetUser();
        }
      })
      .catch((err) => {
        console.error("Error occurred while fetching user details:", err);
        unsetUser();
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Current user in state:", user);
    console.log("Token from localStorage:", token);
    retrieveUserDetails(token);
  }, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/users/confirm-email/:token"
                element={<ConfirmEmail />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ViewProduct />} />
              <Route path="/carts/:productId" element={<ViewProduct />} />
              <Route path="/myCart" element={<CartView />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forgot-password" element={<ReqPasswordReset />} />

              <Route
                path="/request-password-reset"
                element={<RequestPasswordReset />}
              />
              <Route
                path="/users/reset-password/:id/:token"
                element={<ResetPassword />}
              />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
