import React from "react";

const ChatCard = ({ inputData, output }) => {
  // Example styling using Tailwind CSS classes
  return (
    <div className="mt-4 rounded-lg shadow-md overflow-hidden bg-white">
      {/* User Input */}
      <div className="p-4 bg-gray-100">
        <p className="text-gray-600">{inputData}</p>
      </div>

      {/* Bot Output */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-gray-800">{output}</p>
      </div>
    </div>
  );
};

export default ChatCard;
