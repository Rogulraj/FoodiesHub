//packages
import { Navigate } from "react-router-dom";

//pages
import PersonalHome from "@pages/Personal/Home/PersonalHome";

//constant
import routePaths from "@constants/routePaths";

//types
import { routePropsType } from "./types/routeProps.type";
import ProtectedRoute from "@components/Wrappers/ProtectedRoute/ProtectedRoute";
import PersonalRestaurant from "@pages/Personal/PersonalRestaurant/PersonalRestaurant";
import PersonalFood from "@pages/Personal/Food/PersonalFood";

//routes
const personalRoutes: routePropsType[] = [
  {
    path: "home",
    element: (
      <ProtectedRoute>
        <PersonalHome />,
      </ProtectedRoute>
    ),
  },
  {
    path: "restaurant/:id",
    element: <PersonalRestaurant />,
  },
  {
    path: "restaurant/food/:id",
    element: <PersonalFood />,
  },

  {
    path: "*",
    element: <Navigate to={routePaths.login} />,
  },
];

export default personalRoutes;
