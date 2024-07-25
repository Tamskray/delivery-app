import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import NewProductModal from "./NewProductModal";
import UpdateProductModal from "./UpdateProductModal";
import ProductsPanelItem from "./ProductsPanelItem";

const ProductsPanelList = ({ shopUrl }) => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [searchProduct, setSearchProduct] = useState("");

  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  const handleAddProductOpen = () => setOpenAddProductModal(true);
  const handleAddProductClose = () => setOpenAddProductModal(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/products/shop/${shopUrl}`
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
  }, []);

  const updateProductsList = () => {
    fetchProducts();
  };

  const filteredProducts =
    products &&
    products.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.trim().toLowerCase())
    );

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <NewProductModal
        open={openAddProductModal}
        closeHandler={handleAddProductClose}
        shopUrl={shopUrl}
        onUpdate={updateProductsList}
      />

      <Button
        variant="contained"
        color="success"
        onClick={handleAddProductOpen}
      >
        Додати
      </Button>

      <TextField
        style={{ marginTop: 20 }}
        fullWidth
        label="Пошук товару.."
        id="fullWidth"
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
      />
      {!isLoading &&
        products &&
        filteredProducts.map((product) => (
          <ProductsPanelItem
            key={product._id}
            product={product}
            onUpdate={updateProductsList}
          />
        ))}
    </>
  );
};

export default ProductsPanelList;
