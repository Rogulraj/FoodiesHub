import React from "react";
import { Navigate } from "react-router-dom";

//types
import { routePropsType } from "./types/routeProps.type";

//pages
import Login from "@pages/Login/Login";
import ForgotPassword from "@pages/ForgotPassword/ForgotPassword";
import Signup from "@pages/Signup/Signup";
import PersonalDetails from "@pages/PersonalDetails/PersonalDetails";

const authRoutes: routePropsType[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "personal-details",
    element: <PersonalDetails />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];

export default authRoutes;
