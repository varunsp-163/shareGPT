import React from "react";

const geminiImage =
  "https://i.pinimg.com/originals/e5/a2/52/e5a252b0d1ceae9c5a7ee8cea147ce6f.jpg";

const ChatCard = ({ inputData, output }) => {
  const profileURL = localStorage.getItem("profile_picture");

  return (
    <div className="p-4 flex flex-col space-y-2">
      {/* Input Message */}
      <div className="flex justify-end items-center space-x-2">
        <p className="bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-[900px]">
          {inputData}
        </p>
        <img
          src={profileURL}
          alt="Profile"
          className="h-10 w-10 rounded-full shadow-md"
        />
      </div>

      {/* Output Message */}
      <div className="flex justify-start">
        <img
          src={geminiImage}
          alt=""
          className="h-10 w-10 rounded-full shadow-md"
        />
        <p
          dangerouslySetInnerHTML={{ __html: output }}
          className="bg-gray-200 p-3 rounded-lg shadow-lg max-w-[900px] ml-2"
        ></p>
      </div>
    </div>
  );
};

export default ChatCard;
