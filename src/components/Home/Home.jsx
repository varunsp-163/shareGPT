import { useContext, useState } from "react";
import Layout from "../Layout";
import ChatCard from "./ChatCard";
import { Context } from "../../context/context";

const Home = () => {
  const { onSent, input, setInput, prevPromptsnRes, loading } =
    useContext(Context);

  const [hide, setHide] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input state on change
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSent(input);
    setHide(true);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-between bg-gray-100 h-[87%]">
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-4 max-h-[540px]">
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {prevPromptsnRes.map((item, index) => (
              <ChatCard
                key={index}
                inputData={item.prompt}
                output={item.response}
              />
            ))}
          </div>
        </div>
        {!hide && (
          <div className="p-4 my-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <h1 className="text-lg font-semibold mb-2">Share Your Chat</h1>
              <p className="text-gray-600">
                Save and share your insightful conversations with others. Let
                your friends learn from your interactions.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <h1 className="text-lg font-semibold mb-2">Access Gemini</h1>
              <p className="text-gray-600">
                Tap into the power of Gemini for quick and accurate responses.
                Your AI companion is ready to assist you.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <h1 className="text-lg font-semibold mb-2">
                Learn With Your Friend
              </h1>
              <p className="text-gray-600">
                Collaborate and learn together. Share knowledge and discover new
                insights with your peers.
              </p>
            </div>
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="p-4 bg-white shadow-lg">
          <div className="flex items-center">
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Enter some prompt"
              value={input || ""}
              className="flex-1 border border-gray-300 p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-md transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
        <p className="p-4 text-center text-gray-500">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy & Gemini Apps
        </p>
      </div>
    </Layout>
  );
};

export default Home;