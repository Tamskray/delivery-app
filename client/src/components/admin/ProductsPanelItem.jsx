import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProductModal from "./UpdateProductModal";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const ProductsPanelItem = ({ product, onUpdate }) => {
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const handleUpdateProductOpen = () => setOpenUpdateProductModal(true);
  const handleUpdateProductClose = () => setOpenUpdateProductModal(false);

  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
  const handleDeleteProductOpen = () => setOpenDeleteProductModal(true);
  const handleDeleteProductClose = () => setOpenDeleteProductModal(false);

  const handleUpdate = () => {
    onUpdate();
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_MAIN_URL}/products/${product._id}`
      );

      onUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UpdateProductModal
        open={openUpdateProductModal}
        closeHandler={handleUpdateProductClose}
        product={product}
        onUpdate={handleUpdate}
      />

      <Modal open={openDeleteProductModal} onClose={handleDeleteProductClose}>
        <div className="admin-open-modal">
          <h2>
            Точно <span style={{ color: "red" }}>ВИДАЛИТИ</span> продукт "
            {product.title}"?
          </h2>
          <Button variant="contained" color="error" onClick={deleteProduct}>
            Видалити остаточно
          </Button>
        </div>
      </Modal>

      <div key={product._id} className="admin-panel-shop-item">
        <div className="admin-panel-product-item-title">{product.title}</div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpdateProductOpen}
        >
          Редагувати
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteProductOpen}
        >
          Видалити
        </Button>
      </div>
    </>
  );
};

export default ProductsPanelItem;
