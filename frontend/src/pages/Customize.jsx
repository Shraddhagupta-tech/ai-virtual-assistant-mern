import Card from "../components/Card";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function Customize() {
  const { serverUrl, userdata, setUserdata, assistantImg, setAssistantImg } =
    useContext(userDataContext);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-linear-to-t from-[black] to-[#030352] flex justify-center items-center flex-col p-5 relative overflow-y-auto">
      <MdArrowBack className="absolute top-7.5 left-7.5 cursor-pointer text-white w-6.25 h-6.25" onClick={()=>{navigate("/home")}} />
      <h1 className="text-white mb-10 text-[30px] text-center shrink-0 ">
        Select your <span className="text-blue-200">Assistant Image</span>
      </h1>
      <div className="w-full max-w-[60%] flex justify-center items-center flex-wrap gap-3.75">
        <Card image={img1} />
        <Card image={img2} />
        <Card image={img3} />
        <Card image={img4} />
        <Card image={img5} />
        <Card image={img6} />
        <Card image={img7} />
        <Card image={img8} />
        <Card image={img9} />
        <Card image={img10} />
      </div>
      {assistantImg && (
        <button
          className="min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer "
          onClick={() => {
            navigate("/customize2");
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
export default Customize;
