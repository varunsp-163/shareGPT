import React, { useContext, useState } from "react";
import Layout from "../Layout";
import ChatCard from "./ChatCard";
import { Context } from "../../context/Context";

const Home = () => {
  const [inputData, setinputData] = useState("");
  const {
    onSent,
    input,
    setInput,
    prevPrompts,
    showResult,
    loading,
    resultData,
  } = useContext(Context);

  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input state on change
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setinputData(input);
    onSent(input);
  };

  return (
    <Layout>
      <h1>Home</h1>
      <div className="p-4 w-full">
        <form onSubmit={handleFormSubmit}>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Enter some prompt"
            value={input || ""}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Send
          </button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
      {showResult && <ChatCard inputData={inputData} output={resultData} />}
      <p>
        Gemini may display inaccurate info, including about people, so
        double-check its responses. Your privacy & Gemini Apps
      </p>
    </Layout>
  );
};

export default Home;
