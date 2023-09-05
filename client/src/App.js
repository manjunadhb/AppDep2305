import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}>
          Home
        </Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
