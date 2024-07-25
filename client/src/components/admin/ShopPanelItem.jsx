import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Modal from "@mui/material/Modal";
import UpdateShopModal from "./UpdateShopModal";
import { useAuthStore } from "../../store/Store";

const ShopPanelItem = ({ shop, onUpdate, openProductsHandler }) => {
  const token = useAuthStore((state) => state.token);

  const [openUpdateShopModal, setOpenUpdateShopModal] = useState(false);
  const handleUpdateShopOpen = () => setOpenUpdateShopModal(true);
  const handleUpdateShopClose = () => setOpenUpdateShopModal(false);

  const [openDeleteShopModal, setOpenDeleteShopModal] = useState(false);
  const handleDeleteShopOpen = () => setOpenDeleteShopModal(true);
  const handleDeleteShopClose = () => setOpenDeleteShopModal(false);

  const handleUpdate = () => {
    onUpdate();
  };

  const deleteShop = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_MAIN_URL}/shops/${shop._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UpdateShopModal
        open={openUpdateShopModal}
        closeHandler={handleUpdateShopClose}
        shop={shop}
        onUpdate={handleUpdate}
      />

      <Modal open={openDeleteShopModal} onClose={handleDeleteShopClose}>
        <div className="admin-open-modal">
          <h2>
            Точно <span style={{ color: "red" }}>ВИДАЛИТИ</span> заклад"
            {shop.title}"?
          </h2>
          <Button variant="contained" color="error" onClick={deleteShop}>
            Видалити остаточно
          </Button>
        </div>
      </Modal>

      <div key={shop._id} className="admin-panel-shop-item">
        <div
          className="admin-panel-shop-item-title"
          onClick={() => openProductsHandler(shop.url)}
        >
          {shop.title}
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpdateShopOpen}
        >
          Редагувати
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteShopOpen}>
          Видалити
        </Button>
      </div>
    </>
  );
};

export default ShopPanelItem;
