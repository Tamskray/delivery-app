import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useNavigate } from "react-router-dom";
import "./ShopInfo.css";

const ShopInfo = ({ shopUrl }) => {
  const navigate = useNavigate();

  const [shop, setShop] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [infoGroup, setInfoGroup] = useState({
    info: true,
    delivery: false,
    time: false,
  });

  const handleClickInfo = (group) => {
    setInfoGroup(() => ({
      info: group === "info",
      delivery: group === "delivery",
      time: group === "time",
    }));
  };

  const fetchShop = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/shops/${shopUrl}`
      );

      // console.log(response.data);

      setShop(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShop();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  //   if (isLoading) {
  //     return (
  //       <div className="center-item">
  //         <Loading />
  //       </div>
  //     );
  //   }

  return (
    <>
      {shop && (
        <div className="shop-info-container">
          <div className="shop-info-image">
            <img
              src={`${process.env.REACT_APP_URL}/${shop.image}`}
              alt={shop.title}
            />
            <h3 className="shop-info-back" onClick={() => navigate("/shops")}>
              Усі заклади
            </h3>
            <h1 className="shop-info-shop-title">{shop.title}</h1>
            <div className="shop-info-btn-group">
              <div
                className={`shop-info-icon-info ${
                  infoGroup.info && "shop-info-icon-active"
                }`}
                onClick={() => handleClickInfo("info")}
              >
                <InfoIcon />
                <span>Інфо</span>
              </div>
              <div
                className={`shop-info-icon-info ${
                  infoGroup.delivery && "shop-info-icon-active"
                }`}
                onClick={() => handleClickInfo("delivery")}
              >
                <AccountBalanceWalletIcon />
                <span>від {shop.deliveryMinCost} ₴</span>
              </div>
              <div
                className={`shop-info-icon-info ${
                  infoGroup.time && "shop-info-icon-active"
                }`}
                onClick={() => handleClickInfo("time")}
              >
                <AccessTimeFilledIcon />
                <span>{shop.deliveryTime} хв.</span>
              </div>
            </div>
          </div>
          <div className="shop-info-output">
            {infoGroup.info && <div>{shop.info}</div>}
            {infoGroup.delivery && (
              <div>
                <p>Доставка до дому - {shop.deliveryMinCost} ₴</p>
                <p>Доставка до дверей - 49 ₴</p>
                <p>Доплата за віддалені райони - 10-100 ₴</p>
                <ul>
                  <li>більше 1 км - 20 ₴</li>
                  <li>більше 3 км - 30 ₴</li>
                  <li>більше 4 км - 40 ₴</li>
                  <li>більше 5 км - 60 ₴</li>
                  <li>більше 7 км - 100 ₴</li>
                </ul>
                <p>Самовивіз - безкоштовно</p>
              </div>
            )}
            {infoGroup.time && (
              <div>
                У середньому, час на доставку складає {shop.deliveryTime} хв.
                Замовлення, у святкові або вихідні дні, а також у піковий
                період, можуть доставлятися довше.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopInfo;
