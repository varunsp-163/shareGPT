const sidebar = () => {
  return (
    <div className="justify-around">
      {/* nav */}
      <div>
        <h1>New chat</h1>
      </div>
      {/* chats */}
      <div className="flex">
        <h1>Chat-1</h1>
      </div>
      <div className="flex flex-col">
        <button>Help</button>
        <button>Activity</button>
        <button>Settings</button>
      </div>
    </div>
  );
};

export default sidebar;
