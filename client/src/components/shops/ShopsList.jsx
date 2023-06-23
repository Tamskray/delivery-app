import React, { useState, useEffect } from "react";
import { useActiveShop, useCartStore } from "../../store/Store";
import axios from "axios";
import Loading from "../Loading";
import Grid from "@mui/material/Grid";
import ShopItem from "./ShopItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const ShopsList = ({ shopType }) => {
  const navigate = useNavigate();
  const [shops, setShops] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [searchShop, setSearchShop] = useState("");

  const currentActiveShop = useActiveShop((state) => state.activeShop);
  const productsInCart = useCartStore((state) => state.cartProducts);

  const fetchShops = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/shops?type=${shopType}`
      );

      setShops(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();

    productsInCart.length &&
      console.log("CURRENT ACTIVE SHOP " + currentActiveShop);
  }, [shopType]);

  const filteredShops =
    shops &&
    shops.filter((shop) =>
      shop.title.toLowerCase().includes(searchShop.trim().toLowerCase())
    );

  if (error) {
    return <h1>{error}</h1>;
  }

  if (isLoading) {
    return (
      <div className="center-item">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Пошук закладу.."
          id="fullWidth"
          value={searchShop}
          onChange={(e) => setSearchShop(e.target.value)}
        />
      </Box>
      <br />
      {currentActiveShop && (
        <div>
          <h2>
            У{" "}
            <span className="cart-span" onClick={() => navigate("/order")}>
              кошику
            </span>{" "}
            вже є замовлення
          </h2>
          <h3>Ви можете замовляти лише з одного закладу</h3>
        </div>
      )}
      {!isLoading && shops && (
        <Grid container spacing={2}>
          {filteredShops.map((shop) => (
            <ShopItem key={shop._id} shop={shop} />
          ))}
        </Grid>
      )}
      {shops && !filteredShops.length && (
        <h1>Нічого не знайдено за пошуком "{searchShop}" :/ </h1>
      )}
    </>
  );
};

export default ShopsList;
