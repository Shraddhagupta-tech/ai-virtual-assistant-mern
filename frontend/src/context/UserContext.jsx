import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const userDataContext = createContext();
function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userdata, setUserdata] = useState(null);
  const [assistantImg, setAssistantImg] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const handleCurrUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserdata(result.data.user || result.data);
      console.log(result.data);
    } catch (error) {
      console.log("Authentication check:", error.message);
      setUserdata(null);
    } finally {
      setAuthLoading(false);
    }
  };
  const getGroqResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true },
      );
      return result.data;
    } catch (error) {
      console.log("AskAssistant error:", error);
    }
  };

  useEffect(() => {
    handleCurrUser();
  }, []);
  const value = {
    serverUrl,
    userdata,
    setUserdata,
    assistantImg,
    setAssistantImg,
    authLoading,
    handleCurrUser,
    getGroqResponse,
  };
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
