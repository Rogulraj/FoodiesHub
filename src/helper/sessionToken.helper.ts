import { VITE_SESSION_TOKEN_NAME } from "@config/index";
import Cookies from "js-cookie";

export function GetSessionToken(): string | undefined {
  const token: string | undefined = Cookies.get(VITE_SESSION_TOKEN_NAME);

  // const demo: string =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY1NTUzNWVhZjE1YWMwMDVmYWZmN2QiLCJpYXQiOjE3MTExMTc0MzAsImV4cCI6MTcxMTEyMTAzMH0.zRuNH-Z8ia4Y1XEBEfpn5yAa-_dwvbZyBzpTNcdYFjs";
  return token;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export function SetSessionToken(tokenData: TokenData) {
  const token = tokenData?.token;
  const expiresIn = new Date();
  expiresIn.setTime(expiresIn.getTime() + tokenData.expiresIn * 1000);

  Cookies.set(VITE_SESSION_TOKEN_NAME, token, {
    expires: expiresIn,
  });
}
