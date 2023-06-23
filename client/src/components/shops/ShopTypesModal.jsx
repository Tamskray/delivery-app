import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(() => ({
  marginTop: "1rem",
  backgroundColor: "#602db9",
  "&:hover": {
    backgroundColor: "#6b32cd",
  },
}));

const ShopTypesModal = ({
  open,
  handleClose,
  currentShopType,
  setCurrentShopType,
}) => {
  const [shopTypes, setShopTypes] = useState();

  const fetchShopTypes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/shops/types`
      );
      console.log(response.data);
      setShopTypes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchShopTypes();
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-shop-types"
      aria-describedby="modal-shop-types"
    >
      <div className="product-item-modal">
        <h2>Фільтр категорій</h2>
        <hr />

        <RadioGroup
          aria-labelledby="shops-types"
          value={currentShopType}
          name="radio-buttons-group"
          onChange={(e) => setCurrentShopType(e.target.value)}
        >
          <FormControlLabel value="" control={<Radio />} label="Усі заклади" />
          {shopTypes &&
            shopTypes.map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={type}
              />
            ))}
        </RadioGroup>

        <ColorButton variant="contained" onClick={handleClose}>
          Закрити вікно
        </ColorButton>
      </div>
    </Modal>
  );
};

export default ShopTypesModal;
