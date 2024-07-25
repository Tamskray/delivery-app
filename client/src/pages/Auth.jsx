import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useAuthStore } from "../store/Store";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

const userSchema = yup.object().shape({
  username: yup.string().required("Потрібно ввести нікнейм"),
  password: yup.string().required("Потрібно ввести пароль"),
});

const Auth = () => {
  const [error, setError] = useState();
  const setToken = useAuthStore((state) => state.setToken);
  const setRole = useAuthStore((state) => state.setRole);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      // console.log(values);
      loginHandler();
    },
  });

  const handleChange = (event) => {
    // Clear error when a field value changes
    setError(null);
    formik.handleChange(event);
  };

  const { values, errors, touched, handleBlur, handleSubmit } = formik;

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/users/login`,
        {
          username: values.username,
          password: values.password,
        }
      );

      // console.log(response.data);

      const token = response.data.token;
      const role = response.data.role;

      setToken(token);
      setRole(role);
      navigate("/admin");
    } catch (err) {
      // console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>Вхід до адмін панелі</h1>
            <label htmlFor="username" className="order-label">
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

            <label htmlFor="password" className="order-label">
              Пароль
            </label>
            <TextField
              fullWidth
              label="Пароль"
              id="password"
              name="password"
              type="password"
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
                // onClick={() => submitOrder(values)}
                disabled={!formik.isValid}
              >
                Авторизуватись
              </Button>
            </div>
            {error && <div className="auth-error">{error}</div>}
          </form>
        </div>
        {!error && <div className="auth-login-image"></div>}
        {error && <div className="auth-login-error-image"></div>}
      </div>
    </>
  );
};

export default Auth;
