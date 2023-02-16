import MembershipCard from "./MembershipCard";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
const MembershipList = () => {
  const memberships = useSelector((state) => state.memberships);

  const temp = [...memberships];
  const sorted = temp.sort((a, b) => {
    return a.price - b.price;
  });

  return (
    <Stack direction="row" justifyContent="space-between">
      {sorted.map((item) => {
        return (
          <MembershipCard
            membership={item}
            membershipList={memberships}
            key={item.id}
          />
        );
      })}
    </Stack>
  );
};

export default MembershipList;
