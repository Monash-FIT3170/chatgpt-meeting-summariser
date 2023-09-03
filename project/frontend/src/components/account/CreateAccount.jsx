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


    return (
        <>
            <div className={styles.login_box} id='create_account_modal' ref={modalRef}>
                <CloseIcon className={styles.close_button} onClick={handleClose}></CloseIcon>
                <div className={styles.logo_container}>
                    <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind'></img>
                </div>
                <h2>Create Account</h2>
                <form>
                    <div className={styles.user_box}>
                        <span class="form-item-icon material-symbols-rounded" className={styles.icon}>
                            <PersonIcon />
                        </span>
                        <input id="username" type="text" placeholder="Username" onChange={handleUsernameChange}>
                        </input>
                    </div>
                    <div className={styles.user_box}>
                        <span class="form-item-icon material-symbols-rounded" className={styles.icon}>
                            <EmailIcon />
                        </span>
                        <input id="email" type="text" placeholder="Email" onChange={handleEmailChange}>
                        </input>
                    </div>
                    <div className={styles.user_box}>
                        <span class="form-item-icon material-symbols-rounded" className={styles.icon}>
                            <LockIcon />
                        </span>
                        <input type="password" placeholder="Password" onChange={handlePasswordChange}>
                        </input>
                    </div>
                    {createError && <p className={styles.redtext}>{createError}</p>}
                    <a className={styles.submit} onClick={handleSubmit}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Create Account

                    </a>
                </form>
                <hr className={styles.hr_colour}></hr>
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
