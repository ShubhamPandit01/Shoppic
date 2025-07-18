import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, login, clearMessage } from "../Redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [page, setPage] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, currentUser } = useSelector((state) => state.user);

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signUp(signupData));
    setSignupData({ name: "", email: "", password: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
    setLoginData({ email: "", password: "" });
  };

  // ⏩ Redirect to homepage after login/signup
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center md:pt-0 pt-[40px]">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 bg-white shadow-xl rounded-xl overflow-hidden p-4">
        {/* Image */}
        <div className="md:w-1/2 w-full p-4">
          <img
            src="https://i.pinimg.com/736x/29/6b/8a/296b8a847e4e4247901061c173ad5e06.jpg"
            alt="Login here"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-4 flex flex-col justify-center">
          {page ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="border p-3 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="border p-3 rounded"
              />
              <button type="submit" className="bg-red-700 text-white py-2 rounded hover:bg-red-500 transition">
                Login
              </button>
              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <span
                  onClick={() => {
                    setPage(false);
                    dispatch(clearMessage());
                  }}
                  className="text-red-600 cursor-pointer font-medium"
                >
                  Sign up
                </span>
              </p>
              {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}
            </form>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
              <input
                type="text"
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="border p-3 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="border p-3 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                className="border p-3 rounded"
              />
              <button type="submit" className="bg-red-700 text-white py-2 rounded hover:bg-red-500 transition">
                Sign Up
              </button>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setPage(true);
                    dispatch(clearMessage());
                  }}
                  className="text-red-600 cursor-pointer font-medium"
                >
                  Login
                </span>
              </p>
              {message && <p className="text-center text-sm text-green-600 mt-2">{message}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
