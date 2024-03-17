import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignupUserData } from "../interfaces/user.interface";
import { CommonResponse } from "../models";
import { SignupUserResponse } from "../models/signup.model";

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

export const signupApiSlice = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),

  endpoints: (builder) => ({
    postSignup: builder.mutation<
      CommonResponse<SignupUserResponse>,
      SignupUserData
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
  }),
});

export const { usePostSignupMutation } = signupApiSlice;
