import { configureStore } from "@reduxjs/toolkit";
import membershipReducer from "../slice/membershipSlice/membershipSlice";
import userReducer from "../slice/userSlice/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "currentUser",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: { memberships: membershipReducer, users: persistedReducer },
  middleware: [thunk],
});

export const persistor = persistStore(store);
