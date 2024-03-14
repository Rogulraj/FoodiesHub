//packages
import { Navigate } from "react-router-dom";

//pages
import RestaurantHome from "@pages/Restaurant/Home/RestaurantHome";

//constant
import routePaths from "@constants/routePaths";

//types
import { routePropsType } from "./types/routeProps.type";

//routes
const restaurantRoutes: routePropsType[] = [
  {
    path: "home",
    element: <RestaurantHome />,
  },
  {
    path: "*",
    element: <Navigate to={routePaths.login} />,
  },
];

export default restaurantRoutes;
