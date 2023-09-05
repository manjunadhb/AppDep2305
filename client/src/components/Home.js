import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavigation from "./TopNavigation";

function Home() {
  let navigate = useNavigate();
  let loc = useLocation();
  console.log("received data from login to home");
  console.log(loc);

  return (
    <div>
      <TopNavigation userData={loc.state} />
      <h1>
        Welcome to{" "}
        {loc && loc.state && loc.state.userData
          ? loc.state.userData.name
          : "User"}
      </h1>
      <img
        src={
          loc && loc.state && loc.state.userData
            ? `/${loc.state.userData.profilePic}`
            : null
        }
      ></img>
    </div>
  );
}

export default Home;
