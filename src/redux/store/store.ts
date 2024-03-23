import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApiSlice } from "../../services/auth.service";
import { restaurantApi } from "../../services/restaurant.service";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      authApiSlice.middleware,
      restaurantApi.middleware
    );
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
