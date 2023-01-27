import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import db from "../../firebase_setup/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  users: [],
  currentUser: {},
  loading: true,
  error: false,
};
export const addUserToStore = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    const authentication = getAuth();
    console.log("inside async thunk", { user });
    try {
      const res = await createUserWithEmailAndPassword(
        authentication,
        user.email,
        user.password
      );
      sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      await updateProfile(authentication.currentUser, {
        displayName: user.name,
      });
      await db
        .collection("user")
        .doc(user.email)
        .set({
          name: user.name,
          email: user.email,
          number: user.number,
          gender: user.gender,
          userRoles: ["user", "admin"],
        });
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: user.name,
          email: user.email,
          number: user.number,
          gender: user.gender,
          userRoles: ["user", "admin"],
        })
      );
    } catch (error) {
      console.log(error);
      const str = error.code.split("/");
      console.log(str);
      toast.error(str[1]);
      return rejectWithValue("error");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    const authentication = getAuth();
    console.log({ user });
    try {
      const response = await signInWithEmailAndPassword(
        authentication,
        user.email,
        user.password
      );
      const email = response.user.email;
      const token = response._tokenResponse.refreshToken;

      let res2 = await db.collection("user").doc(email).get();
      res2 = res2.data();

      // const res = data.docs
      //   .map((item) => {
      //     return item.data().user;
      //   })
      //   .filter((user) => user?.email === email);

      // sessionStorage.setItem("currentUser", JSON.stringify(activeUser));
      // const token = response._tokenResponse.refreshToken;
      sessionStorage.setItem("Auth Token", token);
      sessionStorage.setItem("currentUser", JSON.stringify(res2));
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        return rejectWithValue("wrong-password");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        console.log("hmm");
        return rejectWithValue("Please check the Email");
      } else {
        console.log("vhjk");
        return rejectWithValue(error.code);
      }
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: {},
    loading: false,
    error: false,
  },
  reducers: {
    addUser: (state, action) => {
      const tempUser = { ...action.payload };
      tempUser.cart = [];

      return {
        ...state,
        users: [...state.users, tempUser],
      };
    },
    addToCart: (state, action) => {
      console.log(action.payload);
      const { membershipDetail } = action.payload;
      const { currUser } = action.payload;

      const newState = state?.users?.map((user) => {
        if (user.email === currUser.email) {
          console.log("here2");
          let cart = [...user?.cart, membershipDetail];
          return {
            ...user,
            cart,
            order: { ...(cart[0] || {}), orderDate: new Date() },
          };
        }
      });
      console.log({ newState });
      let newCart = state.currentUser?.cart
        ? [...state.currentUser.cart, membershipDetail]
        : [membershipDetail];
      console.log({ newCart });

      return {
        ...state,
        users: newState,
        currentUser: {
          ...state.currentUser,
          cart: newCart,
        },
      };
    },
    // register: (state, action) => {
    //   console.log("payload", action.payload);
    //   const user = action.payload;
    //   const authentication = getAuth();
    //   createUserWithEmailAndPassword(authentication, user.email, user.password)
    //     .then((res) => {
    //       sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
    //       console.log("here", user.number);
    //       sessionStorage.setItem("currentUser", JSON.stringify(user));
    //       updateProfile(authentication.currentUser, {
    //         displayName: user.name,
    //       });
    //       db.collection("user")
    //         .doc(user.email)
    //         .set({
    //           name: user.name,
    //           email: user.email,
    //           number: user.number,
    //           gender: user.gender,
    //         })
    //         .then((ref) => {
    //           console.log("doc written", ref);
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       const str = error.code.split("/");
    //       console.log(str);
    //       toast.error(str[1]);
    //     });
    //   return { ...state, currentUser: user };
    // },
    // login: async (state, action) => {
    //   return { ...state, currentUser: action.payload };
    // },
    logout: (state, action) => {
      sessionStorage.removeItem("Auth Token");
      sessionStorage.removeItem("currentUser");
      return { ...state, currentUser: {} };
    },
    addMembershipToUser: (state, action) => {
      let { cartItems } = action.payload;
      cartItems = cartItems || {};

      let user = JSON.parse(action.payload.user);
      const email = user.email;
      let order = user.orders || [];
      db.collection("user")
        .doc(email)
        .set({
          ...user,
          activeMemberships: { ...(cartItems[0] || {}), orderDate: new Date() },
          orders: [
            ...order,
            { ...(cartItems[0] || {}), orderDate: new Date() },
          ],
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...user,
          activeMemberships: cartItems[0],
          orders: [...order, { ...cartItems[0], orderDate: new Date() }],
        })
      );
      return {
        ...state,
        currentUser: {
          ...user,
          activeMemberships: cartItems[0],
          orders: [...order, { ...cartItems[0], orderDate: new Date() }],
        },
      };
    },
    addOrderToUser: async (state, action) => {
      const { cartItems } = action.payload;
      console.log("in add ordedr", cartItems);

      let user = JSON.parse(action.payload.user);
      let order = user.orders || [];
      const email = user.email;
      console.log(email);
      db.collection("user")
        .doc(email)
        .set({
          ...user,
          orders: [...order, { ...cartItems[0], orderDate: new Date() }],
        })
        .then((ref) => {
          console.log("Document successfully written! hereee order", ref);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      const latestUser = await db.collection("user").doc(email).get();
      sessionStorage.setItem("currentUser", JSON.stringify(latestUser.data()));
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(addUserToStore.fulfilled, (state, action) => {
      let user = sessionStorage.getItem("currentUser");
      user = JSON.parse(user);

      state.currentUser = user;
      state.loading = false;
      state.error = false;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      let user = sessionStorage.getItem("currentUser");
      user = JSON.parse(user);

      state.currentUser = user;
      state.loading = false;
      state.error = false;
      return state;
    });
    builder.addCase(addUserToStore.pending, (state, action) => {
      console.log("here2", action.payload);
      state.loading = true;
    });
    builder.addCase(addUserToStore.rejected, (state, action) => {
      console.log("here3", action.payload);

      state.error = true;
    });
  },
});

export const { addUser } = userSlice.actions;
export const { addToCart } = userSlice.actions;
export const { register } = userSlice.actions;

export const { logout } = userSlice.actions;
export const { addMembershipToUser } = userSlice.actions;
export const { addOrderToUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
