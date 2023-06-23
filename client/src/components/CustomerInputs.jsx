import React from "react";
import TextField from "@mui/material/TextField";
import "./CustomerInputs.css";

const CustomerInputs = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <>
      <label htmlFor="name" className="order-label">
        Ім'я
      </label>
      <TextField
        fullWidth
        label="Ім'я"
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && !!errors.name}
        helperText={touched.name && errors.name}
        InputProps={{
          style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
        }}
      />

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

      <label htmlFor="address" className="order-label">
        Адреса
      </label>
      <TextField
        fullWidth
        label="Адреса"
        id="address"
        name="address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.address && !!errors.address}
        helperText={touched.address && errors.address}
        InputProps={{
          style: { backgroundColor: "rgb(232, 240, 254)" }, // Додайте стиль фону тут
        }}
      />

      {/* <input
        id="name"
        type="text"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      /> */}
      {/* {errors.name && touched.name && (
        <span className="error">{errors.name}</span>
      )}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && touched.email && (
        <span className="error">{errors.email}</span>
      )}

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        type="number"
        placeholder="Phone"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.phone && touched.phone && (
        <span className="error">{errors.phone}</span>
      )}

      <label htmlFor="address">Address</label>
      <input
        id="address"
        type="text"
        placeholder="Address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.address && touched.address && (
        <span className="error">{errors.address}</span>
      )} */}
    </>
  );
};

export default CustomerInputs;
