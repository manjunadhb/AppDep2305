import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    axios.defaults.baseURL = "";
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    validateToken();
  }, []);

  let validateToken = async () => {
    if (localStorage.getItem("token")) {
      let dataToSend = new FormData();
      dataToSend.append("token", localStorage.getItem("token"));

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch("/validateToken", reqOptions);

      let JSOData = await JSONData.json();

      if (JSOData.status == "failure") {
        alert(JSOData.msg);
      } else {
        navigate("/home", { state: JSOData });
      }
      console.log(JSOData);
    }
  };

  // let validateCredentials = async () => {
  //   let dataToSend = new FormData();
  //   dataToSend.append("email", emailInputRef.current.value);
  //   dataToSend.append("password", passwordInputRef.current.value);

  //   let reqOptions = {
  //     method: "POST",
  //     body: dataToSend,
  //   };

  //   let JSONData = await fetch("http://localhost:5678/login", reqOptions);

  //   let JSOData = await JSONData.json();

  //   if (JSOData.status == "failure") {
  //     alert(JSOData.msg);
  //   } else {
  //     // localStorage.setItem("email", emailInputRef.current.value);
  //     // localStorage.setItem("password", passwordInputRef.current.value);
  //     localStorage.setItem("token", JSOData.token);
  //     navigate("/home", { state: JSOData });
  //   }
  //   console.log(JSOData);
  // };

  let validateCredentials = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let response = await axios.post("/login", dataToSend);

    console.log(response);

    let JSOData = response.data;

    if (JSOData.status == "failure") {
      alert(JSOData.msg);
    } else {
      localStorage.setItem("token", JSOData.token);
      navigate("/home", { state: JSOData });
    }
    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              validateCredentials();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Login;
