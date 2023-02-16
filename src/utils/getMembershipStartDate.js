export function getStartDate(userMemberships) {
  console.log({ userMemberships });
  if (!userMemberships) {
    return "NA";
  }
  let utcSeconds = userMemberships?.orderDate?.seconds;
  if (utcSeconds) {
    console.log("hhh");
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    d = d.toDateString();
    return d;
  }
  let d = new Date(userMemberships?.orderDate);
  return d.toDateString();
}
