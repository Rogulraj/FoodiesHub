import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommonResponse, IdResponse } from "../models";
import { VITE_API_BASE_URL, VITE_API_PORT } from "@config/index";
import { GetSessionToken } from "@helper/sessionToken.helper";
import {
  CreateMenuItemModels,
  CreateMenuCategoryModels,
  CreateRestaurantModels,
  MenuCategoryItems,
  RestaurantModel,
  MenuType,
  UpdateFoodByIdModel,
  RemoveFoodByIdModel,
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

    // update restaurant
    updateRestaurant: builder.mutation<
      CommonResponse<IdResponse>,
      Partial<RestaurantModel>
    >({
      query: (userData) => ({
        url: "/update",
        headers: { Authorization: `Bearer ${GetSessionToken()}` },
        timeout: 5000,
        body: userData,
        method: "PUT",
      }),
    }),

    // create menu type
    createMenuType: builder.mutation<
      CommonResponse<string>,
      CreateMenuCategoryModels
    >({
      query: (userData) => ({
        url: "/add-menu-category",
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

    // Get all the menu items
    getAllMenuItems: builder.query<CommonResponse<MenuType[]>, unknown>({
      query: () => ({
        url: "/menu-items",
        headers: { Authorization: `Bearer ${GetSessionToken()}` },
        method: "GET",
      }),
    }),

    getFoodById: builder.query<
      CommonResponse<MenuCategoryItems>,
      { foodId: string; restaurantId: string; category: string }
    >({
      query: ({ foodId, restaurantId, category }) => ({
        url: `/food/${foodId}?restaurantId=${restaurantId}&category=${category}`,
        headers: { Authorization: `Bearer ${GetSessionToken()}` },
        method: "GET",
      }),
    }),

    // update food item by id
    updateFoodById: builder.mutation<
      CommonResponse<IdResponse>,
      UpdateFoodByIdModel
    >({
      query: ({ foodId, restaurantId, categoryId, item }) => ({
        url: `/food/update/${foodId}`,
        headers: { Authorization: `Bearer ${GetSessionToken()}` },
        body: { restaurantId, categoryId, item },
        method: "PUT",
      }),
    }),

    /** DELETE */
    removeMenuCategaory: builder.mutation<
      CommonResponse<MenuType>,
      { categoryId: string }
    >({
      query: ({ categoryId }) => ({
        url: `/food/remove-category/${categoryId}`,
        headers: {
          Authorization: `Bearer ${GetSessionToken()}`,
        },
        method: "DELETE",
      }),
    }),

    removeFoodById: builder.mutation<
      CommonResponse<IdResponse>,
      RemoveFoodByIdModel
    >({
      query: ({ foodId, restaurantId, categoryId }) => ({
        url: `/food/remove-food/${foodId}`,
        headers: { Authorization: `Bearer ${GetSessionToken()}` },
        body: { restaurantId, categoryId },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useCreateMenuTypeMutation,
  useCreateMenuItemMutation,
  useGetAllMenuItemsQuery,
  useGetFoodByIdQuery,
  useUpdateFoodByIdMutation,
  useRemoveFoodByIdMutation,
  useRemoveMenuCategaoryMutation,
} = restaurantApi;
