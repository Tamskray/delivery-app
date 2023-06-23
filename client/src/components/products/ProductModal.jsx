import React, { useState } from "react";
import { useCartStore } from "../../store/Store";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./ProductModal.css";

const ColorButton = styled(Button)(() => ({
  backgroundColor: "#602db9",
  "&:hover": {
    backgroundColor: "#6b32cd",
  },
}));

const ProductModal = ({
  open,
  handleClose,
  product,
  dumbQuantity,
  setDumbQuantity,
  addToCartHandler,
}) => {
  const productsInCart = useCartStore((state) => state.cartProducts);
  const addToCartProduct = useCartStore((state) => state.addToCart);

  const addProductQuantity = () => {
    setDumbQuantity((prev) => prev + 1);
  };

  const subtractProductQuantity = () => {
    dumbQuantity > 1 && setDumbQuantity((prev) => prev - 1);
  };

  // const addToCartHandler = () => {};

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="product-item-modal">
        <div className="product-image-modal">
          <img
            src={`${process.env.REACT_APP_URL}/${product.image}`}
            alt={product.title}
          />
        </div>
        <hr />
        <div className="product-title-modal">{product.title}</div>
        <div className="product-description-modal">{product.description}</div>
        <hr />
        <div className="product-modal-footer">
          <div className="product-price-modal">{product.price} ₴</div>
          <div className="product-price-modal-actions">
            <Button variant="text" onClick={subtractProductQuantity}>
              -
            </Button>
            <span>{dumbQuantity}</span>
            <Button variant="text" onClick={addProductQuantity}>
              +
            </Button>
            <ColorButton variant="contained" onClick={addToCartHandler}>
              Додати
            </ColorButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
