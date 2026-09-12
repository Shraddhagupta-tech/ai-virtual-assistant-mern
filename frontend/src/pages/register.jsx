import React, { useContext, useState } from "react";
import bg from "../assets/background.jpg";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(userDataContext);
  const navigate = useNavigate();
  useContext(userDataContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/register`,
        { name, email, password },
        { withCredential: true },
      );
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div
      className="w-full h-screen bg-cover flex justify-center items-center"
      style={{
        backgroundImage: `url("${bg}")`,
      }}
    >
      <form
        className="w-[90%] h-150 max-w-125 bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-[30px] font-semibold mb-7.5 ">
          Register to <span className="text-blue-400">Virtal Assistant</span>
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="w-full h-15 outline-none border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className=" w-full h-full rounded-full outline-none bg-transparent  placeholder-gray-300 px-5 py-2.5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoEye
              className="absolute top-5 right-5 w-6 h-6 text-white cursor-pointer"
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
          {showPassword && (
            <IoEyeOff
              className="absolute top-5 right-5 w-6 h-6 text-white cursor-pointer"
              onClick={() => {
                setShowPassword(false);
              }}
            />
          )}
        </div>
        {err.length > 0 && <p className="text-[17px] text-red-500">*{err}</p>}
        <button
          className="min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white rounded-full text-[19px] "
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p
          className="text-white text-[18px]"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account?{" "}
          <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
