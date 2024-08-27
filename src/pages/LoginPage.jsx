import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div className="bg-gray-100">
      <p className="text-red-500 text-center p-3">
        Share-GPT is an open-source AI prompt sharing tool for modern world to
        discover, create and share creative prompts with friends
      </p>
      <Login />
    </div>
  );
};

export default LoginPage;
