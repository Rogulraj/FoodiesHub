import { GetSessionToken } from "@helper/sessionToken.helper";
import { PropsWithChildren, ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactNode => {
  const token: string | undefined = GetSessionToken();

  return token ? children : <Navigate to={"/"} />;
};

export default ProtectedRoute;
