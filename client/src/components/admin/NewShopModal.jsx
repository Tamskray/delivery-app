import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import { useAuthStore } from "../../store/Store";

const productSchema = yup.object().shape({
  title: yup.string().required("Потрібно назву закладу"),
  url: yup.string().required("Потрібно ввести унікальну адресу"),
  type: yup.string().required("Потрібно ввести категорію (тип) закладу"),
  image: yup.mixed().required("Додайте зображення"),
  info: yup.string().required("Введіть опис закладу"),
  deliveryMinCost: yup
    .number()
    .required("Потрібно ввести мінімальну ціну доставки"),
  deliveryTime: yup.string().required("Введіть приблизний час доставки"),
});

const NewShopModal = ({ open, closeHandler }) => {
  const token = useAuthStore((state) => state.token);
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
      type: "",
      image: null,
      info: "",
      deliveryMinCost: "",
      deliveryTime: "",
    },
    validationSchema: productSchema,
    onSubmit: () => {
      addNewShop();
      closeHandler();
    },
  });

  const handleChange = (event) => {
    // Clear error when a field value changes
    setError(null);
    formik.handleChange(event);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    formik.setFieldValue("image", event.target.files[0]);
  };

  const { values, errors, touched, handleBlur, handleSubmit } = formik;

  const addNewShop = async () => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("url", values.url);
      formData.append("type", values.type);
      formData.append("info", values.info);
      formData.append("deliveryMinCost", values.deliveryMinCost);
      formData.append("deliveryTime", values.deliveryTime);
      formData.append("image", values.image);

      await axios.post(`${process.env.REACT_APP_MAIN_URL}/shops`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //   onUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={closeHandler}>
      <div className="admin-open-modal">
        <form onSubmit={handleSubmit}>
          <h2>Додавання нового закладу</h2>

          <label htmlFor="title" className="order-label">
            Назва закладу
          </label>
          <TextField
            fullWidth
            label="Назва закладу"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" },
            }}
          />

          <label htmlFor="url" className="order-label">
            Унікальна адреса
          </label>
          <TextField
            fullWidth
            label="Унікальна адреса"
            id="url"
            name="url"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.url && !!errors.url}
            helperText={touched.url && errors.url}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" },
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
              style: { backgroundColor: "rgb(232, 240, 254)" },
            }}
          />

          <label htmlFor="info" className="order-label">
            Коротки опис
          </label>
          <TextField
            fullWidth
            label="Коротки опис"
            id="info"
            name="info"
            multiline
            value={values.info}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.info && !!errors.info}
            helperText={touched.info && errors.info}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" },
            }}
          />

          <label htmlFor="deliveryMinCost" className="order-label">
            Мінімальна ціна доставки
          </label>
          <TextField
            fullWidth
            label="Мінімальна ціна доставки"
            id="deliveryMinCost"
            name="deliveryMinCost"
            type="number"
            value={values.deliveryMinCost}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.deliveryMinCost && !!errors.deliveryMinCost}
            helperText={touched.deliveryMinCost && errors.deliveryMinCost}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" },
            }}
          />

          <label htmlFor="deliveryTime" className="order-label">
            Приблизний час доствки
          </label>
          <TextField
            fullWidth
            label="Приблизний час доствки "
            id="deliveryTime"
            name="deliveryTime"
            type="number"
            value={values.deliveryTime}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.deliveryTime && !!errors.deliveryTime}
            helperText={touched.deliveryTime && errors.deliveryTime}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" },
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
              disabled={!formik.isValid}
            >
              Додати новий заклад
            </Button>
          </div>

          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </Modal>
  );
};

export default NewShopModal;
