import { createContext, useEffect, useState } from "react";

export const userDataContext = createContext();
function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userdata, setUserdata] = useState(null);
  const [assistantImg, setAssistantImg] = useState(null);

  const value = {
    serverUrl,
    userdata,
    setUserdata,
    assistantImg,
    setAssistantImg,
  };
  const handleCurrUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserdata(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCurrUser();
  }, []);
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}
export default UserContext;
