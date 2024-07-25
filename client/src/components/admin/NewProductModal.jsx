import React, { useState } from "react";
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
  image: yup.mixed().required("Додайте зображення"),
});

const NewProductModal = ({ open, closeHandler, shopUrl, onUpdate }) => {
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "",
      price: "",
      image: null,
    },
    validationSchema: productSchema,
    onSubmit: () => {
      addNewProduct();
      closeHandler();
    },
  });

  const handleChange = (event) => {
    setError(null);
    formik.handleChange(event);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    formik.setFieldValue("image", event.target.files[0]);
  };

  const { values, errors, touched, handleBlur, handleSubmit } = formik;

  const addNewProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("price", values.price);
      formData.append("shop", shopUrl);
      formData.append("image", values.image);

      const response = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/products`,
        formData
        // {
        //   formData,
        //   // title: values.title,
        //   // description: values.description,
        //   // type: values.type,
        //   // price: values.price,
        //   // shop: shopUrl,
        // }
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

          <Input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            onBlur={handleBlur}
            error={touched.image && !!errors.image}
            inputProps={{ accept: ".jpg,.png,.jpeg" }}
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
