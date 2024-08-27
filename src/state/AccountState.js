import { createContext, useState } from "react";
import run from "../config/gemini";
import userPool from "./userpool";
import AccountContext from "../context/context";
import { v4 as uuidv4 } from "uuid";
import developerLog from "./logging";

import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

var UserAttributes;

var GlobalCognitoUser;

const AccountState = (props) => {
  const [input, setInput] = useState("");
  const [prevPromptsnRes, setPrevPromptsnRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [profileURL, setProfileURL] = useState("hi");

  const delayPara = (i, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 30 * i);
  };

  const sendChat = async (chatData) => {
    console.log("chatData", chatData);
    // add a DB
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

      const newChat = { prompt: prompt, response: nextLineArr };
      setPrevPromptsnRes((prev) => [...prev, newChat]);

      const chatData = {
        id: uuidv4(),
        prompt: prompt,
        response: nextLineArr,
        timestamp: new Date(),
      };

      await sendChat(chatData);

      setInput("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
    }
  };

  // AWS Context
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            developerLog("GetSession was called with Session data :", session);
            resolve(session);
          }
        });
      } else {
        reject("User not authenticated");
      }
    });
  };

  const signup = async (email, name, password) => {
    return await new Promise((resolve, reject) => {
      var attributeList = [];
      var userName = {
        Name: "name",
        value: name,
      };
      attributeList.push(userName);

      userPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          developerLog("Failed to register", err.message);
          reject();
        } else {
          developerLog("Account created successfully", data);
        }
      });
    });
  };

  const authenticate = (Email, Password) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: Email,
        Pool: userPool,
      });
      GlobalCognitoUser = cognitoUser;
      const authDetails = new AuthenticationDetails({
        Username: Email,
        Password,
      });
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          developerLog("login successful. Result:", result);
          resolve({ status: "success", userData: { cognitoUser }, result });
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          developerLog(
            "User force password Change required for userAttributes: ",
            userAttributes + ". RequiredAttributes:",
            requiredAttributes
          );
          resolve({
            status: "forcePasswordChange",
            userData: { userAttributes },
          });
        },
        onFailure: (err) => {
          developerLog("Authentication failed", err);
          reject(err);
        },
      });
    });
  };

  const userForceChangePassword = (newPassword) => {
    return new Promise((resolve) => {
      developerLog(
        "Cognito UserData:" +
          JSON.stringify(GlobalCognitoUser) +
          " UserAtt: " +
          JSON.stringify(UserAttributes)
      );
      GlobalCognitoUser.completeNewPasswordChallenge(
        newPassword,
        UserAttributes,
        {
          onSuccess: (result) => {
            developerLog("Password Change success", result);
            resolve({
              status: "passwordChangedSuccess",
            });
          },
          onFailure: (err) => {
            console.log("Password Change failed", err);
          },
        }
      );
    });
  };

  const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    } else {
      developerLog("error Signing Out");
    }
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    prevPromptsnRes,
    loading,
    resultData,
    profileURL,
    setProfileURL,
    signup,
    authenticate,
    getSession,
    userForceChangePassword,
    logout,
  };

  return (
    <AccountContext.Provider value={contextValue}>{props.children}</AccountContext.Provider>
  );
};

export default AccountState;
