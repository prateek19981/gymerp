import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import db from "../../firebase_setup/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getActiveMembers } from "../../utils/getActiveMembers";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
} from "firebase/auth";
import { getAge } from "../../utils/getAge";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStartDate } from "../../utils/getMembershipStartDate";
import { getEndDate } from "../../utils/getMembershipEndDate";

export const addUserToStore = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    const authentication = getAuth();
    let age = getAge(user.dob);
    // if (age <= 18) {
    //   throw Error("age should be greator than 18");
    // }
    try {
      const res = await createUserWithEmailAndPassword(
        authentication,
        user.email,
        user.password
      );
      sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
      console.log({ user });

      // user.age = age;

      user.userRoles = ["user"];
      if (user.role === "admin") {
        user.userRoles.push("admin");
      }

      await updateProfile(authentication.currentUser, {
        displayName: user.name,
      });
      await db
        .collection("user")
        .doc(user.email)
        .set({
          name: user.firstname || user.name,
          email: user.email,
          number: user.number,
          gender: user.gender,
          userRoles: user.userRoles,
          adminId: user.adminId,
          joiningDate: new Date().toDateString(),
        });
      if (user.adminId) {
        let snap = await db.collection("user").doc(user.adminId).get();
        let adminData = snap.data();
        // Loop through the data and store
        // it in array to display
        console.log({ adminData });
        let existingMembers = adminData?.members?.length || 0;

        db.collection("user")
          .doc(user.adminId)
          .set(
            {
              members: arrayUnion({
                name: user.name,
                email: user.email,
                number: user.number,
                gender: user.gender,
                userRoles: user.userRoles,
                adminId: user.adminId,
                age,
                joiningDate: new Date().toDateString(),
              }),
              totalMembers: existingMembers + 1,
            },
            { merge: true }
          );
      }
      return user;
    } catch (error) {
      console.log(error);
      const str = error.code.split("/");
      console.log(str);
      toast.error(str[1]);
      return rejectWithValue("error");
    }
  }
);

