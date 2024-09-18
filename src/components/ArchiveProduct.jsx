import { Button } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function ArchiveProduct({ productId, isActive, fetchData }) {
  const notyf = new Notyf();

  const archiveToggle = () => {
    const url = `${import.meta.env.VITE_API_URL}/products/${productId}/${
      isActive ? "archive" : "activate"
    }`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Add content type
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.message) {
          notyf.success(data.message || "Product status updated successfully");
        } else {
          notyf.error(data.message || "Something went wrong");
        }
        fetchData(); // Refresh the course list
      })
      .catch((err) => {
        notyf.error("Failed to update the product status");
      });
  };

  return (
    <Button
      variant={isActive ? "danger" : "success"}
      size="sm"
      onClick={archiveToggle}
    >
      {isActive ? "Archive" : "Unarchive"}
    </Button>
  );
}
