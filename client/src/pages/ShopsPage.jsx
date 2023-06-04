import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useActiveShop, useCartStore } from "../store/Store";

import "../styles/ShopsPage.css";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const ShopsPage = () => {
  const [shops, setShops] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [currentShop, setCurrentShop] = useState(null);
  const [products, setProducts] = useState();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const currentActiveShop = useActiveShop((state) => state.activeShop);
  const changeActiveShop = useActiveShop((state) => state.setActiveShop);

  const addToCartProduct = useCartStore((state) => state.addToCart);
  const productsInCart = useCartStore((state) => state.cartProducts);

  const navigate = useNavigate();

  const fetchShops = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}/shops`
      );

      setShops(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      if (currentShop) {
        setIsLoadingProducts(true);
        const response = await axios.get(
          `${process.env.REACT_APP_MAIN_URL}/products/shop/${currentShop}`
        );
        setProducts(response.data);
        setIsLoadingProducts(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchShops();

    const storedData = JSON.parse(localStorage.getItem("cartItems"));
    storedData?.productsInCart.map((storedItem) => {
      const { id, title, price, quantity, image, shop } = storedItem;
      // addToCartProduct(id, title, price, image, quantity, shop);
      changeActiveShop(shop);
    });

    if (storedData?.productsInCart.length && !productsInCart.length) {
      navigate("/order");
    }
  }, []);

  const changeCurrentShopHandler = (shop) => {
    productsInCart && currentActiveShop === shop && setCurrentShop(shop);
    !productsInCart.length && setCurrentShop(shop);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentShop]);

  const addToCartHandler = (
    productId,
    productTitle,
    productPrice,
    productImage,
    shopId
  ) => {
    addToCartProduct(
      productId,
      productTitle,
      productPrice,
      productImage,
      1,
      shopId
    );
    changeActiveShop(shopId);

    console.log("click");
  };

  useEffect(() => {
    productsInCart?.length &&
      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          productsInCart,
        })
      );
    console.log("set in storage");
  }, [productsInCart]);

  return (
    <>
      {/* {currentActiveShop}
      {productsInCart?.length > 0 ? (
        <h3>Items in cart</h3>
      ) : (
        <h3>No items in cart</h3>
      )} */}
      {error && <h1>{error}</h1>}
      {isLoading ? (
        <div className="center">
          <Loading />
        </div>
      ) : (
        <div className="shop__container">
          <div className="shops">
            {!isLoading &&
              shops &&
              shops.map((shop) => (
                <div
                  key={shop._id}
                  className={`shop__item ${
                    productsInCart?.length &&
                    currentActiveShop &&
                    currentActiveShop !== shop._id &&
                    "inactive"
                  }`}
                >
                  <div
                    className="shop__image"
                    onClick={() => changeCurrentShopHandler(shop._id)}
                  >
                    <img
                      src={`${process.env.REACT_APP_URL}/${shop.image}`}
                      alt={shop.title}
                    />
                    <div className="shop__type">
                      <span>{shop.type}</span>
                    </div>
                  </div>
                  <div
                    className="shop__title"
                    onClick={() => changeCurrentShopHandler(shop._id)}
                  >
                    {shop.title}
                  </div>
                </div>
              ))}
          </div>

          <div className="products">
            {isLoadingProducts ? (
              <div className="center">
                <Loading />
              </div>
            ) : (
              <div className="products__wrapper">
                {!currentShop && <h2>Choose shop</h2>}
                {products &&
                  products.map((product) => (
                    <div key={product._id} className="product__item">
                      <div className="product__image">
                        <img
                          src={`${process.env.REACT_APP_URL}/${product.image}`}
                          alt={product.title}
                        />
                      </div>
                      <div className="product__title">{product.title}</div>
                      <div className="product__price">{product.price} грн</div>
                      <button
                        onClick={() =>
                          addToCartHandler(
                            product._id,
                            product.title,
                            product.price,
                            product.image,
                            product.shop
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopsPage;
