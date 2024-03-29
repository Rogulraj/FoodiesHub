import Cookies from "js-cookie";
import { CookiesKeys } from "@constants/cookies";

export function SetCookies(
  key: CookiesKeys,
  value: string,
  expiresIn: number = 3600
) {
  // default expires in 1 hour
  const expires = new Date();
  expires.setTime(expires.getTime() + expiresIn * 1000);

  const stringifyValue: string = JSON.stringify(value);
  Cookies.set(key, stringifyValue, { expires });
}

export function GetCookies(key: CookiesKeys): any {
  const value = Cookies.get(key);
  if (!value) return undefined;
  return JSON.parse(value);
}
