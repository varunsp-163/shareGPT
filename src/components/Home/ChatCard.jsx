import React from "react";

const ChatCard = ({ inputData, output }) => {
  return (
    <div className="p-2">
      <p className="bg-green-200 text-right mb-2 p-2 rounded-lg">{inputData}</p>

      <p
        dangerouslySetInnerHTML={{ __html: output }}
        className="bg-gray-200 text-left mb-2 p-2 rounded-lg"
      ></p>
    </div>
  );
};

export default ChatCard;
