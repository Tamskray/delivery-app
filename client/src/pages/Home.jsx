import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { styled } from "@mui/material/styles";
import "../styles/Home.css";

const ColorButton = styled(Button)(() => ({
  width: "15rem",
  height: "4rem",
  fontSize: "20px",
  backgroundColor: "#602db9",
  "&:hover": {
    backgroundColor: "#6b32cd",
  },
}));

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-page-container">
        <div className="home-page-info">
          <FastfoodIcon style={{ fontSize: 300, color: "#f3e4e4" }} />
          <h1>PRIME FOOD</h1>
          <h1>Сервіс доставки їжі</h1>
          <ColorButton variant="contained" onClick={() => navigate("/shops")}>
            Меню
          </ColorButton>
        </div>
        <div className="home-page-guide">
          <div className="home-page-guide-info">
            <h1>Як замовити?</h1>
            <ul>
              <li>
                <h3>Обирайте магазин</h3>
              </li>
              <li>
                <h3>Додайте страву до кошика</h3>
              </li>
              <li>
                <h3>Оформлюйте замовлення</h3>
              </li>
              <li>
                <h3>Смакуйте чудовими стравами</h3>
              </li>
            </ul>
          </div>
          <div className="home-page-guide-image"></div>
        </div>
        <div>
          <h2>Доставка і оплата</h2>
        </div>
        <div>
          <h2>Про нас</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
