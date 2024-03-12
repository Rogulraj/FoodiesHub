interface RoutePathsType {
  login: string;
  forgotPassword: string;
  signup: string;
  personalDetails: string;
  additionalInfo: string;
}

const routePaths: RoutePathsType = {
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  signup: "/auth/sign-up",
  personalDetails: "/auth/personal-details",
  additionalInfo: "/auth/additional-info",
};

export default routePaths;
