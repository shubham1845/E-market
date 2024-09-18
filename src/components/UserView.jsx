import PropTypes from "prop-types";
import ProductCard from "../components/ProductCard";
import SearchBox from "./SearchBox";

export default function UserView({ productsData }) {
  return (
    <div>
      <SearchBox />
      <h2 className="text-center">Our Products</h2>
      {productsData.map((product) => (
        <ProductCard key={product._id} productProp={product} />
      ))}
    </div>
  );
}

UserView.propTypes = {
  productsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
