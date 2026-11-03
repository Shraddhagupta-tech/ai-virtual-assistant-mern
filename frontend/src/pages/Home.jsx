import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { userdata, serverUrl, setUserdata } = useContext(userDataContext);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserdata(null);
      navigate("/signin");
    } catch (error) {
      setUserdata(null);
      console.log(error);
    }
  };
  return (
    <div className="w-full min-h-screen bg-linear-to-t from-[black] to-[#030352] flex justify-center items-center flex-col gap-5">
      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold  absolute top-5 right-5 bg-white rounded-full text-[19px] cursor-pointer "
        onClick={handleLogOut}
      >
        Log Out
      </button>{" "}
      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold absolute top-21 right-5  bg-white rounded-full text-[19px] cursor-pointer px-5 py-2.5"
        onClick={() => navigate("/cutomize")}
      >
        Cutomize your Assistant
      </button>
      <div className="w-75 h-100 flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userdata?.assistantImg}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-[18px] font-semibold">
        I'm {userdata?.assistantName}
      </h1>
    </div>
  );
}
export default Home;
