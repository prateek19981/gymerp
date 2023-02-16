import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Stack } from "@mui/system";
import { Button, Typography, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addMembershipToUser } from "../slice/userSlice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import db from "../firebase_setup/firebase";
import { getStartDate } from "../utils/getMembershipStartDate";
import { getEndDate } from "../utils/getMembershipEndDate";
export const YourSubsriptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let user = sessionStorage.getItem("currentUser");
  user = JSON.parse(user);
  const [userMemberships, setUserMemberships] = useState(
    user?.activeMemberships
  );
  console.log({ userMemberships });

  // function getStartDate() {
  //   let utcSeconds = userMemberships?.orderDate?.seconds;

  //   let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  //   d.setUTCSeconds(utcSeconds);
  //   d = d.toDateString();

  //   return d;
  // }
  // function getEndDate() {
  //   let start = new Date(getStartDate());
  //   const duration = userMemberships.duration;
  //   let endDate;
  //   if (duration === "monthly") {
  //     endDate = new Date(start.setMonth(start.getMonth() + 1));
  //   } else if (duration === "quarterly") {
  //     endDate = new Date(start.setMonth(start.getMonth() + 3));
  //   } else if (duration === "yearly") {
  //     endDate = new Date(start.setMonth(start.getMonth() + 12));
  //   }
  //   return endDate?.toDateString();
  // }

  useEffect(() => {
    async function getData() {
      let user = sessionStorage.getItem("currentUser");
      user = JSON.parse(user);
      const email = user.email;
      const data = await db.collection("user").doc(email).get();

      const orderDate = getEndDate();

      let givenDate1 = new Date(orderDate);
      let diff = new Date().getTime() - givenDate1.getTime();

      setUserMemberships(data.data().activeMemberships || {});
    }

    getData();
  }, []);

  const allUsers = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.users.currentUser);

  const cartItems = currentUser?.cart;

  const token = sessionStorage.getItem("Auth Token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, location, token]);
  return (
    <Container>
      {Object.keys(userMemberships || {}).length !== 0 && (
        <Box display="flex" flexDirection="column" height="100vh" mt="20px">
          <Stack
            sx={{
              flexGrow: "1",
              height: "20%",
              padding: "20px",
              borderBottom: "2px solid gray",
              margin: "26px",

              justifyContent: "center",
            }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Typography variant="h2" fontWeight="500" fontFamily="revert">
                {" "}
                {userMemberships.name}
              </Typography>
            </Stack>

            <Stack>
              <Typography>
                Start Date: {getStartDate(userMemberships)}{" "}
              </Typography>
              <Typography>End Date: {getEndDate(userMemberships)} </Typography>
            </Stack>
          </Stack>
          <Alert severity="warning">
            Your subscription is ending on {getEndDate(userMemberships)}, please
            renew to continue enjoy benefits
          </Alert>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: "2",
              height: "40%",
              padding: "10px",
              margin: "26px",
            }}>
            <img src={userMemberships.img} className="order-img" />

            <Stack
              sx={{
                padding: "10px",
                alignItems: "start",
                justifyContent: "start",
              }}>
              <Typography variant="h4">{userMemberships.name}</Typography>

              <Stack direction="row">
                <Typography variant="h6">
                  Duration : {userMemberships.duration}
                </Typography>
                <Box
                  component="span"
                  sx={{
                    fontSize: "34px",
                    fontWeight: "500",
                    padding: "0 30px",
                    color: "lightgray",
                  }}>
                  |
                </Box>
                <Typography variant="h6">Diet Plan Included</Typography>
              </Stack>
            </Stack>
          </Stack>
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                backgroundColor: "whitesmoke",
                flexGrow: "2",
                height: "20%",
                padding: "10px 29px",
                margin: "26px",
              }}>
              <Stack gap="20px">
                <Typography variant="h5">Need help?</Typography>

                <Stack gap="1px">
                  <Typography>💔 Order Issues ✐</Typography>
                  <Typography>📬 Delivery Info ✐</Typography>
                  <Typography> ✈︎ Returns ✐</Typography>
                </Stack>
              </Stack>
              <Stack gap="18px">
                <Typography variant="h5">Benefits</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  ✅ Diet Consultation
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  ✅ Access to all gym equipments
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  ✅ Workout consultation
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}></Typography>
              </Stack>
            </Stack>
          </>
          {!userMemberships && (
            <Stack>
              <Typography
                variant="h1"
                fontWeight={500}
                color="#de5e33"
                fontFamily="monospace">
                You have no active subscriptions
              </Typography>
            </Stack>
          )}
        </Box>
      )}
    </Container>
  );
};
