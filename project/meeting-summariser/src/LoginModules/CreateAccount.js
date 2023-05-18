import "../styles/create_styles.css";
import React, { useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";

// Define Board component
const CreateAccount = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Functions that change the target vals
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordNameChange = (event) => {
    setPassword(event.target.value);
  };

  //user Schema takes inputs from form & creates a new user to then pass into the backend using axios.post
  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5001/users/create", newUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div class="card-container">
        <div class="create-card">
          <div class="dot">
            <div class="close-button" onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
          <div class="title">Create Account</div>

          <form class="create-card-form">
            <div class="form-item">
              <span class="form-item-icon material-symbols-rounded">
                <PersonIcon />
              </span>
              <input
                class="create-item-input"
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
                <EmailIcon />
              </span>
              <input
                class="create-item-input"
                type="text"
                placeholder="Enter Email"
                id="emailForm"
                autofocus
                required
                onChange={handleEmailChange}
              />
            </div>

            <div class="form-item">
              <span class="form-item-icon material-symbols-rounded">
                <LockIcon />
              </span>
              <input
                class="create-item-input"
                type="password"
                placeholder="Enter Password"
                id="passwordForm"
                autofocus
                required
                onChange={handlePasswordNameChange}
              />
            </div>
          </form>
          <button class="submit-button" onClick={handleSubmit}>
            Create my Account
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
