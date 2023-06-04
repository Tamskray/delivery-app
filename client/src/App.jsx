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

import.meta.env.MODE;

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <ShopsPage />,
        },
        {
          path: "/order",
          element: <ShoppingCartPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
