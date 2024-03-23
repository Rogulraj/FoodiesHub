//packages
import React from "react";
import { Navigate } from "react-router-dom";

//types
import { routePropsType } from "./types/routeProps.type";

//pages
import Login from "@pages/Auth/Login/Login";
import ForgotPassword from "@pages/Auth/ForgotPassword/ForgotPassword";
import Signup from "@pages/Auth/Signup/Signup";
import PersonalDetails from "@pages/Auth/PersonalDetails/PersonalDetails";
import AdditionalInfo from "@pages/Auth/AdditionalInfo/AdditionalInfo";
import Confirmation from "@pages/Auth/Confirmation/Confirmation";
import RestaurantDetails from "@pages/Auth/RestaurantDetails/RestaurantDetails";

//routes
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
    path: "restaurant-details",
    element: <RestaurantDetails />,
  },
  {
    path: "additional-info",
    element: <AdditionalInfo />,
  },
  {
    path: "confirmation",
    element: <Confirmation />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];

export default authRoutes;
