import React from "react";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";

export default function Products() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  console.log(user);
  const fetchData = () => {
    // Allows to have a dynamic url depending whether the user that's logged in is an admin or not
    let fetchUrl =
      user.isAdmin === true
        ? `${import.meta.env.VITE_API_URL}/products/all`
        : `${import.meta.env.VITE_API_URL}/products/active`;

    // headers is included for both /courses/all and /courses/ to allow flexibility even if it is not needed.
    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, [user]);
  return (
    <>
      {user && user.isAdmin ? (
        <AdminView fetchData={fetchData} productsData={products} />
      ) : (
        <UserView productsData={products} />
      )}
    </>
  );
}

ProductCard.propTypes = {
  // The "shape" method is used to check if a prop object conforms to a specific "shape"
  product: PropTypes.shape({
    // Define the properties and their expected types
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
