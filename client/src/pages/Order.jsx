import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useCartStore, useActiveShop } from "../store/Store";
import { useNavigate } from "react-router-dom";
import CustomerInputs from "../components/CustomerInputs";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import "../styles/Order.css";

const customerSchema = yup.object().shape({
  name: yup.string().required("Потрібно ввести ім'я"),
  email: yup.string().email().required("Введіть валідний імейл"),
  phone: yup.number().required("Введіть номер телефону"),
  address: yup.string().required("Введіть адресу"),
});

const Order = () => {
  const productsInCart = useCartStore((state) => state.cartProducts);
  const addToCartProduct = useCartStore((state) => state.addToCart);
  // console.log(productsInCart);

  const navigate = useNavigate();
  const [orderReceipt, setOrderReceipt] = useState(false);
  const { clearCart } = useCartStore();

  const subtractProduct = useCartStore(
    (state) => state.subtractFromProductCounter
  );
  const addProduct = useCartStore((state) => state.addToProductCounter);

  const currentActiveShop = useActiveShop((state) => state.activeShop);
  const changeActiveShop = useActiveShop((state) => state.setActiveShop);

  // const [orderItems, setOrderItems] = useState({
  //   customerInfo: {},
  //   items: {},
  // });

  const [orderItems, setOrderItems] = useState();

  const [isCustomerInfoEmpty, setIsCustomerInfoEmpty] = useState(true);

  const [totalPrice, setTotalPrice] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: customerSchema,
    onSubmit: (values) => {
      // console.log(
      //   "VALUES " + values.name,
      //   values.email,
      //   values.phone,
      //   values.address
      // );
      return values;
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  const subtractProductHandler = (productId) => {
    subtractProduct(productId);
  };

  const addProductHandler = (productId) => {
    addProduct(productId);
  };

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("Order"));

  //   console.log(storedData);
  //   !productsInCart.length &&
  //     storedData &&
  //     storedData.cartItems.map((storedItem) => {
  //       const { id, title, price, quantity, image, shop } = storedItem;
  //       console.log(quantity);
  //       addToCartProduct(id, title, price, image, quantity, shop);
  //       changeActiveShop(shop);
  //     });

  //   console.log("set cart items");
  // }, []);

  useEffect(() => {
    productsInCart.length && console.log("UPDATE IN ORDER");

    productsInCart.length &&
      localStorage.setItem(
        "Order",
        JSON.stringify({
          cartItems: productsInCart,
        })
      );

    !productsInCart.length &&
      localStorage.setItem(
        "Order",
        JSON.stringify({
          cartItems: [],
        })
      );
  }, [subtractProductHandler, addProductHandler]);

  const takeOrder = async (values) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_MAIN_URL}/orders`, {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          items: orderItems,
          // items: orderItems.items,
          totalPrice: totalPrice,
        })
        .then((response) => {
          console.log(response);
        });

      // navigate("/");
      clearCart();
      setOrderReceipt(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!values.name && !values.email && !values.phone && !values.address) {
      setIsCustomerInfoEmpty(true);
    } else {
      setIsCustomerInfoEmpty(false);
    }
    // console.log("CUST " + isCustomerInfoEmpty);
    // console.log(formik.isValid);
  }, [formik]);

  useEffect(() => {
    const formattedOrderItems = productsInCart.map((item) => {
      const { id, image, ...rest } = item;
      return rest;
    });
    // setOrderItems((prevState) => ({
    //   ...prevState,
    //   items: formattedOrderItems,
    // }));
    setOrderItems(formattedOrderItems);

    if (productsInCart.length) {
      setTotalPrice(
        formattedOrderItems.reduce((result, item) => {
          return result + item.price * item.quantity;
        }, 0)
      );
    }

    if (productsInCart.length === 0) {
      changeActiveShop(null);
    }
  }, [productsInCart]);

  const submitOrder = (values) => {
    if (productsInCart.length > 0) {
      // console.log(values);
      setOrderItems((prevState) => ({ ...prevState, customerInfo: values }));
      // console.log("SUBMIT ORDER " + orderItems);
      console.log(orderItems);
      takeOrder(values);
    }
  };

  // console.log(orderItems);

  return (
    <>
      {productsInCart.length && !orderReceipt && (
        <>
          <h3
            className="order-back"
            style={{ marginTop: "5rem", marginLeft: "2rem" }}
            onClick={() => navigate(`/shop/${productsInCart[0].shop}`)}
          >
            Назад до закладу
          </h3>

          <div className="order-container">
            <div className="order-client-wrapper">
              <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                  <CustomerInputs
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />

                  <div className="order-button">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => submitOrder(values)}
                      disabled={!formik.isValid || isCustomerInfoEmpty}
                    >
                      Оформити замовлення
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="order-cart-wrapper">
              {productsInCart.map((cartProduct) => (
                <div key={cartProduct.id} className="order-cart-item">
                  <div className="order-cart-image">
                    <img
                      src={process.env.REACT_APP_URL + "/" + cartProduct.image}
                      alt={cartProduct.title}
                    />
                  </div>
                  <div>
                    <div className="order-cart-title">{cartProduct.title}</div>
                    <div className="order-cart-price">
                      {cartProduct.price} ₴
                    </div>
                    <div className="order-cart-quantity">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => subtractProductHandler(cartProduct.id)}
                      >
                        -
                      </Button>
                      <span style={{ margin: "10px" }}>
                        {cartProduct.quantity}
                      </span>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => addProductHandler(cartProduct.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {productsInCart.length > 0 && (
            <h2 className="order-total-price">
              Загальна вартість: {totalPrice} ₴
            </h2>
          )}
        </>
      )}
      {!productsInCart.length && !orderReceipt && (
        <div className="order-no-items">
          <h1>Немає товарів</h1>
          <h2 className="order-back" onClick={() => navigate(`/shops/`)}>
            Назад у меню
          </h2>
          <div className="order-empty-image"></div>
        </div>
      )}

      {orderReceipt && (
        <div className="order-no-items">
          <h1>Дякуємо за ваше замовлення!</h1>
          <h2>Очікуйте дзвінок від кур'єра</h2>
          <h2 className="order-back" onClick={() => navigate(`/shops/`)}>
            Назад у меню
          </h2>
          <div className="order-success-image"></div>
        </div>
      )}
    </>
  );
};

export default Order;
