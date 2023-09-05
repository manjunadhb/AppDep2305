import React from "react";
import { useNavigate } from "react-router-dom";

function TopNavigation(props) {
  let navigate = useNavigate();

  let deleteUser = async () => {
    console.log("inside deleteuser");
    console.log(props);
    let dataToSend = new FormData();
    dataToSend.append("_id", props.userData.userData._id);

    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:5678/deleteProfile",
      reqOptions
    );

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  return (
    <nav>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate("/editProfile", { state: props.userData });
        }}
      >
        Edit Profile
      </button>
      <button
        onClick={() => {
          deleteUser();
        }}
      >
        Delete Profile
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default TopNavigation;
