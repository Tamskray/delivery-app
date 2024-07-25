import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAuthStore } from "./store/Store";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Shops from "./pages/Shops";
import Products from "./pages/Products";
import Order from "./pages/Order";
import AdminPanel from "./pages/AdminPanel";
import CurrentOrders from "./pages/CurrentOrders";

import.meta.env.MODE;

function App() {
  const token = useAuthStore((state) => state.token);
  console.log("Token " + !!token);

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
          path: "/current-order",
          element: <CurrentOrders />,
        },
        {
          path: "/admin",
          element: !!token ? <AdminPanel /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
