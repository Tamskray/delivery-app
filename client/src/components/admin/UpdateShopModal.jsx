import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import { useAuthStore } from "../../store/Store";

const shopSchema = yup.object().shape({
  title: yup.string().required("Потрібно назву закладу"),
  url: yup.string().required("Потрібно ввести унікальну адресу"),
  type: yup.string().required("Потрібно ввести категорію (тип) закладу"),
  info: yup.string().required("Введіть опис закладу"),
  deliveryMinCost: yup
    .number()
    .required("Потрібно ввести мінімальну ціну доставки"),
  deliveryTime: yup.string().required("Введіть приблизний час доставки"),
});

const UpdateShopModal = ({ open, closeHandler, shop, onUpdate }) => {
  const token = useAuthStore((state) => state.token);
  const [error, setError] = useState();
  const [selectedImage, setSelectedImage] = useState(shop.image || null);

  const formik = useFormik({
    initialValues: {
      title: shop.title,
      url: shop.url,
      type: shop.type,
      image: null,
      info: shop.info,
      deliveryMinCost: shop.deliveryMinCost,
      deliveryTime: shop.deliveryTime,
    },
    validationSchema: shopSchema,
    onSubmit: () => {
      updateShop();
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

  const updateShop = async () => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("url", values.url);
      formData.append("type", values.type);
      formData.append("info", values.info);
      formData.append("deliveryMinCost", values.deliveryMinCost);
      formData.append("deliveryTime", values.deliveryTime);
      formData.append("image", values.image);

      console.log(values.title);

      const response = await axios.patch(
        `${process.env.REACT_APP_MAIN_URL}/shops/${shop._id}`,
        formData,
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

          {shop.image === selectedImage && (
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
              disabled={!formik.isValid}
            >
              Оновити дані про заклад
            </Button>
          </div>

          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </Modal>
  );
};

export default UpdateShopModal;
