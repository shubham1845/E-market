import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PreviewProducts from "./PreviewProducts"; // This will be our page where we preview/display our courses to advertise

export default function FeaturedProducts() {
  // previews state - will  contain all courses card to feature to be loaded in the return statement.
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // array to store unique random indexes to select random products
        const numbers = new Set();
        const featured = [];

        // Generate random unique numbers
        while (numbers.size < 5 && numbers.size < data.length) {
          let randomNum = Math.floor(Math.random() * data.length);
          numbers.add(randomNum);
        }

        // Convert Set to Array and use the random numbers to select products
        const randomIndexes = Array.from(numbers);

        randomIndexes.forEach((index) => {
          featured.push(
            <PreviewProducts
              data={data[index]}
              key={data[index]._id}
              breakPoint={2}
            />
          );
        });

        setPreviews(featured);
      });
  }, []);

  return (
    <>
      <h2 className="text-center">Featured Products</h2>
      <CardGroup className="justify-content-center">{previews}</CardGroup>
    </>
  );
}
