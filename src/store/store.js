import { configureStore } from "@reduxjs/toolkit";
import membershipReducer from "../slice/membershipSlice/membershipSlice";
import userReducer from "../slice/userSlice/userSlice";

export default configureStore({
  reducer: { memberships: membershipReducer, users: userReducer },
});
