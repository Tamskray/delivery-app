import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useCartStore, useActiveShop } from "../store/Store";

import "../styles/ShoppingCartPage.css";
import CustomerInputs from "../components/CustomerInputs";
import axios from "axios";

const customerInputs = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.number().required("Phone is required"),
  address: yup.string().required("Address is required"),
});

const initialCustomerValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const ShoppingCartPage = () => {
  const productsInCart = useCartStore((state) => state.cartProducts);
  const addToCartProduct = useCartStore((state) => state.addToCart);

  // const currentActiveShop = useActiveShop((state) => state.activeShop);
  const changeActiveShop = useActiveShop((state) => state.setActiveShop);

  const subtractProduct = useCartStore(
    (state) => state.subtractFromProductCounter
  );
  const addProduct = useCartStore((state) => state.addToProductCounter);

  const [orderItems, setOrderItems] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const subtractProductHandler = (productId) => {
    subtractProduct(productId);
  };

  const addProductHandler = (productId) => {
    addProduct(productId);
  };

  useEffect(() => {
    const formattedOrderItems = productsInCart.map((item) => {
      const { id, image, ...rest } = item;
      return rest;
    });
    setOrderItems(formattedOrderItems);

    if (productsInCart.length > 0) {
      setTotalPrice(
        formattedOrderItems.reduce((result, item) => {
          return result + item.price * item.quantity;
        }, 0)
      );
    }
  }, [productsInCart]);

  const takeOrder = async (values) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_MAIN_URL}/orders`, {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          items: orderItems,
          totalPrice: totalPrice,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const submitForm = (values) => {
    if (productsInCart.length > 0) {
      takeOrder(values);
      // localStorage.removeItem("cartItems");
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("cartItems"));

    !productsInCart.length &&
      storedData &&
      storedData.productsInCart.map((storedItem) => {
        const { id, title, price, quantity, image, shop } = storedItem;
        console.log(quantity);
        addToCartProduct(id, title, price, image, quantity, shop);
        changeActiveShop(shop);
      });

    console.log("set cart items");
  }, []);

  useEffect(() => {
    productsInCart.length &&
      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          productsInCart,
        })
      );
    console.log("set in storage");

    !productsInCart.length &&
      // currentActiveShop &&
      localStorage.removeItem("cartItems");
  }, [addProductHandler, subtractProductHandler]);

  return (
    <>
      <div className="shopping__cart__container">
        <Formik
          validationSchema={customerInputs}
          initialValues={initialCustomerValues}
          onSubmit={submitForm}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <>
              <div className="form__wrapper">
                <form onSubmit={handleSubmit}>
                  <CustomerInputs
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                  <button className="order__button" type="submit">
                    Check
                  </button>
                </form>
              </div>

              <div className="cart__wrapper">
                {productsInCart.map((cartProduct) => (
                  <div key={cartProduct.id} className="cart__item">
                    <div className="cart__item__image cart__item__item">
                      <img
                        src={`${process.env.REACT_APP_URL}/${cartProduct.image}`}
                        alt={cartProduct.title}
                      />
                    </div>
                    <div className="cart__item__info cart__item__item">
                      <h2>{cartProduct.title}</h2>
                      <h3>{cartProduct.price}</h3>
                    </div>
                    <div className="cart__item__actions cart__item__item">
                      <button
                        onClick={() => subtractProductHandler(cartProduct.id)}
                      >
                        -
                      </button>
                      {cartProduct.quantity}
                      <button onClick={() => addProductHandler(cartProduct.id)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
                {productsInCart.length > 0 && (
                  <h2 className="total__price">Total Price: {totalPrice}</h2>
                )}
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ShoppingCartPage;
