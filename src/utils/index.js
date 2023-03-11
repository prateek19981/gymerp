import { useSelector } from "react-redux";

export const useCheckUserIsAdmin = () => {
  let user = useSelector((state) => state.users.currentUser);

  let currentUser = user;

  if (!currentUser || !Array.isArray(currentUser.userRoles)) {
    return false;
  }
  const { userRoles } = currentUser;

  if (userRoles.includes("admin")) {
    return true;
  }
  return false;
};
