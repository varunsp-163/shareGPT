import Navbar from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="w-full flex h-screen">
      <Sidebar />
      <div className="flex-1 max-h-screen overflow-x-auto bg-gray-200">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
