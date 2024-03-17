import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { signupApiSlice } from "../../services/signup.service";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    [signupApiSlice.reducerPath]: signupApiSlice.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(signupApiSlice.middleware);
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
