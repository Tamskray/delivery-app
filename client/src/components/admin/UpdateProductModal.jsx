import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";

const productSchema = yup.object().shape({
  title: yup.string().required("Потрібно назву товару"),
  description: yup.string().required("Потрібно ввести короткий опис"),
  type: yup.string().required("Потрібно ввести тип продукту"),
  price: yup.number().required("Потрібно ввести ціну"),
});

const UpdateProductModal = ({ open, closeHandler, product, onUpdate }) => {
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState(product.image || null);

  const formik = useFormik({
    initialValues: {
      title: product.title,
      description: product.description,
      type: product.type,
      price: product.price,
      image: null,
    },
    validationSchema: productSchema,
    onSubmit: () => {
      updateProduct();
      closeHandler();
    },
  });

  const handleChange = (event) => {
    setError(null);
    formik.handleChange(event);
  };

  const { values, errors, touched, handleBlur, handleSubmit } = formik;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue("image", file);
  };

  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("price", values.price);
      formData.append("image", values.image);

      console.log(values.title);

      const response = await axios.patch(
        `${process.env.REACT_APP_MAIN_URL}/products/${product._id}`,
        formData
      );

      onUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={closeHandler}>
      <div className="admin-open-modal">
        <form onSubmit={handleSubmit}>
          <h2>Оновлення даних про {product.title}</h2>

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

          <Input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            onBlur={handleBlur}
            error={touched.image && !!errors.image}
            inputProps={{ accept: ".jpg,.png,.jpeg" }}
          />

          {product.image === selectedImage && (
            <div className="uploaded-image">
              <img
                src={process.env.REACT_APP_URL + "/" + selectedImage}
                alt="Selected"
              />
            </div>
          )}

          <div className="login-btn">
            <Button
              type="submit"
              variant="contained"
              // onClick={() => submitOrder(values)}
              disabled={!formik.isValid}
            >
              Оновити дані про продукт
            </Button>
          </div>

          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </Modal>
  );
};

export default UpdateProductModal;
