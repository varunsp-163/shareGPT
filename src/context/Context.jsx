import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState();
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [recentPrompts, setRecentPrompts] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (i, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * i);
  };

  const onSent = async (prompt) => {
    try {
      setLoading(true);
      setPrevPrompts((prev) => [...prev, prompt]);
      setRecentPrompts(input);
      const res = await run(prompt);
      let resArr = res.split("**");
      let newArr;
      for (let i = 0; i < resArr.length(); i++) {
        if (i === 0 || i % 2 != 1) {
          newArr[i] += resArr[i];
        } else {
          newArr[i] += "<b>" + newArr + "</b>";
        }
      }
      setLoading(false);
      let nextLineArr = newArr.split("*").join("</br>");
      for (let i = 0; i < nextLineArr.length(); i++) {
        const nextWord = nextLineArr[i];
        delayPara(i, nextWord + " ");
      }
      setShowResult(true);
      setInput(""); // Clear input after sending
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }
  };

  const contextValue = {
    onSent,
    recentPrompts,
    input,
    setInput,
    prevPrompts,
    showResult,
    loading,
    resultData,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
