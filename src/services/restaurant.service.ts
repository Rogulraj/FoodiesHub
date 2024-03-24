import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommonResponse } from "../models";
import { VITE_API_BASE_URL, VITE_API_PORT } from "@config/index";
import { GetSessionToken } from "@helper/sessionToken.helper";
import {
  CreateMenuItemModels,
  CreateMenuTypeModels,
  CreateRestaurantModels,
  MenuItemsType,
  RestaurantModel,
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

    // get all restaurant
    getAllRestaurants: builder.query<
      CommonResponse<RestaurantModel[]>,
      unknown
    >({
      query: () => ({
        url: "/",
        headers: {
          Authorization: `Bearer ${GetSessionToken()}`,
        },
        method: "GET",
      }),
    }),

    // get restaurant by id
    getRestaurantById: builder.query<
      CommonResponse<RestaurantModel>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/${id}`,
        headers: {
          Authorization: `Bearer ${GetSessionToken()}`,
        },
        method: "GET",
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

    getFoodById: builder.query<
      CommonResponse<MenuItemsType>,
      { foodId: string; restaurantId: string; category: string }
    >({
      query: ({ foodId, restaurantId, category }) => ({
        url: `/food/${foodId}?restaurantId=${restaurantId}&category=${category}`,
        headers: { Authorization: `Bearer ${GetSessionToken()}` },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useCreateMenuTypeMutation,
  useCreateMenuItemMutation,
  useGetFoodByIdQuery,
} = restaurantApi;
