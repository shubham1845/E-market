import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import React, { useState, useContext } from "react";
import ProductCard from "./ProductCard";

export default function SearchBox() {
  // Seacrh by name start
  const [productName, setProductName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search was done
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      setError("Please enter a product name.");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResults([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/search-by-name`,
        {
          method: "POST", // POST method to align with the backend controller
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: productName }), // Send name in the body
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error searching for product.");
      } else if (Array.isArray(data)) {
        setSearchResults(data); // Set results if the response is an array
        setSearchPerformed(true); // Mark that the search was performed
        setError("");
      } else {
        setError("Unexpected data format from API.");
      }
    } catch (err) {
      setError("An error occurred while searching for the product.");
    } finally {
      setLoading(false);
    }
  };
  ///////end of search by name////////

  // Handle the search form submission
  const handleSearchByPrice = async (e) => {
    e.preventDefault();

    if (!minPrice || !maxPrice) {
      setError("Please provide both minimum and maximum prices.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/search-by-price`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            minPrice: parseFloat(minPrice), // Send minPrice and maxPrice in request body
            maxPrice: parseFloat(maxPrice),
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data);
      setSearchPerformed(true); // Mark that the search was performed
      setError("");
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(error.message);
    }
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
      <Container>
        <div className="text-center">
          <h1>Search for a Product</h1>
        </div>

        <div className="container mt-4 mb-5">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-info">Loading...</div>}

          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              placeholder="Enter Product Name"
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="minPrice">Minimum Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="minPrice"
                  value={minPrice}
                  placeholder="Enter Minimum Price"
                  onChange={(e) => setMinPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="maxPrice">Maximum Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxPrice"
                  value={maxPrice}
                  placeholder="Enter Maximum Price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button onClick={handleSearch} className="btn btn-primary">
              Search by Name
            </button>
            <button onClick={handleSearchByPrice} className="btn btn-primary">
              Search by Price Range
            </button>
          </div>

          {searchPerformed && searchResults.length === 0 ? (
            <div className="alert alert-warning mt-4">
              No products found with the given criteria.
            </div>
          ) : (
            searchResults.length > 0 && (
              <div className="mt-4">
                <h3>Search Results</h3>
                <ul className="list-group">
                  {searchResults.map((product) => (
                    <ProductCard key={product._id} productProp={product} />
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </Container>
    </>
  );
}
