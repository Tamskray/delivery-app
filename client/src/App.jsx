import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  redirect,
  useNavigate,
} from "react-router-dom";

import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import ShopsPage from "./pages/ShopsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Shops from "./pages/Shops";
import Products from "./pages/Products";
import Order from "./pages/Order";

import.meta.env.MODE;

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/shops",
          element: <Shops />,
        },
        {
          path: "/shop/:shopUrl",
          element: <Products />,
        },
        {
          path: "/order",
          element: <Order />,
        },
        {
          path: "/1shops1",
          element: <ShopsPage />,
        },
        {
          path: "/order1",
          element: <ShoppingCartPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
