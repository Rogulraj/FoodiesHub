import React from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

//Routes
import authRoutes from "./auth.routes";

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
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
