import { createSlice } from "@reduxjs/toolkit";

export const membershipSlice = createSlice({
  name: "membership",
  initialState: [],
  reducers: {
    addMembership: (state, action) => {
      console.log("acccc", action.payload);
      const membership = action.payload;

      return membership;
    },
  },
});

// this is for dispatch
export const { addMembership } = membershipSlice.actions;
export const { addMembershipToCart } = membershipSlice.actions;

// this is for configureStore
export default membershipSlice.reducer;
