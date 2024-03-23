//packages
import { Navigate } from "react-router-dom";

//pages
import PersonalHome from "@pages/Personal/Home/PersonalHome";

//constant
import routePaths from "@constants/routePaths";

//types
import { routePropsType } from "./types/routeProps.type";
import ProtectedRoute from "@components/Wrappers/ProtectedRoute/ProtectedRoute";

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
    path: "*",
    element: <Navigate to={routePaths.login} />,
  },
];

export default personalRoutes;
