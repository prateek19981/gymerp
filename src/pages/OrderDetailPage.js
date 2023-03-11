import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMembershipToUser } from "../slice/userSlice/userSlice";
import { toast } from "react-toastify";

export const OrderDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const allUsers = useSelector((state) => state.users);
  let currentUser = useSelector((state) => state.users.currentUser);
  let user = useSelector((state) => state.users.currentUser);
  const orderss = user.orders;
  let membership = user.memberships;

  let cartItems = orderss || currentUser?.cart;

  const token = sessionStorage.getItem("Auth Token");
  const dispatch = useDispatch();
  function clickHandler() {
    const auth = sessionStorage.getItem("Auth Token");

    dispatch(addMembershipToUser({ user, cartItems }));

    toast.success("membership purchased");
    navigate("/subscriptions");
  }
  useEffect(() => {
    console.log("xcvbnm,.,mnbvcvbnm,");
    if (!token) {
      navigate("/login");
    }
  }, [navigate, location, token]);

  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100vh" mt="20px">
        {cartItems?.length > 0 &&
          cartItems.map((item) => {
            return (
              <>
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
                    <Typography
                      variant="h2"
                      fontWeight="500"
                      fontFamily="revert">
                      {" "}
                      OrderId : 123456
                    </Typography>
                    <Button
                      color="info"
                      variant="contained"
                      sx={{
                        padding: "0 27px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        borderRadius: "20px",
                        textTransform: "capitalize",
                      }}>
                      <Box component="span" fontSize="20px" padding="10%">
                        🗓
                      </Box>
                      <Typography>Invoice</Typography>
                    </Button>
                  </Stack>
                  <Stack>
                    <Typography>
                      Order Date: {new Date().toDateString()}{" "}
                    </Typography>
                  </Stack>
                </Stack>
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
                  <img src={item.img} className="order-img" />

                  <Stack
                    sx={{
                      padding: "10px",
                      alignItems: "start",
                      justifyContent: "start",
                    }}>
                    <Typography variant="h4">{item.name}</Typography>

                    <Stack direction="row">
                      <Typography variant="h6">
                        Duration : {item.duration}
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
                  <Stack sx={{ padding: "25px" }}>
                    <Typography>Price: Rs{item.price}</Typography>
                    <Typography mt="14px">Qty: 1</Typography>
                  </Stack>
                </Stack>
              </>
            );
          })}
        {cartItems?.length > 0 && (
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
              <Stack gap="2px">
                <Typography variant="h5">Order Summary</Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <span>Subtotal : </span>
                  <span> Rs 12000</span>
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <span>Discount : </span>
                  <span> 0%</span>
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <span>Delivery : </span>
                  <span> Rs 0</span>
                </Typography>
                <Typography
                  sx={{
                    borderBottom: "1px dashed gray",
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <span>Tax : </span>
                  <span> 0%</span>
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <span>Total: </span>
                  <span> Rs 12000</span>
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                flexGrow: "1",
                height: "20%",
              }}>
              <Button
                variant="contained"
                sx={{
                  background: "green",
                  color: "success",
                  ":hover": { background: "darkgreen" },
                }}
                onClick={clickHandler}>
                Place Order
              </Button>
            </Stack>
          </>
        )}
        {!cartItems?.length > 0 && <h1>You have no orders yet</h1>}
      </Box>
    </Container>
  );
};
