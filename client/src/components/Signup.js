import React, { useRef, useState } from "react";

import { Link } from "react-router-dom";

function Signup() {
  let nameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [selectedProfilePic, setSelectedProfilePic] = useState(
    "./images/noImage.png"
  );

  let sendSignupUsingJSON = async () => {
    let dataToSend = {
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };

    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: myHeader,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let sendSignupUsingURLEncoded = async () => {
    let dataToSend = new URLSearchParams();
    dataToSend.append("name", nameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let reqOptions = {
      method: "POST",
      body: dataToSend,
      headers: myHeader,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let sendSignupUsingFormData = async () => {
    let dataToSend = new FormData();
    dataToSend.append("name", nameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    //dataToSend.append("profilePic", profilePicInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    // let myHeader = new Headers();
    // myHeader.append("content-type","multipart/form-data")

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h1>Signup</h1>
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
              sendSignupUsingJSON();
            }}
          >
            Signup(JSON)
          </button>
          <button
            type="button"
            onClick={() => {
              sendSignupUsingURLEncoded();
            }}
          >
            Signup(URLEncoded)
          </button>
          <button
            type="button"
            onClick={() => {
              sendSignupUsingFormData();
            }}
          >
            Signup(FormData)
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
