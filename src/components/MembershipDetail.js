import { useParams } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slice/userSlice/userSlice";

const MembershipDetail = ({ isLoggedIn }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const membershipList = useSelector((state) => state.memberships);
  let currUser = sessionStorage.getItem("currentUser");
  currUser = JSON.parse(currUser);
  const activeMemberships = currUser?.activeMemberships || {};
  console.log({ activeMemberships });

  const membershipDetail = membershipList.find((item) => item.id === id);
  console.log({ membershipDetail });

  const handleAddToCart = function () {
    console.log("here", currUser);
    dispatch(addToCart({ membershipDetail, currUser }));
  };
  const bool = Object.keys(activeMemberships).length !== 0;
  console.log({ bool });

  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: { lg: "row" },
        p: "20px",
        alignItems: "center",
        mt: "27px",
      }}>
      <img
        src={membershipDetail.img}
        alt={membershipDetail.name}
        loading="lazy"
        className="detail-image"
        style={{ borderRadius: "10px" }}
      />
      <Stack
        sx={{
          gap: { lg: "85px", xs: "20px" },
          alignItems: "center",
        }}>
        <Typography
          variant="h3"
          textTransform="capitalize"
          fontWeight="600"
          fontFamily="fantasy">
          {membershipDetail.name}
        </Typography>
        <Typography
          variant="h7"
          textAlign="center"
          width="55%"
          fontStyle="oblique"
          fontSize="27px">
          {membershipDetail.description}
        </Typography>
        <Typography alignItems="center" justifyContent="center">
          <span>
            <Button
              sx={{
                color: "red",
                fontSize: "20px",
                fontWeight: "900",
                textTransform: "capitalize",
              }}>
              ► Price :
            </Button>
          </span>
          {membershipDetail.price}
        </Typography>
        <Typography textAlign="center" alignContent="center">
          <span>
            {" "}
            <Button
              sx={{
                color: "red",
                fontSize: "20px",
                fontWeight: "900",
                textTransform: "capitalize",
              }}>
              ► Duration :
            </Button>
          </span>
          <i>{membershipDetail.duration}</i>
        </Typography>
        {isLoggedIn ? (
          <Link
            onClick={() => {
              if (Object.keys(activeMemberships).length === 0) {
                handleAddToCart();
              } else {
                console.log("hmm");
                return;
              }
            }}
            to={
              Object.keys(activeMemberships).length === 0 ? "/orderDetail" : "#"
            }
            state={{ membershipId: id }}>
            <Button
              variant="contained"
              color="error"
              href="#exercises"
              disabled={Object.keys(activeMemberships).length !== 0}>
              Purchase Membership
            </Button>
          </Link>
        ) : (
          <Link
            to={{
              pathname: "/login",
            }}
            state={{ pagename: "membership_purchase" }}>
            <Button variant="contained" color="error" href="#exercises">
              Login to Purchase Membership
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default MembershipDetail;
