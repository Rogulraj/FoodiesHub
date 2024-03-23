//packages
import { Navigate } from "react-router-dom";

//pages
import RestaurantHome from "@pages/Restaurant/Home/RestaurantHome";

//constant
import routePaths from "@constants/routePaths";

//types
import { routePropsType } from "./types/routeProps.type";
import ProtectedRoute from "@components/Wrappers/ProtectedRoute/ProtectedRoute";

//routes
const restaurantRoutes: routePropsType[] = [
  {
    path: "home",
    element: (
      <ProtectedRoute>
        <RestaurantHome />,
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to={routePaths.login} />,
  },
];

export default restaurantRoutes;
