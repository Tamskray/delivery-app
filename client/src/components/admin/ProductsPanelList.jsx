import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import NewProductModal from "./NewProductModal";

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
          <div key={product._id} className="admin-panel-shop-item">
            <div className="admin-panel-product-item-title">
              {product.title}
            </div>
            <Button variant="contained" color="secondary">
              Редагувати
            </Button>
            <Button variant="outlined" color="error">
              Видалити
            </Button>
          </div>
        ))}
    </>
  );
};

export default ProductsPanelList;
