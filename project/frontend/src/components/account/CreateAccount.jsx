import styles from './Account.module.css';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import { Google, Facebook, GitHub } from '@mui/icons-material';
import GoogleLoginComponent from './alt_login/GoogleMUILogin';
import axios from "axios";
import React, { useRef, useState, useEffect } from 'react';

var config = require('../../config.json');
const port = config.port || 5000;
const client_id = config.web.client_id;

const CreateAccount = ({ setIsCreateAccountOpen }) => {
    const handleClose = () => {
        console.log("Closing create account modal");
        setIsCreateAccountOpen(false);
    };


    const modalRef = useRef(null);
    
    
    const [createError, setCreateError] = useState(null); // State for login error
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
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        const user = {
            username: username,
            email: email,
            password: password,
        };

        if (!(username && password && email)) {
            setCreateError("Please fill in all fields")
            return;
        }

        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setCreateError("Please enter a valid email")
            return;
        }
        
        if (!validatePassword(password)) {
            setCreateError("password must contain 3 of the following: uppercase, lowercase, number and special charecter")
            return;
        }

        try {
            // Send POST request to create route
            const response = await axios.post('http://localhost:5001/users/create', user);
            console.log('User created');
            handleClose();
             
        } catch (error) {
            console.error('Error:', error);
        }


        console.log(user);
    }


    // written by chatgpt
    const validatePassword = (password) => {
        // Regular expressions for password validation
        const lowercaseRegex = /[a-z]/;               // At least one lowercase letter
        const uppercaseRegex = /[A-Z]/;               // At least one uppercase letter
        const numberRegex = /[0-9]/;                  // At least one number
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/; // At least one special character
      
        // Count the number of conditions met
        let conditionsMet = 0;
        
        if (lowercaseRegex.test(password)) {
          conditionsMet++;
        }
        
        if (uppercaseRegex.test(password)) {
          conditionsMet++;
        }
        
        if (numberRegex.test(password)) {
          conditionsMet++;
        }
        
        if (specialCharRegex.test(password)) {
          conditionsMet++;
        }
      
        // Check if at least three conditions are met
        return conditionsMet >= 3;
      }


    return (
        <>
            <div className={styles.login_box} id='create_account_modal' ref={modalRef}>
                <CloseIcon className={styles.close_button} onClick={handleClose}></CloseIcon>
                <div className={styles.logo_container}>
                    <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind'></img>
                </div>
                <h2 id="heading">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.user_box}>
                        <span class="form-item-icon material-symbols-rounded" className={styles.icon}>
                            <PersonIcon />
                        </span>
                        <input id="username" required type="text" placeholder="Username" onChange={handleUsernameChange}>
                        </input>
                    </div>
                    <div className={styles.user_box}>
                        <span class="form-item-icon material-symbols-rounded" className={styles.icon}>
                            <EmailIcon />
                        </span>
                        <input id="email" required type="text" placeholder="Email" onChange={handleEmailChange}>
                        </input>
                    </div>
                    <div className={styles.user_box}>
                        <span class="form-item-icon material-symbols-rounded" className={styles.icon}>
                            <LockIcon />
                        </span>
                        <input id="password" required type="password" placeholder="Password" onChange={handlePasswordChange}>
                        </input>
                    </div>
                    {createError && <p className={styles.textorange} id="create_error"> {createError}</p>}
                    <button className={styles.submit} onClick={handleSubmit} id="create_account"  style={{backgroundColor: 'transparent', border: "none"}}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Create Account
                    </button>
                </form>
                <hr className={styles.hr_colour}></hr>
                <span className={styles.create_account_span}>
                    <a className={styles.create_account} onClick={handleClose}>already have an account?</a>
                </span>
                <span className={styles.alt_login}>
                <span className={styles.alt_login}>
                        <a href='#' id='g_id_onload' className={styles.alt_login_icon}>
                            <GoogleLoginComponent />
                        </a>
                        <a href='#' className={styles.alt_login_icon}>
                            <Facebook />
                        </a>
                        <a href='#' className={styles.alt_login_icon}>
                            <GitHub />
                        </a>
                    </span>
                </span>

            </div>

        </>
    );
};

export default CreateAccount;
