import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  const data = {
    title: "Shubham E-Commerce App",
    content: "Discounts for everyone in every our products ",
    destination: "/",
    buttonLabel: "Buy now!",
  };

  return (
    <>
      <Banner data={data} />
      <FeaturedProducts />
      {/* <Highlights /> */}
    </>
  );
}
