import { getStartDate } from "./getMembershipStartDate";
import { getEndDate } from "./getMembershipEndDate";

function checkPastDate(date) {
  let selectedDate = new Date(date);
  let now = new Date();
  console.log({ selectedDate });
  console.log({ now });
  console.log("is back", selectedDate < now);
  if (selectedDate < now) {
    return true;
  }
  return false;
}
export const getActiveMembers = (user) => {
  const isAdmin = user.userRoles.includes("admin");
  if (!isAdmin) {
    return {};
  }
  const { members } = user;
  console.log("mm", members);
  let activeMembers = {};
  activeMembers = members?.filter((item) => {
    const end = getEndDate(item.activeMemberships);
    console.log({ end });
    return (
      !checkPastDate(end) &&
      item.activeMemberships &&
      Object.keys(item.activeMemberships).length !== 0
    );
  });
  console.log("active mmmm", activeMembers);
  return activeMembers;
};
