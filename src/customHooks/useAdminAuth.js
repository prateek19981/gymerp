import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCheckUserIsAdmin } from "../utils";

const mapState = ({ users }) => {
  return {
    currentUser: users.currentUser,
  };
};
const useAdminAuth = (props) => {
  const currentUser = useSelector((state) => state.users);
  const navigate = useNavigate();
  let isAdmin = useCheckUserIsAdmin(currentUser);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  return currentUser;
};

export default useAdminAuth;
