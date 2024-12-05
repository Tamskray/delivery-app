import React, { useEffect, useState } from "react";
import ShopsList from "../components/shops/ShopsList";
import ShopTypesModal from "../components/shops/ShopTypesModal";
import TuneIcon from "@mui/icons-material/Tune";
import "../styles/Shops.css";

const Shops = () => {
  const [currentShopType, setCurrentShopType] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="shops-container">
      <ShopTypesModal
        open={open}
        handleClose={handleClose}
        currentShopType={currentShopType}
        setCurrentShopType={setCurrentShopType}
      />
      <h1>
        Усі заклади{" "}
        <TuneIcon className="shops-setting-icon" onClick={handleOpen} />
      </h1>

      <ShopsList shopType={currentShopType} />
    </div>
  );
};

export default Shops;
