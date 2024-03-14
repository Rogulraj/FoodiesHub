//packages
import React from "react";
import { Navigate } from "react-router-dom";

//types
import { routePropsType } from "./types/routeProps.type";

//pages
import Login from "@pages/Login/Login";
import ForgotPassword from "@pages/ForgotPassword/ForgotPassword";
import Signup from "@pages/Signup/Signup";
import PersonalDetails from "@pages/PersonalDetails/PersonalDetails";
import AdditionalInfo from "@pages/AdditionalInfo/AdditionalInfo";
import Confirmation from "@pages/Confirmation/Confirmation";

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
