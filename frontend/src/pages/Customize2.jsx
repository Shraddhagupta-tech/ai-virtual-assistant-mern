import { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Customize2() {
  const { userdata, assistantImg, serverUrl, setUserdata } =
    useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userdata?.assistantName || "",
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleUpdateAssistant = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        {
          assistantName: assistantName,
          imageUrl: assistantImg,
        },
        { withCredentials: true },
      );
      setLoading(false);
      setUserdata(result.data);
      console.log(result.data);
      console.log("User Data:", userdata);
      console.log("Assistant Image:", userdata?.assistantImg);
      console.log("Assistant Name:", userdata?.assistantName);
        navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#030352] flex justify-center items-center flex-col p-5 relative">
      <MdArrowBack
        className="absolute cursor-pointer top-7.5 left-7.5 text-white w-6.25 h-6.25"
        onClick={() => {
          navigate("/customize");
        }}
      />
      <h1 className="text-white mb-10 text-[30px] text-center">
        Enter your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg. Jarvis"
        className="w-full  max-w-[60%] h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]"
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-75 h-15 mt-7.5 text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer "
          disabled={loading}
          onClick={() => {
            console.log("clicked");
            console.log(assistantName);
            handleUpdateAssistant();
          }}
        >
          {!loading ? "Finally Create Your Assistant" : "Loading..."}
        </button>
      )}
    </div>
  );
}
export default Customize2;
