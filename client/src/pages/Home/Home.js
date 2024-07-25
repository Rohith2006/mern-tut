import React from "react";
import ProductCard from "../../components/ProductList/ProductList";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <br />
      <ProductCard />
      <a href="/post">Post</a>
    </div>
  );
  };

export default Home;
