import { useContext } from "react";
import Layout from "../Layout";
import ChatCard from "./ChatCard";
import { Context } from "../../context/Context";

const Home = () => {
  const { onSent, input, setInput, prevPromptsnRes, loading, resultData } =
    useContext(Context);

  const handleInputChange = (e) => {
    setInput(e.target.value); // Update input state on change
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSent(input);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-between h-screen">
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {prevPromptsnRes.map((item, index) => (
              <ChatCard
                key={index}
                inputData={item.prompt}
                output={item.response}
              />
            ))}
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="p-4">
          <div className="flex items-center">
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Enter some prompt"
              value={input || ""}
              className="flex-1 border border-gray-300 p-2 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-md"
            >
              Send
            </button>
          </div>
        </form>
        {loading && <p>Loading...</p>}
      </div>
      <p className="p-4">
        Gemini may display inaccurate info, including about people, so
        double-check its responses. Your privacy & Gemini Apps
      </p>
    </Layout>
  );
};

export default Home;
