import { Link } from "react-router-dom";
import { Stack, Box } from "@mui/system";
import Logo from "../assets/images/Logo.png";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Navbar({ isLoggedIn, handleLogout }) {
  const currentUser = useSelector((state) => state.users.currentUser);
  console.log("u", currentUser);
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
      }}
      px="20px">
      <Stack direction="row" alignItems="center" gap="40px">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            style={{ width: "48px", height: "48px", margin: "0 20px" }}
          />
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
          }}>
          Home
        </Link>
        <a
          href="#exercises"
          style={{
            textDecoration: "none",
            color: "#3A1212",
          }}>
          Exercises
        </a>
      </Stack>
      <Stack
        direction="row"
        gap="40px"
        justifyContent="start"
        alignItems="center">
        {isLoggedIn ? (
          <>
            <Link to="/yourorders" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  textDecoration: "none",
                  color: "#3A1212",
                }}>
                YourOrders
              </Button>
            </Link>
            <Link to="/subscriptions" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  textDecoration: "none",
                  color: "#3A1212",
                }}>
                Active Subscriptions
              </Button>
            </Link>
            <Link>
              <Button
                style={{
                  textDecoration: "none",
                  color: "#3A1212",
                }}>
                Support
              </Button>
            </Link>
            <Link>
              {" "}
              <Button
                style={{
                  textDecoration: "none",
                  color: "#3A1212",
                }}
                onClick={handleLogout}>
                Logout
              </Button>
            </Link>

            <Link to="/profile">
              <img
                src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="
                className="profileImgLogo"
              />
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#3A1212",
              }}>
              Register
            </Link>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#3A1212",
              }}>
              Login
            </Link>
          </>
        )}
      </Stack>
    </Stack>
  );
}
