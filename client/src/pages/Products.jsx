import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductTypes from "../components/products/ProductTypes";
import ProductList from "../components/products/ProductList";
import "../styles/Products.css";
import ShopInfo from "../components/shops/ShopInfo";

const Products = () => {
  const params = useParams();
  const [currentProductType, setCurrentProductType] = useState("");

  // useEffect(() => {
  //   // console.log(currentProductType);
  // }, [currentProductType]);

  return (
    <>
      <div className="products-page-container">
        <ShopInfo shopUrl={params.shopUrl} />
        <ProductTypes
          shopUrl={params.shopUrl}
          setCurrentProductType={setCurrentProductType}
        />
        <ProductList
          shopUrl={params.shopUrl}
          currentProductType={currentProductType}
        />
      </div>
    </>
  );
};

export default Products;
