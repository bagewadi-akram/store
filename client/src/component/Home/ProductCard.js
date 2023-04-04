import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/getProduct/${product._id}`}>
      <img src={product.image[0].url} alt={product.title} />
      <p>{product.title}</p>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
