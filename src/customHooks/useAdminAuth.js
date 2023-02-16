import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserIsAdmin } from "../utils";

const mapState = ({ users }) => {
  return {
    currentUser: users.currentUser,
  };
};
const useAdminAuth = (props) => {
  const currentUser = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  return currentUser;
};

export default useAdminAuth;
