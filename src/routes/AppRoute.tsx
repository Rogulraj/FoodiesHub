import React from "react";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

//Routes
import authRoutes from "./auth.routes";
import protectedRoutes from "./protected.routes";

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
      path: "/app/*",
      children: [...protectedRoutes],
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
