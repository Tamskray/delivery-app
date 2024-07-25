import React, { useEffect, useState } from "react";
import { useCartStore, useActiveShop } from "../../store/Store";
import ProductModal from "./ProductModal";
import Grid from "@mui/material/Grid";

const ProductItem = ({ product }) => {
  const productsInCart = useCartStore((state) => state.cartProducts);
  const addToCartProduct = useCartStore((state) => state.addToCart);

  const changeActiveShop = useActiveShop((state) => state.setActiveShop);

  const [productsQuantity, seProductsQuantity] = useState(1);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    seProductsQuantity(1);
  };

  const addToCartHandler = () => {
    console.log(
      `Продуктів додано до кошика: ${productsQuantity}, Продукт: ${product.title} `
    );
    addToCartProduct(
      product._id,
      product.title,
      product.price,
      product.image,
      productsQuantity,
      product.shop
    );
    changeActiveShop(product.shop);
    handleClose();

    // localStorage.setItem(
    //   "Order",
    //   JSON.stringify({
    //     cartItems: {
    //       id: product._id,
    //       title: product.title,
    //       price: product.price,
    //       quantity: productsQuantity,
    //       shop: product.shop,
    //     },
    //   })
    // );
  };

  useEffect(() => {
    console.log("check ADDET");
    localStorage.setItem(
      "Order",
      JSON.stringify({
        cartItems: productsInCart,
      })
    );
  }, [productsInCart]);

  return (
    <>
      <ProductModal
        open={open}
        handleClose={handleClose}
        product={product}
        dumbQuantity={productsQuantity}
        setDumbQuantity={seProductsQuantity}
        addToCartHandler={addToCartHandler}
      />
      <Grid item xs={12} sm={6} md={4} key={product._id}>
        <div className="product-item" onClick={handleOpen}>
          <div className="product-image">
            <img
              src={`${process.env.REACT_APP_URL}/${product.image}`}
              alt={product.title}
            />
          </div>
          <div className="product-title">{product.title}</div>
          <div className="product-price">{product.price} ₴</div>
        </div>
      </Grid>
    </>
  );
};

export default ProductItem;
