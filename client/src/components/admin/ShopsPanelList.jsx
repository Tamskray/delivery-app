import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import NewShopModal from "./NewShopModal";
import ShopPanelItem from "./ShopPanelItem";

const ShopsPanelList = ({ openProductsHandler }) => {
  const [shops, setShops] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [searchShop, setSearchShop] = useState("");

  const [openAddShopModal, setOpenAddShopModal] = useState(false);

  const handleAddShopOpen = () => setOpenAddShopModal(true);
  const handleAddShopClose = () => setOpenAddShopModal(false);

  const fetchShops = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/shops`
      );

      setShops(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const updateShopList = () => {
    fetchShops();
  };

  const filteredShops =
    shops &&
    shops.filter((shop) =>
      shop.title.toLowerCase().includes(searchShop.trim().toLowerCase())
    );

  if (error) {
    return <h1>{error}</h1>;
  }

  //   if (isLoading) {
  //     return (
  //       <div className="center-item">
  //         <Loading />
  //       </div>
  //     );
  //   }

  return (
    <>
      <NewShopModal
        open={openAddShopModal}
        closeHandler={handleAddShopClose}
      ></NewShopModal>

      <Button variant="contained" color="success" onClick={handleAddShopOpen}>
        Додати
      </Button>
      <TextField
        style={{ marginTop: 20 }}
        fullWidth
        label="Пошук закладу.."
        id="fullWidth"
        value={searchShop}
        onChange={(e) => setSearchShop(e.target.value)}
      />
      {!isLoading &&
        shops &&
        filteredShops.map((shop) => (
          <ShopPanelItem
            key={shop._id}
            shop={shop}
            onUpdate={updateShopList}
            openProductsHandler={openProductsHandler}
          />
          // <div key={shop._id} className="admin-panel-shop-item">
          //   <div
          //     className="admin-panel-shop-item-title"
          //     onClick={() => openProductsHandler(shop.url)}
          //   >
          //     {shop.title}
          //   </div>
          //   <Button variant="contained" color="secondary">
          //     Редагувати
          //   </Button>
          //   <Button variant="outlined" color="error">
          //     Видалити
          //   </Button>
          // </div>
        ))}
    </>
  );
};

export default ShopsPanelList;
