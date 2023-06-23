import React from "react";
import { useNavigate } from "react-router-dom";
import { useActiveShop, useCartStore } from "../../store/Store";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

import Grid from "@mui/material/Grid";

const ShopItem = ({ shop }) => {
  const navigate = useNavigate();

  const currentActiveShop = useActiveShop((state) => state.activeShop);
  const productsInCart = useCartStore((state) => state.cartProducts);

  // console.log(currentActiveShop);
  // console.log(productsInCart.length);

  const navigateToProducts = (shopUrl) => {
    if (currentActiveShop) {
      productsInCart?.length &&
        currentActiveShop &&
        currentActiveShop === shop.url &&
        navigate(`/shop/${shopUrl}`);
    } else {
      navigate(`/shop/${shopUrl}`);
    }
    // productsInCart.length > 0 &&
    //   currentActiveShop &&
    //   currentActiveShop === shop.url &&
    //   navigate(`/shop/${shopUrl}`);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} key={shop._id}>
        <div
          className={`shop-item ${
            productsInCart?.length &&
            currentActiveShop &&
            currentActiveShop !== shop.url &&
            "inactive"
          }`}
          onClick={() => navigateToProducts(shop.url)}
        >
          <div className="shop-image">
            <img
              src={`${process.env.REACT_APP_URL}/${shop.image}`}
              alt={shop.title}
            />
            <div className="shop-image-type">{shop.type}</div>
          </div>

          <div className="shop-title">{shop.title}</div>
          <div className="shop-item-footer-info">
            <div className="shop-item-icons">
              <AccountBalanceWalletIcon />
              <span>від {shop.deliveryMinCost} ₴</span>
            </div>
            <div className="shop-item-icons">
              <AccessTimeFilledIcon />
              <span>{shop.deliveryTime} хв.</span>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default ShopItem;
