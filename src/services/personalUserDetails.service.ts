import { VITE_API_BASE_URL, VITE_API_PORT } from "@config/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommonResponse, IdResponse } from "../models";
import { PersonalUserDetails } from "../models/personalUserDetails.model";
import { GetSessionToken } from "@helper/sessionToken.helper";

const baseUrl = `${VITE_API_BASE_URL}:${VITE_API_PORT}/api/v1/web/personal`;

export const personalUserDetailsApi = createApi({
  reducerPath: "personalUserDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    /** POST */
    createPersonalUserDetails: builder.mutation<
      CommonResponse<IdResponse>,
      Partial<PersonalUserDetails>
    >({
      query: (userData) => ({
        url: `/user-details/create`,
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
        method: "POST",
      }),
    }),

    /** GET */
    getPersonalUserDetailsById: builder.query<
      CommonResponse<PersonalUserDetails>,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/user-details/get/${userId}`,
        headers: {
          Authorization: `Bearer ${GetSessionToken()}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePersonalUserDetailsMutation,
  useGetPersonalUserDetailsByIdQuery,
} = personalUserDetailsApi;
