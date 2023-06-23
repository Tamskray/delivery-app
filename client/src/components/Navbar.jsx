import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import CssBaseline from "@mui/material/CssBaseline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useActiveShop, useCartStore } from "../store/Store";
import { styled } from "@mui/material/styles";

import "./Navbar.css";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    padding: "0 4px",
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
  const navigate = useNavigate();

  const productsInCart = useCartStore((state) => state.cartProducts);
  const addToCartProduct = useCartStore((state) => state.addToCart);

  const changeActiveShop = useActiveShop((state) => state.setActiveShop);

  const [totalQuantity, setTotalQuantity] = useState();

  const profileClickHandler = () => {
    navigate("/auth");
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Order"));

    // console.log(storedData);

    !productsInCart.length &&
      storedData &&
      storedData.cartItems.map((storedItem) => {
        const { id, title, price, quantity, image, shop } = storedItem;
        console.log(quantity);
        addToCartProduct(id, title, price, image, quantity, shop);
        changeActiveShop(shop);
      });

    console.log("set cart items");
  }, []);

  useEffect(() => {
    let countItems = 0;
    productsInCart.map((item) => {
      countItems += item.quantity;
    });
    setTotalQuantity(countItems);
  }, [productsInCart]);

  return (
    <nav>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ backgroundColor: "#6b32cd", boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/">
                <div className="navbar-title">
                  <FastfoodIcon />
                  <span>Prime Food</span>
                </div>
              </NavLink>
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={profileClickHandler}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <div onClick={() => navigate("/order1")}>Кошик old</div>

            <IconButton aria-label="cart" onClick={() => navigate("/order")}>
              <StyledBadge badgeContent={totalQuantity} color="secondary">
                <ShoppingCartIcon style={{ color: "#fff" }} />
              </StyledBadge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* <Toolbar /> */}
    </nav>
  );
};

export default Navbar;
