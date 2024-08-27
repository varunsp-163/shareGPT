import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [prevPromptsnRes, setPrevPromptsnRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (i, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 10 * i);
  };

  const onSent = async (prompt) => {
    try {
      setLoading(true);
      const res = await run(prompt);

      let resArr = res.split("**");
      let newArr = "";
      for (let i = 0; i < resArr.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newArr += resArr[i];
        } else {
          newArr += "<b>" + resArr[i] + "</b>";
        }
      }

      let nextLineArr = newArr.split("*").join("</br>");
      for (let i = 0; i < nextLineArr.length; i++) {
        const nextWord = nextLineArr[i];
        delayPara(i, nextWord + " ");
      }

      setPrevPromptsnRes((prev) => [
        ...prev,
        { prompt: prompt, response: nextLineArr },
      ]);
      console.log(prevPromptsnRes);

      setInput(""); // Clear input after sending
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }
    console.log(prevPromptsnRes);
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    prevPromptsnRes,
    loading,
    resultData,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
