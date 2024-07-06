import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https:/www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        navigate("/home");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      <h1>Login with google or user userId or Password</h1>
      <button onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
  );
};

export default Login;
