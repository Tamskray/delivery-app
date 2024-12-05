import React, { useState, useEffect } from "react";
import axios from "axios";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const ProductTypes = ({ shopUrl, setCurrentProductType }) => {
  const [productType, setProductType] = useState(0);
  const [productTypes, setProductTypes] = useState();

  const fetchProductTypes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/products/shop/types/${shopUrl}`
      );

      // console.log(response.data);

      setProductTypes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const handleProductTypeChange = (event, newValue) => {
    setProductType(newValue);
    // console.log(newValue);
    // console.log(productTypes[newValue - 1]);
    if (productTypes[newValue - 1] === undefined) {
      setCurrentProductType("");
    } else {
      setCurrentProductType(productTypes[newValue - 1]);
    }
  };

  return (
    <div className="products-category">
      {productTypes && (
        <Tabs
          value={productType}
          onChange={handleProductTypeChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="product-types"
        >
          <Tab label="Усі товари" />
          {productTypes &&
            productTypes.map((type, index) => <Tab key={index} label={type} />)}
        </Tabs>
      )}
    </div>
  );
};

export default ProductTypes;
