import { getStartDate } from "./getMembershipStartDate";
export function getEndDate(userMemberships) {
  if (!userMemberships) {
    return "NA";
  }
  let start = new Date(getStartDate(userMemberships));
  const duration = userMemberships.duration;
  let endDate;
  if (duration === "monthly") {
    endDate = new Date(start.setMonth(start.getMonth() + 1));
  } else if (duration === "quarterly") {
    endDate = new Date(start.setMonth(start.getMonth() + 3));
  } else if (duration === "yearly") {
    endDate = new Date(start.setMonth(start.getMonth() + 12));
  }

  return endDate?.toDateString();
}
