import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "../styles/Home.css";

const Products = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };
  {
    console.log("hello");
  }
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images.url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Products;
