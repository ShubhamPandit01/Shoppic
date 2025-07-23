import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slice/UserSlice";
import {clearCart} from "../Redux/slice/Cart"
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart())
        navigate("/user");
    };

    if (!currentUser) return null;

    return (
        <button
        onClick={handleLogout}
        className="bg-red-700 hover:scale-105 text-white px-2 py-1 text-[15px] rounded"
        >
        Logout
        </button>
    );
};

export default LogoutButton;