export const addUserByAdmin = createAsyncThunk(
  "user/addUserByAdmin",
  async (user, { rejectWithValue }) => {
    const authentication = getAuth();

    let age = getAge(user.dob);
    // if (age <= 18) {
    //   throw Error("age should be greator than 18");
    // }
    const { planDetail } = user;
    console.log("inside async thunk by admin", user);
    try {
      const res = await createUserWithEmailAndPassword(
        authentication,
        user.email,
        user.password
      );
      console.log({ user });

      user.age = age;
      user.joiningDate = new Date(user.joiningDate).toDateString();

      user.userRoles = ["user"];
      if (user.role === "admin") {
        user.userRoles.push("admin");
      }
      let currUser = sessionStorage.getItem("persist:currentUser");
      currUser = JSON.parse(currUser).currentUser;
      currUser = JSON.parse(currUser);
      console.log("addbyadmin", currUser);
      user.adminId = currUser.email;
      let totalMembers = currUser?.members?.length || 1;
      let activeMembers = getActiveMembers(currUser);
      let totalActiveMembers = activeMembers?.length || 1;
      let activeMemberships = { ...planDetail, orderDate: new Date() };
      let startDate = getStartDate(activeMemberships);
      let endDate = getEndDate(activeMemberships);
      activeMemberships.startDate = startDate;
      activeMemberships.endDate = endDate;
      await updateProfile(authentication.currentUser, {
        displayName: user.name,
      });
      await db
        .collection("user")
        .doc(user.email)
        .set({
          name: user.firstname || user.name,
          email: user.email,
          number: user.number,
          gender: user.gender,
          userRoles: user.userRoles,
          adminId: currUser.email,
          joiningDate: user.joiningDate,
          age: user.age,
          activeMemberships,
          orders: [{ ...planDetail, orderDate: new Date() }],
        });

      // let totalMembers = data.totalMembers ? data.totalMembers : 0;
      // console.log({ totalMembers });

      db.collection("user")
        .doc(user.adminId)
        .set(
          {
            members: arrayUnion({
              name: user.name || user.firstname,
              email: user.email,
              number: user.number,
              gender: user.gender,
              userRoles: user.userRoles,
              adminId: currUser.email,
              activeMemberships,
              orders: [{ ...planDetail, orderDate: new Date() }],
              age: user.age,
              joiningDate: user.joiningDate,
            }),
            totalMembers: totalMembers + 1,
            activeMembers: totalActiveMembers + 1,
          },
          { merge: true }
        );

      return user;
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
      return res2;
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
    currentUser: {
      name: "",
      adminId: "",
      email: "",
      gender: "",
      members: [],
      number: "",
      userRoles: [],
      totalMembers: 0,
      activeMembers: 0,
    },
    loading: false,
    error: false,
  },

  reducers: {
    addUser: (state, action) => {
      const tempUser = { ...action.payload };
      tempUser.cart = [];

      return {
        ...state,
        currentUser: tempUser,
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
            ...state,
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

      let user = action.payload.user;
      let adminId = user.adminId;

      const email = user.email;
      let order = user.orders || [];
      let activeMemberships = {
        ...(cartItems[0] || {}),
        orderDate: new Date(),
      };
      let startDate = getStartDate(activeMemberships);
      let endDate = getEndDate(activeMemberships);
      activeMemberships.startDate = startDate;
      activeMemberships.endDate = endDate;
      db.collection("user")
        .doc(email)
        .set({
          ...user,
          activeMemberships: activeMemberships,
          orders: [
            ...order,
            { ...(cartItems[0] || {}), orderDate: new Date() },
          ],
        })
        .then(async () => {
          console.log("Document successfully written!", user);
          const age = getAge(user.dob);
          if (adminId) {
            console.log("achaa", user);
            let snap = await db.collection("user").doc(adminId).get();
            let adminData = snap.data();
            let activeMembers = getActiveMembers(adminData);

            db.collection("user")
              .doc(adminId)
              .update({
                members: arrayRemove({
                  name: user.name,
                  email: user.email,
                  number: user.number,
                  gender: user.gender,
                  userRoles: user.userRoles,
                  adminId: user.adminId,
                  age: age,
                }),
              });
            db.collection("user")
              .doc(adminId)
              .set(
                {
                  members: arrayUnion({
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    gender: user.gender,
                    userRoles: user.userRoles,
                    adminId,
                    activeMemberships: activeMemberships,
                    orders: [
                      ...order,
                      { ...(cartItems[0] || {}), orderDate: new Date() },
                    ],
                    age,
                  }),
                  activeMembers: activeMembers.length,
                },
                { merge: true }
              );
          }
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      return {
        ...state,
        currentUser: {
          ...user,
          activeMemberships,
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
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(addUserToStore.fulfilled, (state, action) => {
      console.log("action patyload", action.payload);

      state.currentUser = {
        ...action.payload,
        joiningDate: new Date().toDateString(),
      };
      state.loading = false;
      state.error = false;
      state.loading = false;
      state.error = false;
      return state;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = false;
      return state;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("curr", action.payload);
      let user = action.payload;

      state.currentUser = user;
      state.loading = false;
      state.error = false;
      return state;
    });
    builder.addCase(addUserToStore.pending, (state, action) => {
      console.log("here2", action.payload);
      state.loading = true;
      return state;
    });
    builder.addCase(addUserToStore.rejected, (state, action) => {
      console.log("here3", action.payload);
      // toast.error("age should be greator than 18");

      state.error = true;
      return state;
    });

    builder.addCase(addUserByAdmin.pending, (state, action) => {
      console.log("pending............", state);
      console.log("pending............", action.payload);
    });

    builder.addCase(addUserByAdmin.fulfilled, (state, action) => {
      console.log("here after fulfilled userbyadmin", action.payload);
      let addedUser = action.payload;
      addedUser.activeMemberships = {
        ...addedUser.planDetail,
        orderDate: new Date(),
      };
      let startDate = getStartDate(addedUser.activeMemberships);
      let endDate = getEndDate(addedUser.activeMemberships);
      addedUser.activeMemberships.startDate = startDate;
      addedUser.activeMemberships.endDate = endDate;
      addedUser.orders = [];
      addedUser.orders.push({
        ...addedUser.planDetail,
        orderDate: new Date(),
      });

      // toast.error("age should be greator than 18");

      let currUser = sessionStorage.getItem("persist:currentUser");
      currUser = JSON.parse(currUser).currentUser;
      let user = JSON.parse(currUser);
      console.log("uier in add", user);
      //       name(pin):"ser"
      // number(pin):"12345"
      // adminId(pin):"admin@123.com"
      // email(pin):"ser@123.com"
      // gender(pin):"male"
      // age(pin):36
      let finalUser = {
        name: addedUser.name,
        number: addedUser.number,
        adminId: addedUser.adminId,
        email: addedUser.email,
        gender: addedUser.gender,
        age: addedUser.age,
        activeMemberships: addedUser.activeMemberships,
        orders: addedUser.orders,
        joiningDate: addedUser.joiningDate,
      };
      if (!user.members) {
        user.members = [];
        user.members.push(finalUser);
      } else {
        user.members?.push(finalUser);
      }

      let totalMembers = user.members.length;
      user.totalMembers = totalMembers;
      const activeMembers = getActiveMembers(user);
      user.activeMembers = activeMembers.length || 1;
      state.currentUser = user;
      console.log("uuu", user);
      toast.success("membership added");

      return state;
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
