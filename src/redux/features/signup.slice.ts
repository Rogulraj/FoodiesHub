import { AccountType } from "@interfaces/accountType.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SignupState {
  accountType: AccountType["accountType"];
  email: string;
  password: string;
}

const initialState: SignupState = {
  accountType: "personal",
  email: "",
  password: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    handleAccountType: (
      state,
      action: PayloadAction<SignupState["accountType"]>
    ) => {
      state.accountType = action.payload;
    },

    handleEmailPassword: (
      state,
      action: PayloadAction<Partial<SignupState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

const signupReducer = signupSlice.reducer;

export default signupReducer;
export const signupActions = signupSlice.actions;
