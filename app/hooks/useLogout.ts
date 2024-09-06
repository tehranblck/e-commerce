
import { deleteCookie } from "cookies-next";
import { clearUser } from "@/app/store/features/auth/authSlice";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    deleteCookie("userProfile");
    deleteCookie("userToken");
  };

  return handleLogout;
};
