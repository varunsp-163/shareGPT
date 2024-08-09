import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const profileURL = localStorage.getItem("profile_picture");
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold mr-4">Navbar</h1>
        {profileURL && (
          <img
            src={profileURL}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
