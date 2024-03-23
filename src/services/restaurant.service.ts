import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommonResponse } from "../models";
import { VITE_API_BASE_URL, VITE_API_PORT } from "@config/index";
import { GetSessionToken } from "@helper/sessionToken.helper";
import {
  CreateMenuItemModels,
  CreateMenuTypeModels,
  CreateRestaurantModels,
} from "../models/restaurant.model";

const baseUrl = `${VITE_API_BASE_URL}:${VITE_API_PORT}/api/v1/web/restaurant`;

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    // create restaurant
    createRestaurant: builder.mutation<
      CommonResponse<string>,
      CreateRestaurantModels
    >({
      query: (userData) => ({
        url: "/create",
        headers: {
          Authorization: `Bearer ${GetSessionToken()}`,
        },
        method: "POST",
        body: userData,
      }),
    }),

    // create menu type
    createMenuType: builder.mutation<
      CommonResponse<string>,
      CreateMenuTypeModels
    >({
      query: (userData) => ({
        url: "/add-menu-type",
        headers: {
          Authorization: `Bearer ${GetSessionToken()}`,
        },
        method: "PUT",
        body: userData,
      }),
    }),

    // create menu item
    createMenuItem: builder.mutation<
      CommonResponse<string>,
      CreateMenuItemModels
    >({
      query: (userData) => ({
        url: "/add-menu-item",
        headers: {
          Authorization: `Bearer ${GetSessionToken()}`,
        },
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useCreateMenuTypeMutation,
  useCreateMenuItemMutation,
} = restaurantApi;
