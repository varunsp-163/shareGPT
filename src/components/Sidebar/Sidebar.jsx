const Sidebar = () => {
  return (
    <div className="h-full w-full sm:w-[12rem] sm:block hidden p-4 bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">New Chat</h1>

        {/* Chats */}
        <div className="mb-6">
          <div className="bg-gray-800 p-3 rounded-lg mb-2 hover:bg-gray-700 transition duration-300">
            <h1 className="text-lg">Chat</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Help
        </button>
        <button className="bg-green-500 p-2 rounded-lg hover:bg-green-600 transition duration-300">
          Activity
        </button>
        <button className="bg-red-500 p-2 rounded-lg hover:bg-red-600 transition duration-300">
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
