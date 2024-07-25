import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";

const userSchema = yup.object().shape({
  username: yup.string().required("Потрібно назву нікнейм"),
  password: yup.string().required("Потрібно назву пароль"),
});

const NewAdminModal = ({ open, closeHandler, onUpdate }) => {
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      username: "",
      username: "",
    },
    validationSchema: userSchema,
    onSubmit: () => {
      addNewAdmin();
      closeHandler();
    },
  });

  const handleChange = (event) => {
    setError(null);
    formik.handleChange(event);
  };

  const addNewAdmin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/users`,
        {
          username: values.username,
          password: values.password,
        }
      );

      onUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleBlur, handleSubmit } = formik;

  return (
    <Modal open={open} onClose={closeHandler}>
      <div className="admin-open-modal">
        <form onSubmit={handleSubmit}>
          <h2>Створення нового адміністратора</h2>

          <label htmlFor="title" className="order-label">
            Нікнейм
          </label>
          <TextField
            fullWidth
            label="Нікнейм"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && !!errors.username}
            helperText={touched.username && errors.username}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <label htmlFor="description" className="order-label">
            Пароль для адміна
          </label>
          <TextField
            fullWidth
            label="Пароль для адміна"
            id="password"
            name="password"
            multiline
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            InputProps={{
              style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
            }}
          />

          <div className="login-btn">
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid}
            >
              Додати нового адміністратора
            </Button>
          </div>

          {error && <div className="auth-error">{error}</div>}
        </form>
      </div>
    </Modal>
  );
};

export default NewAdminModal;
