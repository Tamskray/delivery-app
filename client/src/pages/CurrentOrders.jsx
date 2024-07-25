import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "../styles/CurrentOrders.css";

const orderSchema = yup.object().shape({
  email: yup.string().email().required("Введіть валідний імейл"),
  phone: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Номер телефону повинен мати валідний формат"
    )
    .required("Введіть номер телефону"),
});

const CurrentOrders = () => {
  const [currentOrders, setCurrentOrders] = useState();
  const [isFetched, setIsFetched] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    validationSchema: orderSchema,
    onSubmit: () => {
      fetchCurrentOrders();
      setIsFetched(true);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  const fetchCurrentOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/orders/current-order?email=${values.email}&phone=${values.phone}`
      );

      setCurrentOrders(response.data);
      console.log(currentOrders);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="orders-wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="order-label">
            Email
          </label>
          <TextField
            fullWidth
            label="Email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <label htmlFor="phone" className="order-label">
            Телефон
          </label>
          <TextField
            fullWidth
            label="Телефон"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && !!errors.phone}
            helperText={touched.phone && errors.phone}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <Button
            style={{ marginTop: 10 }}
            type="submit"
            variant="contained"
            disabled={!formik.isValid}
          >
            Переглянути замовлення
          </Button>
        </form>
      </div>

      {currentOrders?.length !== 0 && isFetched && (
        <div className="current-orders">
          {currentOrders &&
            currentOrders.map((order) => (
              <div key={order._id}>
                <h3>Ім'я: {order.name}</h3>
                <h3>Адреса: {order.address}</h3>
                <h3>Замовлені товари:</h3>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      <div>{item.title}</div>
                      <div>
                        {item.quantity} × {item.price} ₴
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="current-order-total-price">
                  <div style={{ color: "green", fontSize: 24 }}>
                    {order.status}
                  </div>
                  Загальна сума: {order.totalPrice} ₴
                </div>
                <hr />
              </div>
            ))}
        </div>
      )}

      {!currentOrders?.length && isFetched && (
        <h1 className="center-item">Замовлень не знайдено</h1>
      )}
    </>
  );
};

export default CurrentOrders;
