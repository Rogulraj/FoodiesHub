import { cleanEnv, port, str } from "envalid";

export function ValidateEnv(): void {
  cleanEnv(import.meta.env, {
    VITE_NODE_ENV: str(),
    VITE_API_PORT: port(),
    VITE_API_BASE_URL: str(),
  });
}
