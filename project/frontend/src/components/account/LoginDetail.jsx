import styles from './Account.module.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios"
import CreateAccount from './CreateAccount';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Google, Facebook, GitHub } from '@mui/icons-material';

import GoogleLoginComponent from './alt_login/GoogleMUILogin';



function LoginDetail() {
    const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
    const handleCreateAccountClick = () => {
        setIsCreateAccountOpen(true);
    };

    const handleCloseModal = () => {
        console.log("Closing create account modal");
        setIsCreateAccountOpen(false);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null); // State for login error

    //Functions that change the target vals
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        const user = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:5001/users/login', user); // Send POST request to /login via axios
            console.log("logging in")
            console.log('Login successful:', response.data.message);
            setLoginError(null); // Reset any previous login error
            // Redirect the user to a new page on successful login
        
            window.location.href = '/home';
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Invalid username or password');
        }

        console.log(user);
    }


    return (
        <>
            {!isCreateAccountOpen && (
                <div className={styles.login_box} id="login_box">
                    <div className={styles.logo_container}>
                        <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind'></img>
                    </div>
                    <h2>Login</h2>
                    <form>
                        <div className={styles.user_box}>
                            <span className={`form-item-icon material-symbols-rounded ${styles.icon}`}>
                                <PersonIcon />
                            </span>
                            <input type="text" placeholder="Username" onChange={handleUsernameChange} id="username_input">
                            </input>
                        </div>
                        <div className={styles.user_box}>
                            <span className={`form-item-icon material-symbols-rounded ${styles.icon}`}>
                                <LockIcon />
                            </span>
                            <input type="password" placeholder="Password" onChange={handlePasswordChange} id="password_input">
                            </input>
                        </div>
                        {/*Adding error info*/ }
                        {loginError && <p class={`${styles.textorange}`} id="login_error">{loginError}</p>}         
                        <button className={styles.submit} onClick={handleSubmit} style={{backgroundColor: 'transparent', border: "none"}} id="login">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Login
                        </button>
                    </form>
                    <hr className={styles.hr_colour}></hr>
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
                    <span className={styles.create_account_span}>
                    <a className={styles.create_account} onClick={() => setIsCreateAccountOpen(true)} id="create_account">Create Account</a>
                    </span>
                </div>)}
            {isCreateAccountOpen && (
                <CreateAccount setIsCreateAccountOpen={setIsCreateAccountOpen} id='CreateAccount' className={`${styles.login_box} ${styles.create_account_div}`} />
            )};
        </>
    );
}

export { LoginDetail };
