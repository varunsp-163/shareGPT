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
        console.log(res);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-500 p-5">OR</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => login()}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign in with Google 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
