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
    return 0;
  }
  const { members } = user;
  let activeMembers = {};
  activeMembers = members?.filter((item) => {
    const end = getEndDate(item.activeMemberships);
    console.log({ end });
    return !checkPastDate(end);
  });
  console.log("active mmmm", activeMembers);
  return activeMembers;
};
