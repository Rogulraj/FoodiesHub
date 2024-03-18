import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateUserBody, LoginUserBody } from "../interfaces/auth.interface";
import { CommonResponse } from "../models";
import { CreateUserResponse, LoginUserResponse } from "../models/auth.model";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL as string}:${
  import.meta.env.VITE_API_PORT
}`;

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),

  endpoints: (builder) => ({
    //signup
    postSignup: builder.mutation<
      CommonResponse<CreateUserResponse>,
      CreateUserBody
    >({
      query: (userData) => ({
        url: "/api/v1/web/signup",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: userData,
      }),
    }),

    //login
    postLogin: builder.mutation<
      CommonResponse<LoginUserResponse>,
      LoginUserBody
    >({
      query: (userData) => ({
        url: "/api/v1/web/login",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { usePostSignupMutation, usePostLoginMutation } = authApiSlice;
