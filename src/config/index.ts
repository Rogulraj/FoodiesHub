import { cleanEnv, port, str } from "envalid";

const envVars = cleanEnv(import.meta.env, {
  VITE_NODE_ENV: str(),
  VITE_API_PORT: port(),
  VITE_API_BASE_URL: str(),
  VITE_SESSION_TOKEN_NAME: str(),
});

export const {
  VITE_API_BASE_URL,
  VITE_API_PORT,
  VITE_NODE_ENV,
  VITE_SESSION_TOKEN_NAME,
} = envVars;
