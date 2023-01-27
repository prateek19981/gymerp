import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";

export const YourOrders = () => {
  const navigate = useNavigate();

  const user = sessionStorage.getItem("currentUser");
  const orderss = JSON.parse(user)?.orders;

  const token = sessionStorage.getItem("Auth Token");
  console.log("in your orders", token);

  console.log({ orderss });

  useEffect(() => {
    console.log("use effect");
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100vh" mt="20px">
        {orderss?.length > 0 &&
          orderss.map((item) => {
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
        {orderss?.length > 0 && (
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
          </>
        )}
        {!orderss?.length > 0 && <h1>You have no orders yet</h1>}
      </Box>
    </Container>
  );
};
