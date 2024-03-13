import Home from "@pages/Home/Home";
import { routePropsType } from "./types/routeProps.type";
import { Navigate } from "react-router-dom";
import routePaths from "@constants/routePaths";

const protectedRoutes: routePropsType[] = [
  {
    path: "home",
    element: <Home />,
  },

  {
    path: "*",
    element: <Navigate to={routePaths.login} />,
  },
];

export default protectedRoutes;
