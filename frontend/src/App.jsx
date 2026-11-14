import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import { useContext } from "react";
import { userDataContext } from "./context/UserContext";
import Customize2 from "./pages/Customize2";

function App() {
  const { userdata, authLoading } = useContext(userDataContext);
  if (authLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          userdata?.assistantImg && userdata?.assistantName ? (
            <Home />
          ) : (
            <Navigate to={"/customize"} />
          )
        }
      />
      <Route
        path="/register"
        element={!userdata ? <Register /> : <Navigate to={"/"} />}
      />
      <Route
        path="/login"
        element={!userdata ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        path="/customize"
        element={userdata ? <Customize /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/customize2"
        element={userdata ? <Customize2 /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
}

export default App;
