import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/Store";

import Loading from "../Loading";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const OrderPanelList = () => {
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [searchOrder, setSearchOrder] = useState("");

  const [openItemsModal, setOpenItemsModal] = useState(false);

  const [currentOrderItems, setCurrentOrderItems] = useState();
  const [currentTotalCost, setCurrentTotalCost] = useState();

  const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);

  const [currentOrderId, setCurrentOrderId] = useState();

  const [openChangeOrderStatusModal, setOpenChangeOrderStatusModal] =
    useState(false);

  const [currentOrderStatus, setCurrentOrderStatus] = useState();

  const handleItemsOpen = (items, totalCost) => {
    setOpenItemsModal(true);
    setCurrentOrderItems(items);
    setCurrentTotalCost(totalCost);
  };

  const handleItemsClose = () => setOpenItemsModal(false);

  // DELETE ORDER
  const handleDeleteOrderOpen = (id) => {
    setOpenDeleteOrderModal(true);
    setCurrentOrderId(id);
  };

  const handleDeleteOrderClose = () => setOpenDeleteOrderModal(false);

  // UPDATE ORDER STATUS
  const handleChangeOrderStatusOpen = (id, status) => {
    setOpenChangeOrderStatusModal(true);
    setCurrentOrderId(id);
    setCurrentOrderStatus(status);
  };

  const handleChangeOrderStatusClose = () => {
    setOpenChangeOrderStatusModal(false);
  };

  const handleChangeCurrentOrderStatus = (event) => {
    setCurrentOrderStatus(event.target.value);
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/orders`
      );

      setOrders(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_MAIN_URL}/orders/${currentOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
      handleDeleteOrderClose();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCurrentOrder = async () => {
    try {
      await axios
        .put(`${process.env.REACT_APP_MAIN_URL}/orders/${currentOrderId}`, {
          status: currentOrderStatus,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateCurrentOrderStatus = () => {
    updateCurrentOrder();
    fetchOrders();
    handleChangeOrderStatusClose();
  };

  const filteredOrders =
    orders &&
    orders.filter((order) =>
      order.phone.toLowerCase().includes(searchOrder.trim().toLowerCase())
    );

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <Modal open={openItemsModal} onClose={handleItemsClose}>
        <div className="admin-open-modal">
          {currentOrderItems &&
            currentOrderItems.map((item) => (
              <div key={item._id}>
                <div>{item.title}</div>
                <div>
                  {item.quantity} × {item.price} ₴
                </div>
              </div>
            ))}
          <h2> Загальна сума: {currentTotalCost} ₴</h2>
        </div>
      </Modal>

      <Modal open={openDeleteOrderModal} onClose={handleDeleteOrderClose}>
        <div className="admin-open-modal">
          <h2>
            Точно <span style={{ color: "red" }}>ВИДАЛИТИ</span> замовлення з
            бази?
          </h2>
          <Button variant="contained" color="error" onClick={deleteOrder}>
            Видалити остаточно
          </Button>
        </div>
      </Modal>

      <Modal
        open={openChangeOrderStatusModal}
        onClose={handleChangeOrderStatusClose}
      >
        <div className="admin-open-modal">
          <h2>Зміна статусу замовлення</h2>
          <div>
            <Select
              value={currentOrderStatus}
              label="Статус замовлення"
              onChange={handleChangeCurrentOrderStatus}
            >
              <MenuItem value="В процесі">В процесі</MenuItem>
              <MenuItem value="Виконано">Виконано</MenuItem>
            </Select>
          </div>
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={onUpdateCurrentOrderStatus}
          >
            Застосувати зміни
          </Button>
        </div>
      </Modal>

      <TextField
        style={{ marginTop: 20 }}
        fullWidth
        label="Пошук замовлення по номеру.."
        id="fullWidth"
        value={searchOrder}
        onChange={(e) => setSearchOrder(e.target.value)}
      />

      {!isLoading &&
        orders &&
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className={`admin-panel-shop-item ${
              order.status !== "В процесі" && "dark"
            }`}
          >
            <div className="admin-panel-order-phone">{order.phone}</div>
            <div className="admin-panel-order-name">{order.name}</div>
            <div className="admin-panel-order-email">{order.email}</div>
            <div className="admin-panel-order-address">{order.address}</div>
            <div
              className="admin-panel-order-order"
              onClick={() =>
                handleItemsOpen(order.items, order.totalPrice, order._id)
              }
            >
              Замовлення
            </div>
            <div
              className="admin-panel-order-order"
              onClick={() =>
                handleChangeOrderStatusOpen(order._id, order.status)
              }
            >
              {order.status}
            </div>

            {/* <Button variant="contained" color="secondary">
              Редагувати
            </Button> */}
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteOrderOpen(order._id)}
            >
              Видалити
            </Button>
          </div>
        ))}
    </>
  );
};

export default OrderPanelList;
