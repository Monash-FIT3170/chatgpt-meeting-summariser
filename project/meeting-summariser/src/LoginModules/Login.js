import React, { useState } from "react";
import "../styles/login_styles.css";
import "../styles/create_styles.css";
import CreateAccount from "./CreateAccount.js";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import axios from "axios";


// Define Login component
function LoginCanvas() {
  const [PopUp, setPopUp] = useState(false);
  function togglePopUp() {
    if (PopUp) {
      setPopUp(false);
    } else {
      setPopUp(true);
    }
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Functions that change the target vals
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordNameChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    const newUser = {
      username: username,
      password: password,
    };

    console.log(newUser);
    axios.post("http://localhost:5001/users/login", newUser)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
      <div class="center-container">
        <div class="page-logo">
          <img src="../img/logo.png" alt="logo" />
        </div>
        <div class="login-card-container">
          {PopUp && <CreateAccount onClose={togglePopUp} />}
          <div class="login-card">
            <div class="login-card-title">
              <h1>Login</h1>
            </div>
            <div class="login-card-user">
              <img src="../img/user.jpg" alt="user" />
            </div>
            <form class="login-card-form">
              <div class="form-item">
                <span class="form-item-icon material-symbols-rounded">
                  <PersonIcon />
                </span>
                <input
                  class="form-item-input"
                  type="text"
                  placeholder="Enter Username"
                  id="usernameForm"
                  autofocus
                  required
                  onChange={handleUsernameChange}
                />
              </div>
              <div class="form-item">
                <span class="form-item-icon material-symbols-rounded">
                  <LockIcon />
                </span>
                <input
                  class="form-item-input"
                  type="password"
                  placeholder="Enter Password"
                  id="passwordForm"
                  required
                  autofocus
                  onChange={handlePasswordNameChange}
                />
              </div>
              <div class="form-item-other">
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="rememberMeCheckbox"
                    checked
                  />
                  <label for="rememberMeCheckbox">
                    Remember me
                  </label>
                </div>
                <a href="#">I forgot my password!</a>
              </div>
              <button type="submit" onClick={handleSubmit}>Sign In</button>
            </form>
            <div class="login-card-footer">
              Don't have an account? <br />
              <button onClick={togglePopUp}>
                Create an account.
              </button>
            </div>
          </div>
          <div class="login-card-social">
            <div>Other Sign-In Options</div>
            <div class="login-card-social-btns">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brand-facebook"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brand-google"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginCanvas;
