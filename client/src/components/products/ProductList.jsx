import React, { useState, useEffect } from "react";
import { useActiveShop, useCartStore } from "../../store/Store";
import axios from "axios";
import ProductItem from "./ProductItem";
import Loading from "../Loading";
import Grid from "@mui/material/Grid";

const ProductList = ({ shopUrl, currentProductType }) => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const currentActiveShop = useActiveShop((state) => state.activeShop);
  const changeActiveShop = useActiveShop((state) => state.setActiveShop);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/products/shop/${shopUrl}?type=${currentProductType}`
      );

      // console.log(response.data);

      setProducts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentProductType]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (isLoading) {
    return (
      <div className="center-item">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {!isLoading && products && (
        <div className="products-container">
          <Grid container spacing={2}>
            {products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default ProductList;
