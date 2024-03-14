import React from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

//Routes
import authRoutes from "./auth.routes";
import protectedRoutes from "./personal.routes";
import restaurantRoutes from "./restaurant.routes";

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/auth/login"} />,
    },
    {
      path: "/auth/*",
      children: [...authRoutes],
    },
    {
      path: "/personal/*",
      children: [...protectedRoutes],
    },
    {
      path: "/restaurant/*",
      children: [...restaurantRoutes],
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
