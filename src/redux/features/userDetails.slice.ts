import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserDetailsState {
  name: string;
  email: string;
  imageUrl: string;
}

const initialState: UserDetailsState = {
  name: "",
  email: "",
  imageUrl: "",
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    handleData: (state, action: PayloadAction<Partial<UserDetailsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const userDetailsReducer = userDetailsSlice.reducer;
export const userDetailsActions = userDetailsSlice.actions;
