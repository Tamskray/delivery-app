import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ShopsPanelList from "./ShopsPanelList";
import ProductsPanelList from "./ProductsPanelList";

const ShopsPanel = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const [currentShopUrl, setCurrentShopUrl] = useState();

  const openProductsHandler = (shopUrl) => {
    // console.log(shopUrl);
    setCurrentShopUrl(shopUrl);
    setOpenProducts(true);
  };

  return (
    <div>
      {!openProducts && (
        <ShopsPanelList openProductsHandler={openProductsHandler} />
      )}
      {openProducts && (
        <>
          <h3 className="back-to-shops" onClick={() => setOpenProducts(false)}>
            Назад
          </h3>
          <ProductsPanelList shopUrl={currentShopUrl} />
        </>
      )}
    </div>
  );
};

export default ShopsPanel;
