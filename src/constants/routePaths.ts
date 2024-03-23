//types
interface RoutePathsType {
  login: string;
  forgotPassword: string;
  signup: string;
  personalDetails: string;
  additionalInfo: string;
  confirmation: string;
  personalHome: string;
  restaurantDetails: string;
  restaurantHome: string;
}

//route paths
const routePaths: RoutePathsType = {
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  signup: "/auth/sign-up",
  personalDetails: "/auth/personal-details",
  additionalInfo: "/auth/additional-info",
  confirmation: "/auth/confirmation",
  personalHome: "/personal/home",
  restaurantDetails: "/auth/restaurant-details",
  restaurantHome: "/restaurant/home",
};

export default routePaths;
