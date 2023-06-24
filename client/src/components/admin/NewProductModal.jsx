import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";

import "./NewProductModal.css";

const productSchema = yup.object().shape({
  title: yup.string().required("Потрібно назву товару"),
  description: yup.string().required("Потрібно ввести короткий опис"),
  type: yup.string().required("Потрібно ввести тип продукту"),
  price: yup.number().required("Потрібно ввести ціну"),
});

const NewProductModal = ({ open, closeHandler, shopUrl }) => {
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "",
      price: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      addNewProduct();
      closeHandler();
      //   console.log(values);
    },
  });

  const handleChange = (event) => {
    // Clear error when a field value changes
    setError(null);
    formik.handleChange(event);
  };

  const { values, errors, touched, handleBlur, handleSubmit } = formik;

  const addNewProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/products`,
        {
          title: values.title,
          description: values.description,
          type: values.type,
          price: values.price,
          shop: shopUrl,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={closeHandler}>
      <div className="admin-open-modal">
        <form onSubmit={handleSubmit}>
          <h2>Додавання нового товару до {shopUrl}</h2>

          <label htmlFor="title" className="order-label">
            Назва
          </label>
          <TextField
            fullWidth
            label="Назва"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <label htmlFor="description" className="order-label">
            Коротки опис
          </label>
          <TextField
            fullWidth
            label="Коротки опис"
            id="description"
            name="description"
            multiline
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && !!errors.description}
            helperText={touched.description && errors.description}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <label htmlFor="type" className="order-label">
            Тип
          </label>
          <TextField
            fullWidth
            label="Тип"
            id="type"
            name="type"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.type && !!errors.type}
            helperText={touched.type && errors.type}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <label htmlFor="price" className="order-label">
            Ціна
          </label>
          <TextField
            fullWidth
            label="Ціна"
            id="price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && !!errors.price}
            helperText={touched.price && errors.price}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <div className="login-btn">
            <Button
              type="submit"
              variant="contained"
              // onClick={() => submitOrder(values)}
              disabled={!formik.isValid}
            >
              Додати новий продукт
            </Button>
          </div>

          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </Modal>
  );
};

export default NewProductModal;
