import { TokenData } from "@helper/sessionToken.helper";

export interface CreateUserResponse {
  _id: string;
  email: string;
  accountType: string;
}

export interface LoginUserResponse {
  _id: string;
  email: string;
  tokenData: TokenData;
}
