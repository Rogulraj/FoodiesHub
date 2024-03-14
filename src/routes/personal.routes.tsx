//packages
import { Navigate } from "react-router-dom";

//pages
import PersonalHome from "@pages/Personal/Home/PersonalHome";

//constant
import routePaths from "@constants/routePaths";

//types
import { routePropsType } from "./types/routeProps.type";

//routes
const personalRoutes: routePropsType[] = [
  {
    path: "home",
    element: <PersonalHome />,
  },
  {
    path: "*",
    element: <Navigate to={routePaths.login} />,
  },
];

export default personalRoutes;
