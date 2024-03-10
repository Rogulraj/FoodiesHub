import Login from "@pages/Login/Login";
import React from "react";
import { Navigate } from "react-router-dom";

import { routePropsType } from "./types/routeProps.type";

const authRoutes: routePropsType[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];

export default authRoutes;
