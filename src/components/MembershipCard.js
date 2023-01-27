import { Button, Stack, Typography, Box } from "@mui/material";
import Icon from "../assets/icons/target.png";
import { Link } from "react-router-dom";

const MembershipCard = ({ membership }) => {
  return (
    <Link
      to={`/membership/${membership.id}`}
      style={{ textDecoration: "none" }}>
      <Stack
        type="button"
        alignItems="center"
        justifyContent="center"
        className="bodyPart-card"
        m="20px"
        sx={{
          backgroundColor: "black",
          color: "white",
          width: "340px",
          height: "680px",
          cursor: "pointer",
          gap: "47px",
          textAlign: "center",
          borderRadius: "10px",
          padding: "10px",
        }}>
        <img
          src={membership.img}
          alt="dumbell"
          style={{ width: "300px", height: "500px", objectFit: "contain" }}
        />

        <Typography variant="h3" textTransform="capitalize">
          {" "}
          {membership.name}
        </Typography>
        <Typography variant="h6" textTransform="capitalize">
          {" "}
          <i> Starting at</i> Rs {membership.price}
        </Typography>
      </Stack>
    </Link>
  );
};

export default MembershipCard;
