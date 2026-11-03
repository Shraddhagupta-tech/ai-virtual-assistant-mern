import { useContext } from "react";
import { userDataContext } from "../context/UserContext";

function Card({ image }) {
  const {
    assistantImg,
    setAssistantImg,
  } = useContext(userDataContext);
  return (
    <div
      className={`w-37.5 h-62.5 bg-black border-2 border-[#050567d4] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white m-2 ${assistantImg == image ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`}
      onClick={() => {
        setAssistantImg(image);
      }}
    >
      <img src={image} className="h-full object-cover" />
    </div>
  );
}
export default Card;
