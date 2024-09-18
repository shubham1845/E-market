import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

export default function AdminView({ fetchData, productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set the products state with the imported productsData
    setProducts(productsData);
  }, [productsData]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td className={`text-${product.isActive ? "success" : "danger"}`}>
                {product.isActive ? "Available" : "Unavailable"}
              </td>
              <td className="text-center">
                <EditProduct product={product} fetchData={fetchData} />
                <ArchiveProduct
                  productId={product._id}
                  isActive={product.isActive}
                  fetchData={fetchData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
