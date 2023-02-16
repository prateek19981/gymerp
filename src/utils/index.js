export const checkUserIsAdmin = () => {
  let user = sessionStorage.getItem("currentUser");
  console.log({ user });
  user = JSON.parse(user);
  let currentUser = user;
  console.log({ currentUser });

  if (!currentUser || !Array.isArray(currentUser.userRoles)) {
    return false;
  }
  const { userRoles } = currentUser;

  if (userRoles.includes("admin")) {
    return true;
  }
  return false;
};

export const checkUserSignedIn = () => {
  let user = sessionStorage.getItem("currentUser");
};
