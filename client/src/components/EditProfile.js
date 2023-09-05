import React, { useEffect, useRef, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import TopNavigation from "./TopNavigation";

function EditProfile() {
  let loc = useLocation();
  let nameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [selectedProfilePic, setSelectedProfilePic] = useState(
    "./images/noImage.png"
  );

  console.log("inside edit profile");
  console.log(loc);

  useEffect(() => {
    nameInputRef.current.value = loc.state.userData.name;
    ageInputRef.current.value = loc.state.userData.age;
    emailInputRef.current.value = loc.state.userData.email;
    passwordInputRef.current.value = loc.state.userData.password;
    mobileNoInputRef.current.value = loc.state.userData.mobileNo;
    profilePicInputRef.current.src = setSelectedProfilePic(
      `http://localhost:5678/${loc.state.userData.profilePic}`
    );
  }, []);

  let sendUpdatedDetails = async () => {
    let dataToSend = new FormData();
    dataToSend.append("name", nameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("_id", loc.state.userData._id);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    // let myHeader = new Headers();
    // myHeader.append("content-type","multipart/form-data")

    let reqOptions = {
      method: "PUT",
      body: dataToSend,
    };

    let JSONData = await fetch("/updateProfile", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  return (
    <div className="App">
      <TopNavigation />
      <form>
        <h1>Edit Profile</h1>
        <div>
          <label>Name</label>
          <input ref={nameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            ref={profilePicInputRef}
            onChange={(e) => {
              console.log(e.target.files);
              let selectedFileURL = URL.createObjectURL(e.target.files[0]);

              setSelectedProfilePic(selectedFileURL);
              console.log(selectedFileURL);
            }}
          ></input>
          <br></br>
          <img className="profilePicPreview" src={selectedProfilePic}></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              sendUpdatedDetails();
            }}
          >
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
