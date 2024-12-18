import FeaturedProducts from "../Components/FeaturedProducts";
import Slider from "../Components/Slider";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="text-white flex flex-col items-center">
      <h1 className="mt-10 mb-10 text-3xl font-semibold">Home</h1>
      <Link to="/search" className="mb-10">
        Search
      </Link>
      <Slider />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
