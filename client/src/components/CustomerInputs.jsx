import React from "react";

const CustomerInputs = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) => {
  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.name && touched.name && (
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
      )}
    </>
  );
};

export default CustomerInputs;
