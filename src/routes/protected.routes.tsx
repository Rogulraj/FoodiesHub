//packages
import { Navigate } from "react-router-dom";

//pages
import Home from "@pages/Home/Home";

//constant
import routePaths from "@constants/routePaths";

//types
import { routePropsType } from "./types/routeProps.type";

//routes
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
