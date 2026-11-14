import { useContext, useEffect } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { userdata, serverUrl, setUserdata, getGroqResponse } =
    useContext(userDataContext);
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

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);
    if (type === "google_search") {
      const query = encodeURIComponent(userInput.trim());
      console.log(query)
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    } else if (type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    } else if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    } else if (type === "instagram_open") {
      window.open("https://www.instagram.com/", "_blank");
    } else if (type === "facebook_open") {
      window.open("https://www.facebook.com/", "_blank");
    } else if (type === "weather-show") {  console.log("Weather condition executed");
      const query = encodeURIComponent(`weather ${userInput || "today"}`);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("heard: ", transcript);

      if (
        transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())
      ) {
        const data = await getGroqResponse(transcript);
        console.log(data);
        handleCommand(data)
      }
    };
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
    };
    recognition.start();
  }, []);

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
        onClick={() => navigate("/customize")}
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
