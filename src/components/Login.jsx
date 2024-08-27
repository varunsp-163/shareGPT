import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        localStorage.setItem("profile_picture", res.data.picture);
        localStorage.setItem("sub", res.data.sub);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please login to your account
        </p>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-500 mb-6">OR</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => login()}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign in with Google 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
