interface RoutePathsType {
  login: string;
  forgotPassword: string;
  signup: string;
  personalDetails: string;
}

const routePaths: RoutePathsType = {
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  signup: "/auth/sign-up",
  personalDetails: "/auth/personal-details",
};

export default routePaths;
